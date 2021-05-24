import React from "react";
import renderer from "react-test-renderer";

import PokeLabel from "./PokeLabel";

test("PokeLabel render correctly", () => {
  const component = renderer.create(<PokeLabel text="mystic" />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.type).toEqual("p");
  expect(tree.children[0]).toEqual("mystic");
});
