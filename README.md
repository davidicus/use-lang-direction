# use-lang-direction

A React hook that reads the HTML element's dir attribute value and any updates to that value allowing you to update your UI based of direction

## In Action

[CodeSandbox Demo](https://codesandbox.io/s/uselangdirection-ditky)

## Basic Usage

```JavaScript
import React from "react";
import useLangDirection from "use-lang-direction";

const App = () => {
  const langDir = useLangDirection();

  return (
    <div >
      <input dir={langDir} type="text" />
    </div>
  );
};

```

## License

MIT
