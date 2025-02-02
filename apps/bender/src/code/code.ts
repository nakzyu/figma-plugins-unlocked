import { codeListener } from "./code-listener";
import { sendTextToUI } from "./send-text-to-ui";

const selection = figma.currentPage.selection;

if (selection.length === 1 && selection[0].type === "TEXT") {
  figma.showUI(__html__, {
    width: 600,
    height: 366,
  });
  sendTextToUI(selection[0]);
  figma.ui.onmessage = codeListener;
} else {
  figma.closePlugin();
  figma.notify("Select a single text node.");
}
