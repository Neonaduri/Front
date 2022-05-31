import React from "react";
import { useSelector } from "react-redux";

const Permit = (props) => {
  const isLogin = useSelector((state) => state.user.isLogin);

  if (isLogin) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }
  return null;
};

export default Permit;
