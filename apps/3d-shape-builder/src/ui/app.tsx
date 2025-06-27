import React from "react";
import { createRoot } from "react-dom/client";
import "@repo/ui/styles.css";
import { Form } from "./components/form";

function App() {
  return <Form />;
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("react-page")!;
  const root = createRoot(container);
  root.render(<App />);
});
