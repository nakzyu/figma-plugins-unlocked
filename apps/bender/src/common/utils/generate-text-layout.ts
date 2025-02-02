import { BenderFormType } from "@/common/constants";
import { FontInfo, TO_UI_SEND_TEXT_NODE } from "../types";

/**
 * Type for an object containing layout information for each character.
 */
export interface TextLayout {
  char: string;
  x: number;
  y: number;
  rotation: number;
  css: {
    color: string;
    fontFamily: string;
    fontSize: string;
    fontStyle: string;
    fontWeight: string;
    lineHeight: string;
  };
}

/**
 * Calculates the position, rotation, and style information for each character based on the given message and settings.
 *
 * This function can be used in both React components and Figma plugins.
 * (In Figma plugin environments where the DOM might not be available, a fallback approximate width is used.)
 *
 * @param message A message object containing text and CSS information.
 * @param settings An object containing curve type, bend amount, and letter spacing.
 * @param isUI A boolean indicating whether the function is running in a UI environment.
 * @returns An array of TextLayout objects.
 */
export function generateTextLayout(
  message: TO_UI_SEND_TEXT_NODE,
  { curveType, bendAmount, letterSpacing }: BenderFormType,
  isUI: boolean
): TextLayout[] {
  const characters = message.payload.text.split("");
  const css = message.payload.css;

  let charWidths: number[] = [];

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.font = `${css["font-size"]} ${css["font-family"]}`;
    charWidths = characters.map(
      (char) => ctx.measureText(char).width + letterSpacing
    );
  }

  // Total text length (arc length)
  const totalArcLength = charWidths.reduce((sum, w) => sum + w, 0);

  // Calculate position and rotation for each character
  const layouts: TextLayout[] = characters.map((char, index) => {
    // Cumulative width of previous characters (from the left)
    const prevArcLength = charWidths
      .slice(0, index)
      .reduce((sum, w) => sum + w, 0);
    // Center position of the current character.
    // In a UI environment, add half of the current character's width; otherwise, use the left edge.
    const charCenterArc = prevArcLength + (isUI ? charWidths[index] / 2 : 0);
    // Overall center of the text (based on the arc)
    const centerOffset = totalArcLength / 2;

    let x = 0,
      y = 0,
      rotation = 0;

    if (curveType === "circle") {
      if (bendAmount === 0) {
        // If bendAmount is 0, position characters in a straight line (centered)
        x = charCenterArc - centerOffset;
        y = 0;
      } else {
        const absBend = Math.abs(bendAmount);
        const delta = (Math.PI * absBend) / 50; // Total angle span
        const radius = totalArcLength / delta; // Calculate the radius
        const angle = ((charCenterArc - centerOffset) / totalArcLength) * delta;
        x = radius * Math.sin(angle);
        y =
          bendAmount > 0
            ? radius * (1 - Math.cos(angle))
            : -radius * (1 - Math.cos(angle));
        rotation = ((bendAmount > 0 ? angle : -angle) * 180) / Math.PI;
      }
    } else if (curveType === "wave") {
      x = charCenterArc - centerOffset;
      const waveHeight = bendAmount / 3;
      y = waveHeight * Math.sin((index / characters.length) * 2 * Math.PI);
    }

    canvas.remove();

    return {
      char,
      x,
      y,
      rotation,
      css: {
        color: css["color"],
        fontFamily: css["font-family"],
        fontSize: css["font-size"],
        fontStyle: css["font-style"],
        fontWeight: css["font-weight"],
        lineHeight: css["line-height"],
      },
    };
  });

  return layouts;
}
