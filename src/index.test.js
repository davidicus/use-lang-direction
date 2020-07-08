import React from "react";
import { mount } from "enzyme";
import { useLangDirection } from ".";

const Component = () => {
  const langDir = useLangDirection();
  return <input dir={langDir} type="text" />;
};
test("Direction should be 'ltr'", () => {
  const wrapper = mount(<Component />);

  expect(wrapper.find("input").prop("dir")).toEqual("ltr");
});

test("Direction should be 'rtl'", () => {
  document.documentElement.setAttribute("dir", "rtl");
  const wrapper = mount(<Component />);

  expect(wrapper.find("input").prop("dir")).toEqual("rtl");
});
