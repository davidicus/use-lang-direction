"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLangDirection = useLangDirection;

var _react = require("react");

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useLangDirection() {
  // Default target
  // @TODO: add ability to watch any element
  var element = document.getElementsByTagName("html")[0]; // Read and set initial direction from default

  var _useState = (0, _react.useState)(element.getAttribute("dir")),
      _useState2 = _slicedToArray(_useState, 2),
      direction = _useState2[0],
      setDirection = _useState2[1]; // Store obsever as ref so we can ensure we are cleaning all obvservers up


  var observer = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    // Callback function to execute when mutations are observed
    var callback = function callback(mutationsList) {
      // Use traditional 'for loops' for IE 11
      var _iterator = _createForOfIteratorHelper(mutationsList),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var mutation = _step.value;

          // Check if mutation was our dir attribute
          if (mutation.type === "attributes" && mutation.attributeName === "dir" && mutation.oldValue !== element.getAttribute("dir")) {
            // Set the new direction
            setDirection(element.getAttribute("dir"));
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }; // Disconnect any old observers


    if (observer.current) observer.current.disconnect(); // Options for the observer (which mutations to observe)

    var config = {
      attributes: true
    }; // Create an observer instance linked to the callback function

    observer.current = new MutationObserver(callback);
    var currentObserver = observer.current; // Start observing the target node for configured mutations

    currentObserver.observe(element, config); // Disconnect on unmount

    return function () {
      currentObserver.disconnect();
    };
  }, [element, direction]); // Return the element direction value

  return direction;
}