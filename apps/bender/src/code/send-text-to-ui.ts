import { FigmaMessage, TO_UI_SEND_TEXT_NODE } from "@/common";

export const sendTextToUI = async (node: TextNode) => {
  const css =
    (await node.getCSSAsync()) as TO_UI_SEND_TEXT_NODE["payload"]["css"];
  const texstNodeMessage: FigmaMessage = {
    type: "to-ui-send-text-node",
    payload: {
      text: node.characters,
      css,
    },
  };
  figma.ui.postMessage(texstNodeMessage);
};
