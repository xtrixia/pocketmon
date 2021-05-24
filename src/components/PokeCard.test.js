import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";

import PokeCard from "./PokeCard";

test("PokeCard should render landscape and clickable", () => {
  const imgUrl = "https://cdn.logo.com/hotlink-ok/logo-social.png";
  const props = {
    isClickable: true,
    url: `/profile/ivysaur?img=${imgUrl}`,
    title: "ivysaur",
    imgUrl: imgUrl,
    totalOwned: 0,
  };
  const component = renderer.create(
    <Router>
      <PokeCard {...props} />
    </Router>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.type).toEqual("a");
  expect(tree.props.href).toEqual(`/profile/ivysaur?img=${imgUrl}`);

  const PokeImg = tree.children[0];
  expect(PokeImg.type).toEqual("img");
  expect(PokeImg.props.alt).toEqual(props.title);

  const caption = tree.children[1];
  expect(caption.type).toEqual("div");
  // title
  expect(caption.children[0].children[0]).toEqual(props.title);
  // description
  expect(caption.children[1].children[1]).toEqual(String(props.totalOwned));
});

test("PokeCard should render potrait", () => {
  const imgUrl = "https://cdn.logo.com/hotlink-ok/logo-social.png";
  const props = {
    url: `/profile/ivysaur?img=${imgUrl}`,
    title: "ivysaur",
    imgUrl: imgUrl,
    description: "djoko",
  };
  const component = renderer.create(
    <Router>
      <PokeCard {...props} />
    </Router>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.type).toEqual("div");

  const PokeImg = tree.children[0];
  expect(PokeImg.type).toEqual("img");
  expect(PokeImg.props.alt).toEqual(props.title);

  const caption = tree.children[1];
  expect(caption.type).toEqual("div");

  // title
  expect(caption.children[0].children[0]).toEqual(props.title);
  // description
  expect(caption.children[1].type).toEqual("a");
  expect(caption.children[1].props.href).toEqual(props.url);
  expect(caption.children[1].children[0]).toEqual(props.description);
});
