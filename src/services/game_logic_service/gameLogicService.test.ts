import GameLogicService, { MoveDirection } from "./gameLogicService";

describe("Game logic service", () => {
  test("initState should init state", () => {
    const initialState = GameLogicService.gameStateInit();

    expect(initialState.isGameOver).toBe(false);
    expect(initialState.isWin).toBe(false);
    expect(initialState.score).toBe(0);
    expect(initialState.board.map(({ value }) => value)).toEqual(
      GameLogicService._boardInit().map(({ value }) => value)
    );
  });

  test("addTile should add new tile", () => {
    const initialState = GameLogicService.gameStateInit();

    const newState = GameLogicService.addTile(initialState);

    expect(newState.board.filter(({ value }) => value === 2).length).toBe(1);
  });

  test("move: should shift tiles and merge with move UP", () => {
    const initState = GameLogicService.gameStateInit();

    initState.board[4].value = 4;
    initState.board[8].value = 8;
    initState.board[12].value = 8;

    initState.board[10].value = 4;
    initState.board[14].value = 4;

    const resultState = GameLogicService.move(initState, MoveDirection.UP);

    expect(resultState.board[0].value).toBe(4);
    expect(resultState.board[4].value).toBe(16);

    expect(resultState.board[2].value).toBe(8);

    expect(resultState.score).toBe(24);
  });

  test("move: should shift tiles and merge with move DOWN", () => {
    const initState = GameLogicService.gameStateInit();

    initState.board[4].value = 4;
    initState.board[8].value = 8;
    initState.board[12].value = 8;

    initState.board[6].value = 4;
    initState.board[14].value = 4;

    const resultState = GameLogicService.move(initState, MoveDirection.DOWN);

    expect(resultState.board[8].value).toBe(4);
    expect(resultState.board[12].value).toBe(16);

    expect(resultState.board[14].value).toBe(8);

    expect(resultState.score).toBe(24);
  });

  test("move: should shift tiles and merge with move RIGHT", () => {
    const initState = GameLogicService.gameStateInit();

    initState.board[0].value = 16;
    initState.board[1].value = 16;
    initState.board[3].value = 16;

    initState.board[8].value = 4;
    initState.board[10].value = 4;

    const resultState = GameLogicService.move(initState, MoveDirection.RIGHT);

    expect(resultState.board[2].value).toBe(16);
    expect(resultState.board[3].value).toBe(32);

    expect(resultState.board[11].value).toBe(8);

    expect(resultState.score).toBe(40);
  });

  test("move: should shift tiles and merge with move LEFT", () => {
    const initState = GameLogicService.gameStateInit();
    initState.board[0].value = 8;
    initState.board[1].value = 8;
    initState.board[3].value = 16;

    initState.board[8].value = 4;
    initState.board[10].value = 4;

    const resultState = GameLogicService.move(initState, MoveDirection.LEFT);

    expect(resultState.board[0].value).toBe(16);
    expect(resultState.board[1].value).toBe(16);

    expect(resultState.board[8].value).toBe(8);

    expect(resultState.score).toBe(24);
  });
});
