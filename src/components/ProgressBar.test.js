import React from "react";
import renderer from "react-test-renderer";

import ProgressBar from "./ProgressBar";

test("ProgressBar render correctly according to props", () => {
  const values = [{ value: 72 }, { value: 50 }];

  values.forEach((val) => {
    const component = renderer.create(
      <ProgressBar value={val.value} color={val.color}>
        Click here
      </ProgressBar>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree.props.role).toStrictEqual("progressbar");
    expect(tree.props["aria-valuenow"]).toEqual(val.value);
  });
});
