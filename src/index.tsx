import "./root.scss";

import React from "react";
import { render } from "react-dom";

import App from "./ui/App/App";
import { ReducerContext, gameReducer } from "./gameReducer/reduserContext";

const Root: React.FC = () => (
  <React.StrictMode>
    <ReducerContext.Provider value={gameReducer}>
      <App />
    </ReducerContext.Provider>
  </React.StrictMode>
);

render(<Root />, document.getElementById("root"));

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./service-worker.js", { scope: "./2048" })
    .catch((error) => {
      console.error("register service worker error: ", error);
    });
}
