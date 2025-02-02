import { TO_CODE_CREATE_TEXT_NODE } from "@/common";

/**
 * Figma 플러그인에서 메시지와 설정값을 바탕으로 텍스트 노드를 생성하는 예시 함수
 */
export const createTextNode = async (message: TO_CODE_CREATE_TEXT_NODE) => {
  const { payload } = message;
  const { fontInfo, textLayout } = payload;

  if (textLayout.length === 0) return;

  await figma.loadFontAsync(fontInfo.fontName as FontName);

  const textNodes = textLayout.map((data) => {
    const textNode = figma.createText();
    textNode.fontName = fontInfo.fontName;
    textNode.fontSize = fontInfo.fontSize;
    textNode.name = data.char;
    textNode.characters = data.char;
    textNode.x = data.x;
    textNode.y = data.y;
    textNode.rotation = -data.rotation;

    return textNode;
  });

  figma.group(textNodes, figma.currentPage);
};
