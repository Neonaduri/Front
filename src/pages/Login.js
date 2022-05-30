import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useInput from "../components/hooks/useInput";
import GoogleBtn from "../components/login/GoogleBtn";
import KakaoBtn from "../components/login/KakaoBtn";
import { userAction } from "../redux/module/user";
import Splash from "../shared/Splash";
import loginBGimg from "../static/images/bgImage/loginbackground.webp";
import Button from "../components/elements/Button";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const emailRegExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const [splash, setSplash] = useState(true);
  const username = useInput();
  const password = useInput();

  const loginBtnClick = () => {
    if (password.value.length < 4 || password.value.length > 11) {
      alert("비밀번호는 4자리 이상, 12자리 미만입니다.");
      return;
    }
    dispatch(userAction.logInDB(username.value, password.value));
  };

  if (localStorage.getItem("token")) {
    history.push("/");
  }
  useEffect(() => {
    let timer = setTimeout(() => {
      setSplash(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  console.log(history);

  return (
    <div>
      <Logodiv>
        <img src={loginBGimg} alt="BGimg"></img>
      </Logodiv>
      <Inputdiv>
        <span>떠나볼 준비를 해볼까요?</span>
        <input placeholder="너나들이 계정 (이메일)" {...username}></input>
        <input placeholder="비밀번호" type="password" {...password}></input>
        <Button
          content={"로그인"}
          onClick={loginBtnClick}
          width={"300px"}
          height={"slim"}
        />
      </Inputdiv>
      <Bottomdiv>
        <span>간편 로그인</span>
        <Socialdiv>
          <div>
            <GoogleBtn></GoogleBtn>
          </div>
          <div>
            <KakaoBtn></KakaoBtn>
          </div>
        </Socialdiv>
        <ToSignupDiv>
          <h4>아직 회원이 아니신가요?</h4>
          <span
            onClick={() => {
              history.push("/emailcheck");
            }}
          >
            회원가입
          </span>
        </ToSignupDiv>
      </Bottomdiv>
      {splash ? <Splash /> : null}
    </div>
  );
};

const ToSignupDiv = styled.div`
  margin-top: 10px;
`;

const Logodiv = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 30px;
  img {
    width: 100%;
  }
`;
const Socialdiv = styled.div`
  display: flex;
  width: 40%;
  align-items: center;
  justify-content: space-around;
  padding-top: 40px;
  div {
    &:first-child {
      padding-bottom: 9px;
    }
  }
`;

const Bottomdiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 2px solid ${({ theme }) => theme.colors.borderColor};
  width: 80%;
  margin: auto;
  margin-top: 40px;
  position: relative;
  span {
    &:first-child {
      position: absolute;
      background-color: white;
      top: -15px;
      padding: 3px 10px;
      color: ${({ theme }) => theme.colors.text3};
      font-weight: 700;
    }
  }
  div {
    display: flex;
    h4 {
      font-weight: 400;
    }
    span {
      font-weight: 700;
      margin-left: 5px;
      cursor: pointer;
    }
  }
`;

const Inputdiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -20px;
  span {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 700;
  }
  input {
    width: 80%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
    border: none;
    border-bottom: 3px solid ${({ theme }) => theme.colors.borderColor};
    transition: 0.3s;
    &:focus {
      outline: none;
      border-bottom: 3px solid ${({ theme }) => theme.colors.mainGreen};
    }
  }
`;

export default Login;
