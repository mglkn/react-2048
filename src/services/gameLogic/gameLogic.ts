import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";
import range from "lodash/range";

export type IBoardTile = {
  value: number;
  id: string;
};

export type IBoard = IBoardTile[];

export type IGameState = {
  board: IBoard;
  isGameOver: boolean;
  isWin: boolean;
  isMoved: boolean;
};

export enum MoveDirection {
  UP = 1,
  DOWN,
  LEFT,
  RIGHT,
}

export interface IGameLogic {
  gameStateInit(): IGameState;
  gameStep(currentState: IGameState, moveDirection: MoveDirection): IGameState;
  addTile(gameState: IGameState): IGameState;
  canIMakeMove(state: IGameState, moveDirection?: MoveDirection): boolean;
  checkGameOver(state: IGameState): IGameState;
  checkWin(state: IGameState): IGameState;
  move(currentState: IGameState, moveDirection: MoveDirection): IGameState;
}

class GameLogic implements IGameLogic {
  static _currentId: number = 1;
  static _generateId(): string {
    return (this._currentId++).toString();
  }

  static _boardInit(): IBoard {
    return Array(16)
      .fill(null)
      .map(() => ({
        value: 0,
        id: this._generateId(),
      }));
  }

  gameStateInit(): IGameState {
    const board = GameLogic._boardInit();

    board[0].value = 4;
    board[1].value = 8;
    board[2].value = 16;
    board[3].value = 32;
    board[4].value = 64;
    board[5].value = 128;
    board[6].value = 256;
    board[7].value = 512;
    board[8].value = 1024;

    return {
      board, // GameLogic._boardInit(),
      isGameOver: false,
      isWin: false,
      isMoved: false,
    };
  }

  gameStep(currentState: IGameState, moveDirection: MoveDirection): IGameState {
    let state = currentState;

    if (currentState.isWin || currentState.isGameOver) return state;

    if (!this.canIMakeMove(currentState, moveDirection)) {
      return { ...this.checkGameOver(state), isMoved: false };
    }

    state = this.move(state, moveDirection);

    state = { ...this.checkWin(state), isMoved: true };

    return state;
  }

  addTile(gameState: IGameState): IGameState {
    const emptyTileIndexes = gameState.board
      .map(({ value }, index) => (value === 0 ? index : -1))
      .filter((index) => index >= 0);

    if (emptyTileIndexes.length === 0) return;

    const randomIndex =
      emptyTileIndexes[Math.floor(Math.random() * emptyTileIndexes.length)];

    gameState.board[randomIndex].value = 2;

    return { ...this.checkGameOver(gameState), isMoved: false };
  }

  _getRevercedRowIndexes(moveDirection: MoveDirection, row: number): number[] {
    if (moveDirection === MoveDirection.RIGHT) {
      return range(1, 5)
        .map((i) => 4 * row + i - 1)
        .reverse();
    }

    if (moveDirection === MoveDirection.LEFT) {
      return range(1, 5).map((i) => 4 * row + i - 1);
    }

    if (moveDirection === MoveDirection.DOWN) {
      return range(0, 4)
        .map((i) => 4 * i + row)
        .reverse();
    }

    if (moveDirection === MoveDirection.UP) {
      return range(0, 4).map((i) => 4 * i + row);
    }

    return [];
  }

  _mergeBoard(state: IGameState, indexes: number[]): IGameState {
    const board = state.board;

    let currentTileIndex: number | null = null;
    for (const index of indexes) {
      if (board[index].value === 0) {
        continue;
      }

      if (
        currentTileIndex !== null &&
        board[index].value === board[currentTileIndex].value
      ) {
        const tmp = board[currentTileIndex];
        board[currentTileIndex] = board[index];
        board[index] = tmp;

        board[currentTileIndex].value *= 2;
        board[index].value = 0;

        currentTileIndex = null;
        continue;
      }

      if (board[index].value !== 0) {
        currentTileIndex = index;
      }
    }

    return {
      ...state,
      board,
    };
  }

  _shiftBoard(state: IGameState, indexes: number[]): IGameState {
    const board = state.board;

    let pivot = 0;
    while (pivot <= 3) {
      if (board[indexes[pivot]].value !== 0) {
        pivot++;
        continue;
      }

      let currentTileIndex: number | null = null;
      for (const index of indexes.slice(pivot, indexes.length)) {
        if (currentTileIndex === null) {
          currentTileIndex = index;
          continue;
        }

        if (board[index].value !== 0) {
          const tmp = board[currentTileIndex];
          board[currentTileIndex] = board[index];
          board[index] = tmp;
          currentTileIndex = index;
        }
      }

      pivot++;
    }

    return {
      ...state,
      board,
    };
  }

  move(currentState: IGameState, moveDirection: MoveDirection): IGameState {
    let newState = cloneDeep(currentState);

    for (const row of range(0, 4)) {
      const indexes = this._getRevercedRowIndexes(moveDirection, row);

      newState = this._mergeBoard(newState, indexes);
      newState = this._shiftBoard(newState, indexes);
    }

    return newState;
  }

  canIMakeMove(state: IGameState, moveDirection?: MoveDirection): boolean {
    const _state = cloneDeep(state);

    if (moveDirection !== undefined) {
      const newState = this.move(_state, moveDirection!);
      return isEqual(newState.board, _state.board) === false;
    }

    const upedState = this.move(_state, MoveDirection.UP);
    if (!isEqual(upedState.board, _state.board)) return true;

    const leftedState = this.move(_state, MoveDirection.LEFT);
    if (!isEqual(leftedState.board, _state.board)) return true;

    const rightedState = this.move(_state, MoveDirection.RIGHT);
    if (!isEqual(rightedState.board, _state.board)) return true;

    const downedState = this.move(_state, MoveDirection.DOWN);
    if (!isEqual(downedState.board, _state.board)) return true;

    return false;
  }

  checkGameOver(state: IGameState): IGameState {
    const isGameOver = this.canIMakeMove(state) === false;

    return {
      ...state,
      isGameOver,
    };
  }

  checkWin(state: IGameState): IGameState {
    const isWin = state.board.filter(({ value }) => value === 2048).length > 0;

    return {
      ...state,
      isWin,
    };
  }
}

export default GameLogic;
