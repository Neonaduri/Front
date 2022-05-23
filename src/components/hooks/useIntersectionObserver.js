import { MutableRefObject, useCallback, useRef } from "react";

const useIntersectionObserver = (action, threshold = 1) => {
  const target = useRef();

  const onIntersect = useCallback(
    ([entry]) => {
      if (entry.isIntersecting) {
        action();
      }
    },
    [action]
  );

  const observerElementRef = useCallback(
    (node) => {
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
