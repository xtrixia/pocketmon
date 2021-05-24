import React from "react";
import renderer from "react-test-renderer";

import Button from "./Button";

test("Button rendered with unique id passed from props", () => {
  const component = renderer.create(
    <Button id="btn-click-here">Click here</Button>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.props).toHaveProperty("id", "btn-click-here");
});

test("Button onClick function works as expected", () => {
  const mockFn = jest.fn();
  const a = new mockFn();

  const component = renderer.create(
    <Button id="btn-click-here" onClick={mockFn}>
      Click here
    </Button>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  tree.props.onClick();
  expect(mockFn.mock.instances[0]).toBe(a);
});
