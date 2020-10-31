import React from "react";
import { shallow } from "enzyme";
import MediumText from "./";

describe("<MediumText /> Component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<MediumText>This is a MediumText</MediumText>);
    const heading = wrapper.find("h3");
    expect(heading).toHaveLength(1);
    expect(heading.text()).toEqual("This is a MediumText");
  });
});
