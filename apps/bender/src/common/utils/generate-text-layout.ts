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

  // 캔버스를 이용하여 각 문자 폭을 측정합니다.
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

  // 각 문자의 위치를 누적 폭을 이용해 계산합니다.
  const layouts: TextLayout[] = [];
  let cumulativeArcLength = 0;

  characters.forEach((char, index) => {
    const width = charWidths[index];
    // isUI 환경이면 각 문자의 중앙 위치를 사용하고, 아니라면 왼쪽 위치를 사용합니다.
    const charCenterArc = cumulativeArcLength + (isUI ? width / 2 : 0);
    // 텍스트 전체의 중심(arc 길이 기준)
    const centerOffset = totalArcLength / 2;

    let x = 0,
      y = 0,
      rotation = 0;

    if (curveType === "circle") {
      if (bendAmount === 0) {
        // bendAmount가 0이면 수평 직선 상에 배치
        x = charCenterArc - centerOffset;
        y = 0;
      } else {
        const absBend = Math.abs(bendAmount);
        const delta = (Math.PI * absBend) / 50; // 전체 각도 범위
        const radius = totalArcLength / delta; // 반지름 계산
        const angle = ((charCenterArc - centerOffset) / totalArcLength) * delta;
        x = radius * Math.sin(angle);
        y =
          bendAmount > 0
            ? radius * (1 - Math.cos(angle))
            : -radius * (1 - Math.cos(angle));
        rotation = ((bendAmount > 0 ? angle : -angle) * 180) / Math.PI;
      }
    } else if (curveType === "wave") {
      // x는 동일하게 arc 길이를 기준으로 배치
      x = charCenterArc - centerOffset;
      const waveHeight = bendAmount / 3;
      // wave의 파라미터 t: 인덱스가 0부터 마지막까지 0 ~ 2π 사이의 값
      const t =
        characters.length > 1
          ? (index / (characters.length - 1)) * 2 * Math.PI
          : 0;
      y = waveHeight * Math.sin(t);
      // 회전은 아래에서 미분(중앙 차분)을 통해 계산할 예정
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

  // 사용이 끝난 캔버스 제거
  canvas.remove();

  // 만약 curveType이 "wave"라면 각 문자의 회전값을 해당 위치의 접선 기울기에 따라 조정합니다.
  if (curveType === "wave" && layouts.length > 1) {
    for (let i = 0; i < layouts.length; i++) {
      // 중앙 차분을 사용하여 기울기(접선 각도)를 계산합니다.
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
