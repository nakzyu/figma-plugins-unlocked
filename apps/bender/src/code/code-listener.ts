import { FigmaMessage, TO_CODE_CREATE_TEXT_NODE } from "@/common";
import { createTextNode } from "./create-text-node";

export const codeListener = async (msg: FigmaMessage) => {
  if (msg.type === "to-code-create-text-node") {
    createTextNode(msg as TO_CODE_CREATE_TEXT_NODE);
  }
};
