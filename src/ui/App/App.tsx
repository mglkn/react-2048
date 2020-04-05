import React, { useContext, useReducer, useEffect, useCallback } from "react";

import { ReducerContext } from "../../gameReducer/reduserContext";
import { ReducerType } from "../../gameReducer/gameReducer";

const App: React.FC = () => {
  const gameReduser: ReducerType = useContext(ReducerContext);

  const [state, dispatch] = useReducer(gameReduser, null);

  const initDipatchCb = useCallback(() => dispatch({ type: "init" }), []);

  // init game board
  useEffect(() => initDipatchCb(), []);

  return <div> {state !== null && <div>board</div>} </div>;
};

export default App;
