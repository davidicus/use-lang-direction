import { useEffect, useState, useRef } from "react";

export function useLangDirection(target) {
  const [direction, setDirection] = useState(
    document.getElementsByTagName("html")[0].getAttribute("dir")
  );
  const [targetElement, setTargetElement] = useState(
    document.getElementsByTagName("html")[0]
  );
  const observer = useRef(null);
  if (target) setTargetElement(target);
  useEffect(() => {
    // Callback function to execute when mutations are observed
    const callback = function (mutationsList, observer) {
      // Use traditional 'for loops' for IE 11
      for (let mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "dir"
        ) {
          console.log(
            "The " +
              mutation.attributeName +
              " attribute was modified to " +
              document.getElementsByTagName("html")[0].getAttribute("dir")
          );
          setDirection(
            document.getElementsByTagName("html")[0].getAttribute("dir")
          );
        }
      }
    };
    if (observer.current) observer.current.disconnect();
    // Options for the observer (which mutations to observe)
    const config = { attributes: true };
    // Create an observer instance linked to the callback function
    observer.current = new MutationObserver(callback);

    const { current: currentObserver } = observer;
    // Start observing the target node for configured mutations
    currentObserver.observe(targetElement, config);

    return () => currentObserver.disconnect();
  }, [targetElement, direction]);

  return direction;
}
