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
