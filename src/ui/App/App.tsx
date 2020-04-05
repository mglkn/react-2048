import React, { useContext, useReducer, useEffect, useCallback } from "react";

import { ServicesContext } from "../../services/services";
import { ReducerType } from "../../services/gameReducer/gameReducer";

const App: React.FC = () => {
  const gameReduser: ReducerType = useContext(ServicesContext);

  const [state, dispatch] = useReducer(gameReduser, null);

  const initDipatchCb = useCallback(() => dispatch({ type: "init" }), []);

  // init game board
  useEffect(() => initDipatchCb(), []);

  return <div> {state !== null && <div>board</div>} </div>;
};

export default App;
