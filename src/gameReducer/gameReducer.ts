import {
  IGameState,
  MoveDirection,
  IGameLogic,
} from "../services/gameLogic/gameLogic";

type IAction =
  | { type: "init" }
  | { type: "game_step"; moveDirection: MoveDirection };

export type ReducerType = (state: IGameState, action: IAction) => IGameState;

type ICreateReducer = {
  gameLogic: IGameLogic;
};

const createReducer = ({ gameLogic }: ICreateReducer): ReducerType => {
  return (state: IGameState, action: IAction): IGameState => {
    switch (action.type) {
      case "init":
        const newState = gameLogic.gameStateInit();
        return gameLogic.addTile(gameLogic.addTile(newState));
      case "game_step":
        return gameLogic.gameStep(state, action.moveDirection);
      default:
        return state;
    }
  };
};

export default createReducer;
