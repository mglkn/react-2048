import React from "react";
import { mount } from "enzyme";
import { act } from "@testing-library/react";

import App from "./App";
import { ReducerContext } from "../../gameReducer/reduserContext";
import GameLogic, { MoveDirection } from "../../services/gameLogic/gameLogic";

describe("App widget", () => {
  test("should initialize state after load", () => {
    const initialState = new GameLogic().gameStateInit();
    const gameReducerMock = jest.fn().mockReturnValue(initialState);

    const component = (
      <ReducerContext.Provider value={gameReducerMock}>
        <App />
      </ReducerContext.Provider>
    );

    mount(component);

    expect(gameReducerMock.mock.calls.length).toBe(1);
    expect(gameReducerMock.mock.calls[0]).toEqual([null, { type: "init" }]);
  });

  test("should update board after move", () => {
    const gameLogic = new GameLogic();
    const initialState = gameLogic.gameStateInit();
    const gameReducerMock = jest.fn().mockReturnValue(initialState);

    const component = (
      <ReducerContext.Provider value={gameReducerMock}>
        <App />
      </ReducerContext.Provider>
    );

    const wrapper = mount(component);

    wrapper.update();

    gameReducerMock
      .mockClear()
      .mockReturnValue(gameLogic.gameStep(initialState, MoveDirection.DOWN));

    const event = new KeyboardEvent("keydown", { key: "ArrowDown" });

    act(() => {
      window.dispatchEvent(event);
    });

    expect(gameReducerMock.mock.calls.length).toBe(1);
    expect(gameReducerMock.mock.calls[0][1]).toEqual({
      type: "game_step",
      moveDirection: MoveDirection.DOWN,
    });
  });
});
