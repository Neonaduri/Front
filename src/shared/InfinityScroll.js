import React, { useEffect, useRef, forwardRef } from "react";
import _ from "lodash";
import Spinner from "./Spinner";

const InfinityScroll = forwardRef((props, ref) => {
  const { children, callNext, is_next, loading } = props;

  // 이렇게 돔요소를 가져오는 경우 랜더링보다 자바스크립트가 빨라서 새로고쳤을때 null이 됨
  // let container = document.getElementById("container");
  // let container = ref.current;
  // 수정할 것

  //
  let container;
  useEffect(() => {
    container = ref.current;
  }, [callNext]);
  //
  console.log(container);
  const _handleScroll = _.throttle(() => {
    if (loading) {
      return;
    }

    const clientHeight = container.clientHeight;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;

    if (scrollHeight - clientHeight - scrollTop < 60) {
      callNext();
    }

    // const { innerHeight } = window;
    // const { scrollHeight } = document.body;
    // const scrollTop =
    //   (document.documentElement && document.documentElement.scrollTop) ||
    //   document.body.scrollTop;
    // if (scrollHeight - innerHeight - scrollTop < 100) {
    //   callNext();
    // }
  }, 1000);

  const handleScroll = React.useCallback(_handleScroll, [loading]);

  React.useEffect(() => {
    if (loading) {
      return;
    }
    if (is_next && container !== undefined) {
      container.addEventListener("scroll", handleScroll);
    } else if (!is_next && container !== undefined) {
      container.removeEventListener("scroll", handleScroll);
    }
    if (container !== undefined) {
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [is_next, loading]);

  return (
    <React.Fragment>
      {children}
      {is_next && <Spinner />}
    </React.Fragment>
  );
});
InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
  is_next: false,
  loading: false,
};

export default InfinityScroll;
