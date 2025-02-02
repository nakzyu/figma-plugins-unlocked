/**
 * This is example of message types that can be use in the `code.ts` or `app.tsx`
 */

import { generateTextLayout } from "../utils";

export type TO_UI_SEND_TEXT_NODE = {
  type: "to-ui-send-text-node";
  payload: {
    text: TextNode["characters"];
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
  payload: Parameters<typeof generateTextLayout>;
};

export type FigmaMessage = TO_UI_SEND_TEXT_NODE | TO_CODE_CREATE_TEXT_NODE;
