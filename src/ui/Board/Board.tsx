import React from "react";
import FlipMove from "react-flip-move";
import config from "../../config";

import "./Board.scss";

import { IBoard } from "../../services/gameLogic/gameLogic";
import Tile from "./Tile/Tile";

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
