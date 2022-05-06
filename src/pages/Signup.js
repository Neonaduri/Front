import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { userAction } from "../redux/module/user";
import closeeye from "../static/images/eye.png";
import openeye from "../static/images/openeye.png";

const Signup = (props) => {
  const dispatch = useDispatch();
  const username = props.email;
  const nicknameRef = useRef();
  const passRef = useRef();
  const passCheckRef = useRef();
  const [visuable, setVisuable] = useState(false);
  const [visuable2, setVisuable2] = useState(false);

  const signupBtnClick = () => {
    const nickName = nicknameRef.current.value;
    const password = passRef.current.value;
    const passwordCheck = passCheckRef.current.value;
    if (nickName.length < 3 || nickName.length > 11) {
      alert("닉네임은 3자리 이상, 12자리 미만입니다.");
      return;
    }
    if (password.length < 4 || password.length > 11) {
      alert("비밀번호는 4자리 이상, 12자리 미만입니다.");
      return;
    }
    if (password !== passwordCheck) {
      alert("비밀번호를 다시 확인해주세요.");
      return;
    }
    dispatch(userAction.signUpDB(username, nickName, password, passwordCheck));
  };
  return (
    <div>
      <Inputbox>
        <label htmlFor="nick">닉네임을 입력해주세요.</label>
        <input placeholder="닉네임" id="nick" ref={nicknameRef}></input>
        <label htmlFor="password">비밀번호를 입력해주세요.</label>
        <input
          type={visuable ? "text" : "password"}
          placeholder="4자리 이상 12자리 미만"
          id="password"
          ref={passRef}
        ></input>
        {visuable ? (
          <PassEyeImg
            src={openeye}
            onClick={() => {
              setVisuable(false);
            }}
          />
        ) : (
          <PassEyeImg
            src={closeeye}
            onClick={() => {
              setVisuable(true);
            }}
          />
        )}
        <label htmlFor="passCheck">비밀번호를 다시 입력해주세요.</label>
        <input
          type={visuable2 ? "text" : "password"}
          placeholder="비밀번호 재입력"
          id="passCheck"
          ref={passCheckRef}
        ></input>
        {visuable2 ? (
          <PassEyeImg2
            src={openeye}
            onClick={() => {
              setVisuable2(false);
            }}
          />
        ) : (
          <PassEyeImg2
            src={closeeye}
            onClick={() => {
              setVisuable2(true);
            }}
          />
        )}
      </Inputbox>
      <Buttondiv>
        <button onClick={signupBtnClick}>회원가입</button>
      </Buttondiv>
    </div>
  );
};
const PassEyeImg2 = styled.img`
  width: 20px;
  position: absolute;
  right: 10px;
  bottom: 28px;
`;

const PassEyeImg = styled.img`
  width: 20px;
  position: absolute;
  right: 10px;
  bottom: 122px;
`;

const Inputbox = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: auto;
  margin-top: 20px;
  position: relative;
  label {
    font-size: 20px;
  }
  input {
    font-size: 16px;
    height: 40px;
    margin-bottom: 20px;
    border: none;
    border-bottom: 3px solid #eeeeee;
    margin-top: 10px;
    transition: 0.3s;
    &:focus {
      outline: none;
      border-bottom: 3px solid #62ce8b;
    }
  }
`;
const Buttondiv = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  margin: auto;
  button {
    width: 100%;
    height: 40px;
    font-size: 20px;
    background-color: #62ce8b;
    border: none;
    border-radius: 7px;
    margin-top: 10px;
    color: white;
    cursor: pointer;
  }
`;

export default Signup;
