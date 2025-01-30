// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the

import { FigmaMessage } from "./messages";

// posted message.
export const codeListener = async (msg: FigmaMessage) => {
  if (msg.type === "send-message-to-backend") {
    console.log("message received from ui");
    const returnedMessage: FigmaMessage = {
      type: "send-message-to-ui",
    };
    figma.ui.postMessage(returnedMessage);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  // figma.closePlugin();
};
