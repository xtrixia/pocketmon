import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";

import Modal from "./Modal";

test("Modal should render correctly", () => {
  const component = renderer.create(
    <Router>
      <Modal content="This is modal" />
    </Router>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.children[0].children[0].children[0]).toEqual("This is modal");
});

test("Modal should render transparently", () => {
  const component = renderer.create(
    <Router>
      <Modal transparent>
        <p>This is modal</p>
      </Modal>
    </Router>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.children[0].children[0].type).toEqual("p");
  expect(tree.children[0].children[0].children[0]).toEqual("This is modal");
});
