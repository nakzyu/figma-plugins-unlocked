export type TO_CODE_CREATE_3D_SHAPE = {
  type: "to-code-create-3d-shape";
  payload: {
    pathData: string;
    fills: Paint[];
  }[];
};

export type FigmaMessage = TO_CODE_CREATE_3D_SHAPE;
