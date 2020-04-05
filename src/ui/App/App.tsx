import React, {
  useContext,
  useReducer,
  useEffect,
  useCallback,
  Fragment,
} from "react";
import "./App.scss";

import { ReducerContext } from "../../gameReducer/reduserContext";
import { ReducerType } from "../../gameReducer/gameReducer";

import Board from "../Board/Board";
import { MoveDirection } from "../../services/gameLogic/gameLogic";

const App: React.FC = () => {
  const gameReduser: ReducerType = useContext(ReducerContext);

  const [state, dispatch] = useReducer(gameReduser, null);

  const initDispatchCb = useCallback(() => dispatch({ type: "init" }), []);
  // init game board
  useEffect(() => initDispatchCb(), []);

  const keyDownCb = useCallback(
    (e: any) => {
      if (![39, 37, 38, 40].includes(e.keyCode)) return;

      e.preventDefault();

      let moveDirection: MoveDirection;
      switch (e.keyCode) {
        case 39:
          moveDirection = MoveDirection.RIGHT;
          break;
        case 37:
          moveDirection = MoveDirection.LEFT;
          break;
        case 38:
          moveDirection = MoveDirection.UP;
          break;
        default:
          moveDirection = MoveDirection.DOWN;
      }

      dispatch({ type: "game_step", moveDirection });
    },
    [state]
  );

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
    </main>
  );
};

export default App;
