import { MutableRefObject, useCallback, useRef } from "react";

const useIntersectionObserver = (action, threshold = 1) => {
  const target = useRef();

  const onIntersect = useCallback(
    ([entry]) => {
      if (entry.isIntersecting) {
        action();
        console.log(action);
      }
    },
    [action]
  );

  const observerElementRef = useCallback(
    (node) => {
      console.log(node);
      if (target.current) {
        target.current.disconnect();
      }
      target.current = new IntersectionObserver(onIntersect, {
        threshold,
      });

      if (node) target.current.observe(node);
    },
    [onIntersect, threshold]
  );

  return [observerElementRef];
};

export default useIntersectionObserver;
