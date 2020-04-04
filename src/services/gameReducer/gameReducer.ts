import GameLogic, { IGameState, MoveDirection } from "./gameLogic/gameLogic";

type IAction = {
  type: IActionType;
  payload?: MoveDirection;
};

export enum IActionType {
  GAME_INIT,
  GAME_STEP,
}

const gameReducer = (state: IGameState | null, action: IAction): IGameState => {
  switch (action.type) {
    case IActionType.GAME_INIT:
      const newState = GameLogic.gameStateInit();
      return GameLogic.addTile(GameLogic.addTile(newState));
    case IActionType.GAME_STEP:
      return GameLogic.gameStep(state, action.payload);
    default:
      return state;
  }
};

export default gameReducer;
