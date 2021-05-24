import React from "react";
import renderer from "react-test-renderer";

import TextBox from "./TextBox";

test("TextBox should render correctly according to passed props", () => {
  const component = renderer.create(
    <TextBox
      id="input-nickname-field"
      label="Nickname"
      value=""
      placeholder="Input nickname here"
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.type).toEqual("fieldset");

  const label = tree.children[0];
  expect(label.props).toHaveProperty("htmlFor", "input-nickname-field");
  expect(label.children[0]).toEqual("Nickname");

  const input = tree.children[1];
  expect(input.children).toBeNull();
});

test("TextBox should render with helper text below", () => {
  const component = renderer.create(
    <TextBox
      value=""
      helperText="This is just short info"
      placeholder="Input short info about you"
    />
  );
  
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  const span = tree.children[2];
  expect(span.type).toEqual("span");
  expect(span.children[0]).toEqual("This is just short info");
});
