import React from "react";
import renderer from "react-test-renderer";

import PokeImg from "./PokeImg";

test("PokeImg render correctly", () => {
  const props = {
    src: "https://cdn.logo.com/hotlink-ok/logo-social.png",
    alt: "something",
  };
  const component = renderer.create(<PokeImg {...props} />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.type).toStrictEqual("img");
  expect(tree.props.src).toStrictEqual(props.src);
  expect(tree.props.alt).toStrictEqual(props.alt);
});
