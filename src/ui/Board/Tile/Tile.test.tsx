import React from "react";
import { shallow, mount } from "enzyme";
import { act } from "@testing-library/react";

import Tile from "./Tile";

import config from "../../../config";

describe("Tile widget", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  test("init render should has class `board__tile`", () => {
    const component = shallow(<Tile value={0} />);

    expect(component.hasClass("board__tile")).toBe(true);
    expect(component.hasClass("board__tile_animate")).toBe(false);
  });

  test("should has style color: transparent when value is 0", () => {
    const component = shallow(<Tile value={0} />);

    expect(component.get(0).props.style.backgroundColor).toBe("transparent");
  });

  test("should has color corresponding to the value", () => {
    const value = 8;

    const component = shallow(<Tile value={value} />);

    expect(component.get(0).props.style.backgroundColor).toBe(
      config.colors[value]
    );
  });

  test("when `value` changed should add class animation and remove if after 150ms", () => {
    const startValue = 2;
    const endValue = 4;

    const wrapper = mount(<Tile value={startValue} />);

    expect(wrapper.find(".board__tile_animate")).toHaveLength(0);

    wrapper.setProps({ value: endValue });

    expect(wrapper.update().find(".board__tile_animate")).toHaveLength(1);

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(wrapper.update().find(".board__tile_animate")).toHaveLength(0);
  });
});
