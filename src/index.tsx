import "./root.scss";

import React from "react";
import { render } from "react-dom";

import App from "./ui/App/App";

const Root: React.FC = () => (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

render(<Root />, document.getElementById("root"));
