import React from "react";
import Tile from "./Tile";
import { shallow } from "enzyme";

test("test react", () => {
  const component = shallow(<Tile value={0} />);

  expect(component.hasClass("board__tile")).toBe(true);
});
