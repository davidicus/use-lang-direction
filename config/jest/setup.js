"use strict";
import React from "react";

const enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

enzyme.configure({ adapter: new Adapter() });

// https://github.com/facebook/react/issues/14050
// Needed to support useEffect in jest tests
React.useEffect = React.useLayoutEffect;

/** optional file that can be imported if certain testcases need to manage their own JSDOM */
const { JSDOM } = require("jsdom");

const jsdom = new JSDOM("<!doctype html><html dir='ltr'><body></body></html>", {
  pretendToBeVisual: true,
});
const { window } = jsdom;

global.window = window;
global.document = window.document;
global.addEventListener = () => {};
