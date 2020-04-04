class GameLogicService {
  static _currentId: number = 1;
  static generateId(): number {
    return this._currentId++;
  }
}

export default GameLogicService;
