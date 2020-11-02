import React from "react";
import { shallow } from "enzyme";
import BigText from "./";

describe("<BigText /> Component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<BigText>This is a BigText</BigText>);
    const heading = wrapper.find("h2");
    expect(heading).toHaveLength(1);
    expect(heading.text()).toEqual("This is a BigText");
  });
});
