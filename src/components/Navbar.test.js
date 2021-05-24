import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";

import Navbar from "./Navbar";

test("Navbar should render correctly", () => {
  const component = renderer.create(
    <Router>
      <Navbar />
    </Router>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.type).toEqual("header");
  // check if logo exist
  expect(tree.children[0].children[0].type).toEqual("img");
  expect(tree.children[0].children[0].props.alt).toEqual("Pockétmon logo");
});
