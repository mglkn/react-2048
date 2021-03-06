import createReducer from "./gameReducer";
import GameLogic, { MoveDirection } from "../services/gameLogic/gameLogic";

describe("gameReduser", () => {
  const gameLogic = new GameLogic();
  const gameReducer = createReducer({ gameLogic });

  test("GAME_INIT action should init state", () => {
    const newState = gameReducer(null, { type: "init" });

    expect(newState.isWin).toBe(false);
    expect(newState.isGameOver).toBe(false);

    expect(newState.board.filter(({ value }) => value === 2).length).toBe(2);
  });

  test("GAME_STEP (ordinary board) should move board", () => {
    const initState = gameLogic.gameStateInit();

    initState.board[0].value = 2;
    initState.board[1].value = 2;

    const newState = gameReducer(initState, {
      type: "game_step",
      moveDirection: MoveDirection.LEFT,
    });

    expect(newState.isWin).toBe(false);
    expect(newState.isGameOver).toBe(false);
    expect(newState.board[0].value).toBe(4);
  });

  test("GAME_STEP (win board) should return isWin: true", () => {
    const initState = gameLogic.gameStateInit();

    initState.board[0].value = 1024;
    initState.board[1].value = 1024;

    const newState = gameReducer(initState, {
      type: "game_step",
      moveDirection: MoveDirection.LEFT,
    });

    expect(newState.isWin).toBe(true);
  });

  test("GAME_STEP (loose board) should return isGameOver: true", () => {
    const initState = gameLogic.gameStateInit();

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

    const newState = gameReducer(initState, {
      type: "game_step",
      moveDirection: MoveDirection.LEFT,
    });

    expect(newState.isGameOver).toBe(true);
  });
});
