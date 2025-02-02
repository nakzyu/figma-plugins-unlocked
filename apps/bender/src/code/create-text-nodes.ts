import { TextLayout, generateTextLayout } from "@/common";

/**
 * Figma 플러그인에서 메시지와 설정값을 바탕으로 텍스트 노드를 생성하는 예시 함수
 */
export const createTextNodes = async () => {
  //   // 공통 레이아웃 계산 함수 호출
  //   const layouts: TextLayout[] = generateTextLayout(args[0], args[1]);
  //   // 예시로 중앙 좌표 (150, 150)를 기준으로 노드 생성
  //   for (const layout of layouts) {
  //     const textNode = figma.createText();
  //     // 폰트를 사용하기 전에 반드시 로드 (비동기 처리 필요)
  //     await figma.loadFontAsync({
  //       family: layout.style.fontFamily,
  //       style: layout.style.fontStyle,
  //     });
  //     textNode.characters = layout.char;
  //     textNode.x = 150 + layout.x;
  //     textNode.y = 150 + layout.y;
  //     textNode.rotation = layout.rotation;
  //     // 스타일 적용 (필요에 따라 fills, fontSize 등 추가)
  //     // 예시:
  //     // textNode.fills = [{ type: "SOLID", color: hexToRgb(layout.style.color) }];
  //   }
};
