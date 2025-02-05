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

  // Measure the width of each character using a canvas.
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

  // Calculate each character's position using cumulative widths.
  const layouts: TextLayout[] = [];
  let cumulativeArcLength = 0;

  characters.forEach((char, index) => {
    const width = charWidths[index];
    // If in UI environment, use the center position of each character; otherwise, use the left position.
    const charCenterArc = cumulativeArcLength + (isUI ? width / 2 : 0);
    // The overall center of the text (based on arc length)
    const centerOffset = totalArcLength / 2;

    let x = 0,
      y = 0,
      rotation = 0;

    if (curveType === "circle") {
      if (bendAmount === 0) {
        // If bendAmount is 0, place on a horizontal line
        x = charCenterArc - centerOffset;
        y = 0;
      } else {
        const absBend = Math.abs(bendAmount);
        const delta = (Math.PI * absBend) / 50; // Total angular range
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
      // Place x based on the arc length in the same way
      x = charCenterArc - centerOffset;
      const waveHeight = bendAmount / 3;
      // Wave parameter t: a value between 0 and 2π, distributed from the first to the last index
      const t =
        characters.length > 1
          ? (index / (characters.length - 1)) * 2 * Math.PI
          : 0;
      y = waveHeight * Math.sin(t);
      // Rotation will be calculated later using differentiation (central difference)
    }

    layouts.push({
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
    });

    cumulativeArcLength += width;
  });

  // Remove the canvas after use
  canvas.remove();

  // If curveType is "wave", adjust each character's rotation based on the tangent slope at that position.
  if (curveType === "wave" && layouts.length > 1) {
    for (let i = 0; i < layouts.length; i++) {
      // Calculate the slope (tangent angle) using central difference.
      const prev = i > 0 ? layouts[i - 1] : layouts[i];
      const next = i < layouts.length - 1 ? layouts[i + 1] : layouts[i];
      const dx = next.x - prev.x;
      const dy = next.y - prev.y;
      const angleRadians = Math.atan2(dy, dx);
      layouts[i].rotation = (angleRadians * 180) / Math.PI;
    }
  }

  return layouts;
}
