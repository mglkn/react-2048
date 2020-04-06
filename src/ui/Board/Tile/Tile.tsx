import React, { useRef, useState, useEffect } from "react";

import config from "../../../config";

import "./Tile.scss";

type ITileProps = {
  value: number;
};

const Tile: React.FC<ITileProps> = ({ value }) => {
  const [isAnimationShow, setIsAnimationShow] = useState(false);

  const ref = useRef(value);

  useEffect(() => {
    if (value > ref.current) {
      setIsAnimationShow(true);
      const timeoutID = setTimeout(() => setIsAnimationShow(false), 150);
      ref.current = value;

      return () => {
        clearTimeout(timeoutID);
      };
    }
    ref.current = 0;
  }, [value]);

  return (
    <div
      className={`board__tile ${isAnimationShow ? "board__tile_animate" : ""}`}
      style={{
        backgroundColor: config.colors[value],
        borderBottom: value === 0 ? null : ".6vh solid #404040",
      }}
    >
      {value !== 0 && value}
    </div>
  );
};

export default Tile;
