// textLayout.ts

import { BenderFormType } from "@/common/constants";

/**
 * 메시지 타입 (필요에 따라 확장)
 */
export interface Message {
  payload: {
    text: string;
    css: {
      [key: string]: string;
    };
  };
}

/**
 * 각 문자에 대한 레이아웃 정보를 담은 객체 타입
 */
export interface TextLayout {
  char: string;
  x: number;
  y: number;
  rotation: number;
  style: {
    color: string;
    fontFamily: string;
    fontSize: string;
    fontStyle: string;
    fontWeight: string;
    lineHeight: string;
  };
}

/**
 * 주어진 메시지와 설정값에 따라 각 문자에 대한 좌표, 회전, 스타일 정보를 계산합니다.
 *
 * 이 함수는 React 컴포넌트와 Figma 플러그인 모두에서 사용할 수 있습니다.
 * (Figma 플러그인 환경에서는 DOM이 없을 수 있으므로, fallback으로 approximate width를 사용합니다.)
 *
 * @param message 메시지 객체 (텍스트와 CSS 정보 포함)
 * @param settings 곡선 타입, 굽힘 정도, letterSpacing 등
 * @returns TextLayout 객체 배열
 */
export function generateTextLayout(
  message: Message,
  { curveType, bendAmount, letterSpacing }: BenderFormType
): TextLayout[] {
  const characters = message.payload.text.split("");
  const css = message.payload.css;

  let charWidths: number[] = [];
  // canvas를 통해 문자 폭 계산 (React나 Figma plugin UI 환경에서는 document 사용 가능)
  if (typeof document !== "undefined") {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.font = `${css["font-size"]} ${css["font-family"]}`;
      charWidths = characters.map(
        (char) => ctx.measureText(char).width + letterSpacing
      );
    }
  }
  // 만약 document가 없다면 (예: Figma 메인 스레드) fallback: 각 문자 폭을 대략 font-size로 가정
  if (charWidths.length === 0) {
    const approxWidth = parseInt(css["font-size"], 10) || 16;
    charWidths = characters.map(() => approxWidth + letterSpacing);
  }

  // 전체 텍스트 길이 (아크 길이)
  const totalArcLength = charWidths.reduce((sum, w) => sum + w, 0);

  // 각 문자에 대해 위치, 회전 계산
  const layouts: TextLayout[] = characters.map((char, index) => {
    // 이전 문자들의 누적 폭 (왼쪽 기준)
    const prevArcLength = charWidths
      .slice(0, index)
      .reduce((sum, w) => sum + w, 0);
    // 현재 문자의 중앙 위치 (누적 폭 + 해당 문자 폭의 절반)
    const charCenterArc = prevArcLength + charWidths[index] / 2;
    // 전체 텍스트 중앙 (아크 기준)
    const centerOffset = totalArcLength / 2;

    let x = 0,
      y = 0,
      rotation = 0;

    if (curveType === "circle") {
      if (bendAmount === 0) {
        // bendAmount가 0이면 직선 배치 (중앙 정렬)
        x = charCenterArc - centerOffset;
        y = 0;
      } else {
        const absBend = Math.abs(bendAmount);
        const delta = (Math.PI * absBend) / 50; // 전체 각도 span
        const radius = totalArcLength / delta; // 반지름 계산
        const angle = ((charCenterArc - centerOffset) / totalArcLength) * delta;
        x = radius * Math.sin(angle);
        y =
          bendAmount > 0
            ? radius * (1 - Math.cos(angle))
            : -radius * (1 - Math.cos(angle));
        rotation = (angle * 180) / Math.PI;
      }
    } else if (curveType === "wave") {
      x = charCenterArc - centerOffset;
      const waveHeight = bendAmount / 3;
      y = waveHeight * Math.sin((index / characters.length) * 2 * Math.PI);
    }

    return {
      char,
      x,
      y,
      rotation,
      style: {
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
