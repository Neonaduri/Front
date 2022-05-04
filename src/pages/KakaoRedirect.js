import React, { useEffect } from "react";
import Spinner from "../shared/Spinner";
import { userAction } from "../redux/module/user";
import { useDispatch } from "react-redux";

const KakaoRedirect = () => {
  const dispatch = useDispatch();
  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    const kakaoLogin = async () => {
      await dispatch(userAction.kakaoLoginDB(code));
    };
    kakaoLogin();
  }, []);
  return (
    <div>
      <Spinner></Spinner>
    </div>
  );
};

export default KakaoRedirect;
