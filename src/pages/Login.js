import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import GoogleBtn from "../components/login/GoogleBtn";
import KakaoBtn from "../components/login/KakaoBtn";
import { userAction } from "../redux/module/user";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRegExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const [disabled, setDisabled] = useState(false);

  const emailFormCheck = (e) => {
    const inputEmail = e.target.value;
    if (inputEmail.match(emailRegExp) === null) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };
  const loginBtnClick = () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    if (password.length < 4 || password.length > 11) {
      alert("비밀번호는 4자리 이상, 12자리 미만입니다.");
      return;
    }
    dispatch(userAction.logInDB(username, password));
  };

  return (
    <div>
      <div>인사말</div>
      <div>
        <input
          placeholder="아이디(이메일)"
          ref={usernameRef}
          onChange={(e) => {
            emailFormCheck(e);
          }}
        ></input>
        <input placeholder="비밀번호" type="password" ref={passwordRef}></input>
        {disabled ? (
          <button disabled={true}>로그인</button>
        ) : (
          <button onClick={loginBtnClick}>로그인</button>
        )}
      </div>
      <div>
        <div>
          <GoogleBtn></GoogleBtn>
          <KakaoBtn></KakaoBtn>
        </div>
        <span>
          아직 회원이 아니세요?{" "}
          <h5
            onClick={() => {
              history.push("/emailcheck");
            }}
          >
            회원가입
          </h5>
        </span>
      </div>
    </div>
  );
};

export default Login;
