import { codeListener } from "./code-listener";

figma.showUI(__html__, {
  width: 500,
  height: 500,
});
figma.ui.onmessage = codeListener;
