import React from "react";
import { shallow, mount } from "enzyme";
import { act } from "@testing-library/react";
import GameLogic from "../../services/gameLogic/gameLogic";

import DoneGamePopup from "./DoneGamePopup";

describe("DoneGamePopup", () => {
  test("should show 'You WIN' if state.isWin is true", () => {
    const gameState = new GameLogic().gameStateInit();
    const newGameAction = Function.call(null);

    const wrapper = shallow(
      <DoneGamePopup
        state={{ ...gameState, isWin: true }}
        newGameAction={newGameAction}
      />
    );

    expect(wrapper.findWhere((x) => x.type() === "h2").html()).toContain(
      "You WIN"
    );
  });

  test("should show 'Game OVER' if state.isGameOver is true", () => {
    const gameState = new GameLogic().gameStateInit();
    const newGameAction = Function.call(null);

    const wrapper = shallow(
      <DoneGamePopup
        state={{ ...gameState, isGameOver: true }}
        newGameAction={newGameAction}
      />
    );

    expect(wrapper.findWhere((x) => x.type() === "h2").html()).toContain(
      "Game OVER"
    );
  });

  test("should call newGameAction when 'new game' button clicked", () => {
    const gameState = new GameLogic().gameStateInit();
    const newGameAction = jest.fn();

    const wrapper = shallow(
      <DoneGamePopup
        state={{ ...gameState, isGameOver: true }}
        newGameAction={newGameAction}
      />
    );

    wrapper.find(".done-game-popup__button").simulate("click");

    expect(newGameAction.mock.calls.length).toBe(1);
  });
});
