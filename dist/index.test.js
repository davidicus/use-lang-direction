"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Link.react.test.js
var Component = function Component() {
  var langDir = (0, _.useLangDirection)();
  return /*#__PURE__*/_react.default.createElement("input", {
    dir: langDir,
    type: "text"
  });
};

test("Direction should be 'ltr'", function () {
  var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(Component, null));
  expect(wrapper.find("input")); // manually trigger the callback
});