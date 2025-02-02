import { FigmaMessage } from "@/common";
import { createTextNodes } from "./create-text-nodes";

export const codeListener = async (msg: FigmaMessage) => {
  if (msg.type === "to-code-create-text-node") {
    // createTextNodes(msg.payload);
  }
};
