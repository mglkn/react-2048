import React from "react";
import FlipMove from "react-flip-move";

import "./Board.scss";

import { IBoard } from "../../services/gameLogic/gameLogic";

type IBoardProps = {
  board: IBoard;
};

const BoardBackground: React.FC = () => {
  return (
    <section = className="board__background">
      {Array(16)
        .fill(null)
        .map((_, index) => (
          <div key={index} className="board__background_tile" />
        ))}
    </section>
  );
};

type ITileProps = {
  value: number;
};

const Tile: React.FC<ITileProps> = ({ value }) => {
  return (
    <div className="board__tile" style={{ backgroundColor: "orange" }}>
      {value !== 0 && value}
    </div>
  );
};

const Board: React.FC<IBoardProps> = ({ board }) => {
  return (
    <div className="board">
      <BoardBackground />
      <FlipMove duration={70} className="board__tiles">
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