import React from "react";
import { useDispatch } from "react-redux";
import { userAction } from "../redux/module/user";
import Spinner from "../shared/Spinner";

const GoogleRedirect = (props) => {
  const dispatch = useDispatch();
  let code = new URL(window.location.href).searchParams.get("code");

  React.useEffect(() => {
    const googleLogin = async () => {
      await dispatch(userAction.googleLoginDB(code));
    };
    googleLogin();
  }, []);

  return <Spinner />;
};

export default GoogleRedirect;
