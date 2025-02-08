import { FigmaMessage } from "@/common";
import { createShape } from "./create-shape";

export const codeListener = async (msg: FigmaMessage) => {
  if (msg.type === "to-code-create-3d-shape") {
    createShape();
  }
};
