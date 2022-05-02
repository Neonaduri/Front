import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { userAction } from "../redux/module/user";

const Signup = (props) => {
  const dispatch = useDispatch();
  const username = props.email;
  const nicknameRef = useRef();
  const passRef = useRef();
  const passCheckRef = useRef();

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
        <input placeholder="비밀번호" id="password" ref={passRef}></input>
        <label htmlFor="passCheck">비밀번호를 다시 입력해주세요.</label>
        <input
          placeholder="비밀번호 확인"
          id="passCheck"
          ref={passCheckRef}
        ></input>
      </Inputbox>
      <Buttondiv>
        <button onClick={signupBtnClick}>회원가입</button>
      </Buttondiv>
    </div>
  );
};
const Inputbox = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: auto;
`;
const Buttondiv = styled.div`
  display: flex;
  justify-content: center;
`;

export default Signup;
