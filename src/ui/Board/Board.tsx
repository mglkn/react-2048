import React, { useRef, useState, useEffect } from "react";
import FlipMove from "react-flip-move";
import config from "../../config";

import "./Board.scss";

import { IBoard } from "../../services/gameLogic/gameLogic";

type IBoardProps = {
  board: IBoard;
};

const BoardBackground: React.FC = () => {
  return (
    <div className="board__background">
      {Array(16)
        .fill(null)
        .map((_, index) => (
          <div key={index} className="board__background_tile" />
        ))}
    </div>
  );
};

type ITileProps = {
  value: number;
};

const Tile: React.FC<ITileProps> = ({ value }) => {
  const [isAnimationShow, setIsAnimationShow] = useState(false);

  const ref = useRef(value);

  useEffect(() => {
    if (value > ref.current) {
      setIsAnimationShow(true);
      setTimeout(() => setIsAnimationShow(false), 150);
      ref.current = value;
      return;
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

const Board: React.FC<IBoardProps> = ({ board }) => {
  return (
    <div className="board">
      <BoardBackground />
      <FlipMove
        duration={config.moveAnimatetionDuration}
        className="board__tiles"
      >
        {board.map((tileState) => (
          <div key={tileState.id}>
            <Tile value={tileState.value} />
          </div>
        ))}
      </FlipMove>
    </div>
  );
};

export default Board;
