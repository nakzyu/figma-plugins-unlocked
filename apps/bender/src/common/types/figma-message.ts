import { TextLayout } from "../utils";

export type FontInfo = {
  fontName: FontName;
  fontWeight: number;
  fontSize: number;
};

export type TO_UI_SEND_TEXT_NODE = {
  type: "to-ui-send-text-node";
  payload: {
    text: TextNode["characters"];
    fontInfo: FontInfo;
    css: Awaited<{
      color: string;
      "font-family": string;
      "font-size": string;
      "font-style": string;
      "font-weight": string;
      "line-height": "normal";
    }>;
  };
};

export type TO_CODE_CREATE_TEXT_NODE = {
  type: "to-code-create-text-node";
  payload: {
    textLayout: TextLayout[];
    fontInfo: FontInfo;
  };
};

export type FigmaMessage = TO_UI_SEND_TEXT_NODE | TO_CODE_CREATE_TEXT_NODE;
