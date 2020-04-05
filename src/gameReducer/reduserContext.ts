import React from "react";

import GameLogic from "../services/gameLogic/gameLogic";
import createReducer from "./gameReducer";

export const ReducerContext = React.createContext(null);
export const gameReducer = createReducer({ gameLogic: new GameLogic() });
