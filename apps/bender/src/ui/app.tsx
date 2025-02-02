import React, { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "@repo/ui/styles.css";
import { Form } from "./components/form";
import { FigmaMessage } from "../common/types/messages";

function App() {
  const [message, setMessage] = useState<FigmaMessage>();

  const figmaMessageListener = useCallback((event: MessageEvent) => {
    const message = event.data.pluginMessage as FigmaMessage;

    if (message.type === "send-text-node-to-ui") {
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
