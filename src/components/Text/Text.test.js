import React from "react";
import { shallow } from "enzyme";
import Text from "./";

describe("<Text /> Component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Text>This is a Text</Text>);
    const span = wrapper.find("span");
    expect(span).toHaveLength(1);
    expect(span.text()).toEqual("This is a Text");
  });
});
