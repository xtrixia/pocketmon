import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";

import Container from "./Container";

test("Container should render correctly", () => {
  const component = renderer.create(
    <Router>
      <Container>
        <div>This is children</div>
      </Container>
    </Router>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  // container contains navbar and its wrapping children
  // check if navbar exist
  expect(tree[0].type).toContain("header");
  // check if children component exist
  expect(tree[1].type).toContain("div");
  expect(tree[1].children[0].children[0]).toContain("This is children");
});
