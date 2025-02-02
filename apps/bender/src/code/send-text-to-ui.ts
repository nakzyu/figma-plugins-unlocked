import { FigmaMessage } from "@/common";

export const sendTextToUI = async (node: TextNode) => {
  const css = await node.getCSSAsync();
  const texstNodeMessage: FigmaMessage = {
    type: "send-text-node-to-ui",
    payload: {
      text: node.characters,
      css,
    },
  };
  figma.ui.postMessage(texstNodeMessage);
};
