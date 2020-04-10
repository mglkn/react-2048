import React, { useEffect, useState } from "react";

import "./DoneGamePopup.scss";

import { IGameState } from "../../services/gameLogic/gameLogic";

type EmojiProps = {
  symbol: string;
  label: string;
};

const Emoji: React.FC<EmojiProps> = (props) => (
  <span
    className="emoji"
    role="img"
    aria-label={props.label ? props.label : ""}
    aria-hidden={props.label ? "false" : "true"}
  >
    {props.symbol}
  </span>
);

type IDoneGamePopupProps = {
  state: IGameState;
  newGameAction: () => void;
};

const DoneGamePopup: React.FC<IDoneGamePopupProps> = ({
  state,
  newGameAction,
}) => {
  return (
    <div className="done-game-popup">
      <div className="done-game-popup__inner done-game-popup__inner_animation">
        {state.isWin && (
          <h2>
            You WIN &nbsp;
            <Emoji label="win" symbol="😀" />
          </h2>
        )}
        {state.isGameOver && (
          <h2>
            Game OVER &nbsp;
            <Emoji label="win" symbol="😵" />
          </h2>
        )}
        <button
          tabIndex={0}
          className="done-game-popup__button"
          onClick={newGameAction}
        >
          NEW GAME
        </button>
      </div>
    </div>
  );
};

export default DoneGamePopup;
