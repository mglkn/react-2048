import React, {
  useContext,
  useReducer,
  useEffect,
  useCallback,
  Fragment,
} from "react";
import "./App.scss";
import throttle from "lodash/throttle";

import { ReducerContext } from "../../gameReducer/reduserContext";
import { ReducerType } from "../../gameReducer/gameReducer";
import { MoveDirection } from "../../services/gameLogic/gameLogic";

import Board from "../Board/Board";
import DoneGamePopup from "../DoneGamePopup/DoneGamePopup";

const App: React.FC = () => {
  const gameReduser: ReducerType = useContext(ReducerContext);

  const [state, dispatch] = useReducer(gameReduser, null);

  const initDispatchCb = useCallback(() => dispatch({ type: "init" }), []);
  // init game board
  useEffect(() => initDispatchCb(), []);

  const keyDownCb = useCallback(
    throttle((e: any) => {
      if (
        ![
          "ArrowUp",
          "ArrowDown",
          "ArrowRight",
          "ArrowLeft",
          "w",
          "d",
          "a",
          "s",
        ].includes(e.key)
      )
        return;

      e.preventDefault();

      let moveDirection: MoveDirection;
      switch (e.key) {
        case "ArrowRight":
        case "d":
          moveDirection = MoveDirection.RIGHT;
          break;
        case "ArrowLeft":
        case "a":
          moveDirection = MoveDirection.LEFT;
          break;
        case "ArrowUp":
        case "w":
          moveDirection = MoveDirection.UP;
          break;
        default:
          moveDirection = MoveDirection.DOWN;
      }

      dispatch({ type: "game_step", moveDirection });
    }, 150),
    [state]
  );

  // add tile after move
  useEffect(() => {
    if (
      state === null ||
      state.isMoved === false ||
      state.isWin ||
      state.isGameOver
    )
      return;

    setTimeout(() => {
      dispatch({ type: "add_tile" });
    }, 150);
  }, [state]);

  // check winner/gameover
  useEffect(() => {
    if (state === null) return;

    if (state.isWin) {
      console.log("YOURE WIN");
    }

    if (state.isGameOver) {
      console.log("YOURE LOOSE");
    }
  }, [state]);

  useEffect(() => {
    window.addEventListener("keydown", keyDownCb);

    return () => {
      window.removeEventListener("keydown", keyDownCb);
    };
  }, []);

  return (
    <main className="main-container">
      {state !== null && (
        <Fragment>
          <div className="actions">
            <button className="actions__reset-button" onClick={initDispatchCb}>
              RESET
            </button>
          </div>
          <Board board={state.board} />
        </Fragment>
      )}
      {state !== null && (state.isWin || state.isGameOver) && (
        <DoneGamePopup state={state} initDispatchCb={initDispatchCb} />
      )}
    </main>
  );
};

export default App;
