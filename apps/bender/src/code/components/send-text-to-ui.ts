import { FigmaMessage, TO_UI_SEND_TEXT_NODE } from "@/common";

export const sendTextToUI = async (node: TextNode) => {
  const css =
    (await node.getCSSAsync()) as TO_UI_SEND_TEXT_NODE["payload"]["css"];
  const texstNodeMessage: FigmaMessage = {
    type: "to-ui-send-text-node",
    payload: {
      text: node.characters,
      fontInfo: {
        fontName: node.fontName as FontName,
        fontSize: node.fontSize as number,
        fontWeight: node.fontWeight as number,
      },
      css,
    },
  };
  figma.ui.postMessage(texstNodeMessage);
};
