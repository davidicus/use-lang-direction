import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { useLangDirection } from '.';

const Component = () => {
  const langDir = useLangDirection();
  return <input dir={langDir} type="text" />;
};
test("Direction should be 'ltr'", () => {
  let wrapper;
  act(() => {
    wrapper = mount(<Component />);
  });

  expect(wrapper.find('input').prop('dir')).toEqual('ltr');
});

test("Direction should be 'rtl'", async () => {
  let wrapper;
  await act(async () => {
    await document.documentElement.setAttribute('dir', 'rtl');
    wrapper = mount(<Component />);
  });

  const inputDir = wrapper.find('input').prop('dir');
  expect(inputDir).toEqual('rtl');
});
