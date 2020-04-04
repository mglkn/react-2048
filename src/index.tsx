import "./root.scss";

import React from "react";
import { render } from "react-dom";

import App from "./ui/App/App";
import { ServicesContext } from "./services/services";
import gameReducer from "./services/gameReducer/gameReducer";

const Root: React.FC = () => (
  <React.StrictMode>
    <ServicesContext.Provider value={gameReducer}>
      <App />
    </ServicesContext.Provider>
  </React.StrictMode>
);

render(<Root />, document.getElementById("root"));
