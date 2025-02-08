import { FigmaMessage, TO_CODE_CREATE_3D_SHAPE } from "@/common";
import { create3DShape } from "./create-text-node";

export const codeListener = async (msg: FigmaMessage) => {
  if (msg.type === "to-code-create-3d-shape") {
    await create3DShape(msg as TO_CODE_CREATE_3D_SHAPE);
    // figma.closePlugin();
  }
};
