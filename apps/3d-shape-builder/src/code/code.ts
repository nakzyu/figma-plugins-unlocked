import { codeListener } from "./components";

figma.showUI(__html__, {
  width: 600,
  height: 366,
});
figma.ui.onmessage = codeListener;
