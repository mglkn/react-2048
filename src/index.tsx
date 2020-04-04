import "./root.scss";

import React from "react";
import { render } from "react-dom";

import * as _ from "lodash";

const App: React.FC = () => {
  return <div> {_.join(["hello", "there", "!!!"])}</div>;
  // return <div> Hello there!!! </div>;
};

render(<App />, document.getElementById("root"));
