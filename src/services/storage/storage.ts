import { IGameState } from "../gameLogic/gameLogic";

export type IStorage = {
  saveState(state: IGameState): void;
  getState(): IGameState | null;
};

class Storage implements IStorage {
  getState(): IGameState | null {
    const rawState = localStorage.getItem("state");
    if (rawState !== null) {
      return JSON.parse(localStorage.getItem("state")) as IGameState;
    }
    return null;
  }

  saveState(state: IGameState) {
    localStorage.setItem("state", JSON.stringify(state));
  }
}

export default Storage;
