import { FigmaMessage } from "./messages";
import { sendTextToUI } from "./send-text-to-ui";

const selection = figma.currentPage.selection;

if (selection.length === 1 && selection[0].type === "TEXT") {
  figma.showUI(__html__, {
    width: 600,
    height: 400,
  });

  sendTextToUI(selection[0]);
} else {
  figma.closePlugin();
  figma.notify("Select a single text node.");
}
