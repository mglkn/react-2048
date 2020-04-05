import React from "react";

import "./TopBar.scss";

type ITopBarProps = {
  score: number;
  initDispatchCb: () => void;
};

const TopBar: React.FC<ITopBarProps> = ({ score, initDispatchCb }) => {
  return (
    <section className="top-bar">
      <h1 className="top-bar__title">2048</h1>
      <button className="top-bar__reset-button" onClick={initDispatchCb}>
        RESET
      </button>
    </section>
  );
};

export default TopBar;
