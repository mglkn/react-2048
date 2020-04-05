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
import TopBar from "../TopBar/TopBar";

const App: React.FC = () => {
  const gameReduser: ReducerType = useContext(ReducerContext);

  const [state, dispatch] = useReducer(gameReduser, null);

  const initDipatchCb = useCallback(() => dispatch({ type: "init" }), []);

  // init game board
  useEffect(() => initDipatchCb(), []);

  return (
    <main className="main-container">
      {state !== null && (
        <Fragment>
          <TopBar score={state.score} initDispatchCb={initDipatchCb} />
          <Board board={state.board} />
        </Fragment>
      )}
    </main>
  );
};

export default App;
