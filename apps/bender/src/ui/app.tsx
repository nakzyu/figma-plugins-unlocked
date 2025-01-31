import React, { useEffect, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { FigmaMessage } from "../code/messages";
import { Button, Slider } from "@repo/ui";
import "@repo/ui/styles.css";

function App() {
  const onSendMessage = () => {
    const message: FigmaMessage = {
      type: "send-message-to-backend",
    };

    parent.postMessage({ pluginMessage: message }, "*");
  };

  const figmaMessageListener = useCallback((event: MessageEvent) => {
    const message = event.data.pluginMessage as FigmaMessage;

    if (message.type === "send-message-to-ui") {
      console.log("message from backend");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", figmaMessageListener);
    return () => {
      window.removeEventListener("message", figmaMessageListener);
    };
  }, [figmaMessageListener]);

  return (
    <div className="container w-full h-full px-4">
      <div className="w-full flex flex-col items-center mb-5">
        <h1 className="text-xl">Figma React + Tailwind + Webpack Starter</h1>
        <h2 className="text-md text-gray-400">Plugin starter</h2>
      </div>
      <Button className="cursor-pointer">sdasd</Button>
      <Slider />

      <div className="mt-6 w-full flex justify-center">
        <Button onClick={onSendMessage} variant="destructive">
          @@@@@
        </Button>
      </div>
    </div>
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("react-page")!;
  const root = createRoot(container);
  root.render(<App />);
});
