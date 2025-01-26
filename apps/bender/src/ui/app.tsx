import { PLUGIN } from "@common/networkSides";
import { UI_CHANNEL } from "@ui/app.network";
import { Networker, NetworkError } from "monorepo-networker";
import { useEffect, useState } from "react";
// import { Button } from "@repo/ui/dist/index";

function App() {
  const [count, setCount] = useState(0);
  const [pingCount, setPingCount] = useState(0);

  useEffect(() => {
    UI_CHANNEL.subscribe("ping", () => {
      setPingCount((cnt) => cnt + 1);
    });
  }, []);

  return (
    <div className="homepage">
      <div>dsd</div>

      <h1>Figma + Vite + React</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button
          onClick={async () => {
            const response = await UI_CHANNEL.request(PLUGIN, "ping", []);
            console.log("Response:", response);
          }}
          style={{ marginInlineStart: 10 }}
        >
          ping the other side
        </button>
        <button
          onClick={() => {
            console.log("Create a rectangle, please!");
            UI_CHANNEL.emit(PLUGIN, "createRect", [100, 100]);
          }}
          style={{ marginInlineStart: 10 }}
        >
          create square
        </button>
        <button
          onClick={async () => {
            try {
              const result = await UI_CHANNEL.request(
                PLUGIN,
                "exportSelection",
                []
              );
              console.log("Export: ", { result });
            } catch (err) {
              if (err instanceof NetworkError) {
                console.log("Couldn't export..", { message: err.message });
              }
            }
          }}
          style={{ marginInlineStart: 10 }}
        >
          export selection
        </button>
        <p>
          Edit <code>src/app.tsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs" style={{ fontSize: 11 }}>
        {PLUGIN.name} pinged us {pingCount} time(s).
      </p>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more <br />
        <span>(Current logical side = {Networker.getCurrentSide().name})</span>
      </p>
    </div>
  );
}

export default App;
