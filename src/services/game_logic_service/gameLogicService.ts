import cloneDeep from "lodash/cloneDeep";
// import isEqual from 'lodash/isEqual';
import range from "lodash/range";

type IBoardTile = {
  value: number;
  id: string;
};

type IBoard = IBoardTile[];

type IGameState = {
  board: IBoard;
  isGameOver: boolean;
  isWin: boolean;
  score: number;
};

export enum MoveDirection {
  UP = 1,
  DOWN,
  LEFT,
  RIGHT,
}

class GameLogicService {
  static _currentId: number = 1;
  static generateId(): string {
    return (this._currentId++).toString();
  }

  static _boardInit(): IBoard {
    return Array(16)
      .fill(null)
      .map(() => ({
        value: 0,
        id: this.generateId(),
      }));
  }

  static gameStateInit(): IGameState {
    return {
      board: this._boardInit(),
      isGameOver: false,
      isWin: false,
      score: 0,
    };
  }

  static addTile(gameState: IGameState): IGameState {
    const emptyTileIndexes = gameState.board
      .map(({ value }, index) => (value === 0 ? index : -1))
      .filter((index) => index >= 0);

    if (emptyTileIndexes.length === 0) return;

    const randomIndex =
      emptyTileIndexes[Math.floor(Math.random() * emptyTileIndexes.length)];

    gameState.board[randomIndex].value = 2;

    return { ...gameState };
  }

  static _getRevercedRowIndexes(
    moveDirection: MoveDirection,
    row: number
  ): number[] {
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

  static _mergeBoard(state: IGameState, indexes: number[]): IGameState {
    const board = state.board;

    let currentTileIndex: number | null = null;
    let scoreDelta = 0;
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
        scoreDelta += board[currentTileIndex].value;
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
      score: state.score + scoreDelta,
    };
  }

  static _shiftBoard(state: IGameState, indexes: number[]): IGameState {
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

  static move(
    currentState: IGameState,
    moveDirection: MoveDirection
  ): IGameState {
    let newState = cloneDeep(currentState);

    for (const row of range(0, 4)) {
      const indexes = this._getRevercedRowIndexes(moveDirection, row);

      newState = this._mergeBoard(newState, indexes);
      newState = this._shiftBoard(newState, indexes);
    }

    return newState;
  }
}

export default GameLogicService;