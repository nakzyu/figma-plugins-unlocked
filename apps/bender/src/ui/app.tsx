import React, { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "@repo/ui/styles.css";
import { Form } from "./components/form";
import { FigmaMessage, TO_UI_SEND_TEXT_NODE } from "@/common";

function App() {
  const [message, setMessage] = useState<TO_UI_SEND_TEXT_NODE>();

  const figmaMessageListener = useCallback((event: MessageEvent) => {
    const message = event.data.pluginMessage as TO_UI_SEND_TEXT_NODE;

    if (message.type === "to-ui-send-text-node") {
      setMessage(message);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", figmaMessageListener);
    return () => {
      window.removeEventListener("message", figmaMessageListener);
    };
  }, [figmaMessageListener]);

  if (!message) return;

  return (
    <div>
      <Form message={message} />
    </div>
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("react-page")!;
  const root = createRoot(container);
  root.render(<App />);
});
