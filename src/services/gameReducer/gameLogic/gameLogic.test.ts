import GameLogic, { MoveDirection } from "./gameLogic";

describe("Game logic service", () => {
  test("initState should init state", () => {
    const initialState = GameLogic.gameStateInit();

    expect(initialState.isGameOver).toBe(false);
    expect(initialState.isWin).toBe(false);
    expect(initialState.score).toBe(0);
    expect(initialState.board.map(({ value }) => value)).toEqual(
      GameLogic._boardInit().map(({ value }) => value)
    );
  });

  test("addTile should add new tile", () => {
    const initialState = GameLogic.gameStateInit();

    const newState = GameLogic.addTile(initialState);

    expect(newState.board.filter(({ value }) => value === 2).length).toBe(1);
  });

  test("move: should shift tiles and merge with move UP", () => {
    const initState = GameLogic.gameStateInit();

    initState.board[4].value = 4;
    initState.board[8].value = 8;
    initState.board[12].value = 8;

    initState.board[10].value = 4;
    initState.board[14].value = 4;

    const resultState = GameLogic.move(initState, MoveDirection.UP);

    expect(resultState.board[0].value).toBe(4);
    expect(resultState.board[4].value).toBe(16);

    expect(resultState.board[2].value).toBe(8);

    expect(resultState.score).toBe(24);
  });

  test("move: should shift tiles and merge with move DOWN", () => {
    const initState = GameLogic.gameStateInit();

    initState.board[4].value = 4;
    initState.board[8].value = 8;
    initState.board[12].value = 8;

    initState.board[6].value = 4;
    initState.board[14].value = 4;

    const resultState = GameLogic.move(initState, MoveDirection.DOWN);

    expect(resultState.board[8].value).toBe(4);
    expect(resultState.board[12].value).toBe(16);

    expect(resultState.board[14].value).toBe(8);

    expect(resultState.score).toBe(24);
  });

  test("move: should shift tiles and merge with move RIGHT", () => {
    const initState = GameLogic.gameStateInit();

    initState.board[0].value = 16;
    initState.board[1].value = 16;
    initState.board[3].value = 16;

    initState.board[8].value = 4;
    initState.board[10].value = 4;

    const resultState = GameLogic.move(initState, MoveDirection.RIGHT);

    expect(resultState.board[2].value).toBe(16);
    expect(resultState.board[3].value).toBe(32);

    expect(resultState.board[11].value).toBe(8);

    expect(resultState.score).toBe(40);
  });

  test("move: should shift tiles and merge with move LEFT", () => {
    const initState = GameLogic.gameStateInit();

    initState.board[0].value = 8;
    initState.board[1].value = 8;
    initState.board[3].value = 16;

    initState.board[8].value = 4;
    initState.board[10].value = 4;

    const resultState = GameLogic.move(initState, MoveDirection.LEFT);

    expect(resultState.board[0].value).toBe(16);
    expect(resultState.board[1].value).toBe(16);

    expect(resultState.board[8].value).toBe(8);

    expect(resultState.score).toBe(24);
  });

  test("canIMakeMove (not full board): should return false if i cant make move and true if i can", () => {
    const initState = GameLogic.gameStateInit();

    initState.board[0].value = 2;
    initState.board[1].value = 4;
    initState.board[2].value = 16;
    initState.board[3].value = 32;

    expect(GameLogic.canIMakeMove(initState, MoveDirection.UP)).toBe(false);
    expect(GameLogic.canIMakeMove(initState, MoveDirection.LEFT)).toBe(false);
    expect(GameLogic.canIMakeMove(initState, MoveDirection.RIGHT)).toBe(false);
    expect(GameLogic.canIMakeMove(initState, MoveDirection.DOWN)).toBe(true);
  });

  test("canIMakeMove (full blocked board): should return false", () => {
    const initState = GameLogic.gameStateInit();

    initState.board[0].value = 2;
    initState.board[1].value = 4;
    initState.board[2].value = 2;
    initState.board[3].value = 4;

    initState.board[4].value = 4;
    initState.board[5].value = 2;
    initState.board[6].value = 4;
    initState.board[7].value = 2;

    initState.board[8].value = 2;
    initState.board[9].value = 4;
    initState.board[10].value = 2;
    initState.board[11].value = 4;

    initState.board[12].value = 4;
    initState.board[13].value = 2;
    initState.board[14].value = 4;
    initState.board[15].value = 2;

    expect(GameLogic.canIMakeMove(initState, MoveDirection.UP)).toBe(false);
    expect(GameLogic.canIMakeMove(initState, MoveDirection.LEFT)).toBe(false);
    expect(GameLogic.canIMakeMove(initState, MoveDirection.RIGHT)).toBe(false);
    expect(GameLogic.canIMakeMove(initState, MoveDirection.DOWN)).toBe(false);
  });

  test("checkGameOver with not loose tiles position should return state wint isGameOver: false", () => {
    const initState = GameLogic.gameStateInit();
    expect(GameLogic.checkGameOver(initState).isGameOver).toBe(true);

    initState.board[0].value = 2;
    initState.board[2].value = 4;

    expect(GameLogic.checkGameOver(initState).isGameOver).toBe(false);
  });

  test("checkGameOver with loose tiles position should return state with isGameOver: true", () => {
    const initState = GameLogic.gameStateInit();

    initState.board[0].value = 2;
    initState.board[1].value = 4;
    initState.board[2].value = 2;
    initState.board[3].value = 4;

    initState.board[4].value = 4;
    initState.board[5].value = 2;
    initState.board[6].value = 4;
    initState.board[7].value = 2;

    initState.board[8].value = 2;
    initState.board[9].value = 4;
    initState.board[10].value = 2;
    initState.board[11].value = 4;

    initState.board[12].value = 4;
    initState.board[13].value = 2;
    initState.board[14].value = 4;
    initState.board[15].value = 2;

    expect(GameLogic.checkGameOver(initState).isGameOver).toBe(true);
  });
});
