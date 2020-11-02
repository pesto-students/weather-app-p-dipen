import React from "react";
import { mount } from "enzyme";
import Card from "./";

describe("<Card /> Component", () => {
  it("renders without crashing", () => {
    const props = {
      city: "Test",
      country: "TT",
      date: "28/08/2020",
      main: "Thunderstorm",
      description: "description",
      temp: 26,
    };
    const wapper = mount(<Card {...props} />);
    const BigText = wapper.find("h2");
    expect(BigText).toHaveLength(1);
    expect(BigText.text()).toEqual(props.city + ", " + props.country);
  });
});
