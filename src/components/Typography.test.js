import React from "react";
import renderer from "react-test-renderer";

import Typography from "./Typography";

test("Typography should render all variants", () => {
  const variantMapping = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "subheading1",
    "subheading2",
    "subtitle",
    "body",
  ];

  variantMapping.forEach((variant) => {
    const component = renderer.create(
      <Typography variant={variant}>Hello</Typography>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    // expect(tree).toHaveProperty("type", variant);
  });
});

test("Typography render text passed from props", () => {
  const component = renderer.create(<Typography>Hello world</Typography>);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.children[0]).toEqual("Hello world");
});

test("Typography should render variant body by default", () => {
  const component = renderer.create(<Typography>Hello world</Typography>);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  // we did an abstraction for variant body using <p>
  expect(tree.type).toEqual("p");
});
