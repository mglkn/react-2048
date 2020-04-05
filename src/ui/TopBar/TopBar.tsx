import React from "react";

import "./TopBar.scss";

type ITopBarProps = {
  initDispatchCb: () => void;
};

const TopBar: React.FC<ITopBarProps> = ({ initDispatchCb }) => {
  return (
    <section className="top-bar">
      <button className="top-bar__reset-button" onClick={initDispatchCb}>
        RESET
      </button>
    </section>
  );
};

export default TopBar;
