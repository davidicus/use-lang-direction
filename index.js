import { useEffect, useState, useRef } from "react";

export function useLangDirection() {
  // Default target
  // @TODO: add ability to watch any element
  const element = document.getElementsByTagName("html")[0];
  // Read and set initial direction from default
  const [direction, setDirection] = useState(element.getAttribute("dir"));
  // Store obsever as ref so we can ensure we are cleaning all obvservers up
  const observer = useRef(null);

  useEffect(
    function () {
      // Callback function to execute when mutations are observed
      const callback = function (mutationsList) {
        // Use traditional 'for loops' for IE 11
        for (let mutation of mutationsList) {
          // Check if mutation was our dir attribute
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "dir" &&
            mutation.oldValue !== element.getAttribute("dir")
          ) {
            // Set the new direction
            setDirection(element.getAttribute("dir"));
          }
        }
      };
      // Disconnect any old observers
      if (observer.current) observer.current.disconnect();
      // Options for the observer (which mutations to observe)
      const config = { attributes: true };
      // Create an observer instance linked to the callback function
      observer.current = new MutationObserver(callback);

      const { current: currentObserver } = observer;
      // Start observing the target node for configured mutations
      currentObserver.observe(element, config);
      // Disconnect on unmount
      return function () {
        currentObserver.disconnect();
      };
    },
    [element, direction]
  );
  // Return the element direction value
  return direction;
}
