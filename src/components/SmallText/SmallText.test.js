import React from "react";
import { shallow } from "enzyme";
import SmallText from "./";

describe("<SmallText /> Component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<SmallText>This is a SmallText</SmallText>);
    const heading = wrapper.find("h4");
    expect(heading).toHaveLength(1);
    expect(heading.text()).toEqual("This is a SmallText");
  });
});
