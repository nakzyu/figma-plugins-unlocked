/**
 * This is example of message types that can be use in the `code.ts` or `app.tsx`
 */

export type FigmaMessage = {
  type: "send-text-node-to-ui";
  payload: {
    text: TextNode["characters"];
    css: Awaited<ReturnType<TextNode["getCSSAsync"]>>;
  };
};
