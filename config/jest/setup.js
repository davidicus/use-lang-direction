"use strict";
import React from "react";

const enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

enzyme.configure({ adapter: new Adapter() });

// https://github.com/facebook/react/issues/14050
// Needed to support useEffect in jest tests
React.useEffect = React.useLayoutEffect;
