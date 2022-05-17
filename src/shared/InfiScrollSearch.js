import React from "react";
import _ from "lodash";
import Spinner from "./Spinner";

const InfiScrollSearch = (props) => {
  const { children, callNext, is_next, loading } = props;

  const container = document.getElementById("container");
  console.log(container);

  let clientHeight = container.clientHeight;
  let scrollTop = container.scrollTop;
  let scrollHeight = container.scrollHeight;

  const _handleScroll = _.throttle(() => {
    if (loading) {
      return;
    }

    console.log(scrollHeight - clientHeight - scrollTop);
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    if (scrollHeight - innerHeight - scrollTop < 1000) {
      callNext();
    }
  }, 500);

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
      {props.children}
      {is_next && <Spinner />}
    </React.Fragment>
  );
};
InfiScrollSearch.defaultProps = {
  children: null,
  callNext: () => {},
  is_next: false,
  loading: false,
};

export default InfiScrollSearch;
