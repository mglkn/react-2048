import GameLogic, { IGameState, MoveDirection } from "./gameLogic/gameLogic";

type IAction =
  | { type: "init" }
  | { type: "game_step"; moveDirection: MoveDirection };

export type ReducerType = (state: IGameState, action: IAction) => IGameState;

const gameReducer = (state: IGameState, action: IAction): IGameState => {
  switch (action.type) {
    case "init":
      const newState = GameLogic.gameStateInit();
      return GameLogic.addTile(GameLogic.addTile(newState));
    case "game_step":
      return GameLogic.gameStep(state, action.moveDirection);
    default:
      return state;
  }
};

export default gameReducer;
