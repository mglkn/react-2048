import {
  IGameState,
  MoveDirection,
  IGameLogic,
} from "../services/gameLogic/gameLogic";
import { IStorage } from "../services/storage/storage";

type IAction =
  | { type: "init" }
  | { type: "game_step"; moveDirection: MoveDirection }
  | { type: "add_tile" };

export type ReducerType = (state: IGameState, action: IAction) => IGameState;

type ICreateReducer = {
  gameLogic: IGameLogic;
  storage?: IStorage;
};

const createReducer = ({ gameLogic, storage }: ICreateReducer): ReducerType => {
  return (state: IGameState, action: IAction): IGameState => {
    switch (action.type) {
      case "init":
        const savedState = storage?.getState();
        if (savedState !== null && savedState !== undefined) {
          return savedState;
        }
        const initState = gameLogic.gameStateInit();
        return gameLogic.addTile(gameLogic.addTile(initState));

      case "game_step":
        return gameLogic.gameStep(state, action.moveDirection);

      case "add_tile":
        const newState = gameLogic.addTile(state);
        storage?.saveState(newState);
        return newState;

      default:
        return state;
    }
  };
};

export default createReducer;
