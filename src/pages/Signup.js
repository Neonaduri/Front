import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { userAction } from "../redux/module/user";
import closeeye from "../static/images/icon/eye.png";
import openeye from "../static/images/icon/openeye.png";

const Signup = (props) => {
  const dispatch = useDispatch();
  const username = props.email;
  const emailCheck = props.emailCheck;
  const nicknameRef = useRef();
  const passRef = useRef();
  const passCheckRef = useRef();
  const [visuable, setVisuable] = useState(false);
  const [visuable2, setVisuable2] = useState(false);
  const [passChange, setPassChange] = useState(undefined);
  const [pass, setPass] = useState();
  const [permit, setPermit] = useState(undefined);
  console.log(emailCheck);

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

  const onChangePassword = (e) => {
    const value = e.target.value;
    setPass(value);
    if (value.length > 3 && value.length < 13) {
      setPassChange(true);
    } else if (value.length === 0) {
      setPassChange(undefined);
    } else {
      setPassChange(false);
    }
  };
  const onChangeReCheck = (e) => {
    const value = e.target.value;
    if (pass === value) {
      setPermit(true);
    } else if (value.length === 0) {
      setPermit(undefined);
    } else {
      setPermit(false);
    }
  };

  return (
    <div>
      <Inputbox>
        <label htmlFor="nick">닉네임을 입력해주세요.</label>
        <input
          placeholder="닉네임"
          id="nick"
          ref={nicknameRef}
          disabled={!emailCheck}
        ></input>
        <label htmlFor="password">비밀번호를 입력해주세요.</label>
        <input
          type={visuable ? "text" : "password"}
          placeholder="4자리 이상 12자리 미만"
          id="password"
          ref={passRef}
          onChange={(e) => onChangePassword(e)}
          disabled={!emailCheck}
        ></input>
        {passChange === false ? (
          <span style={{ marginTop: "-18px", color: "red", fontSize: "14px" }}>
            사용할 수 없는 비밀번호입니다.
          </span>
        ) : null}
        {passChange === true ? (
          <span
            style={{ marginTop: "-18px", color: "#41B67E", fontSize: "14px" }}
          >
            사용할 수 있는 비밀번호입니다.
          </span>
        ) : null}

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
          onChange={(e) => onChangeReCheck(e)}
          disabled={!emailCheck}
        ></input>
        {permit === true ? (
          <span
            style={{ marginTop: "-18px", color: "#41B67E", fontSize: "14px" }}
          >
            비밀번호가 확인되었습니다.
          </span>
        ) : null}
        {permit === false ? (
          <span style={{ marginTop: "-18px", color: "red", fontSize: "14px" }}>
            비밀번호가 일치하지 않습니다.
          </span>
        ) : null}
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
  bottom: 27px;
`;

const PassEyeImg = styled.img`
  width: 20px;
  position: absolute;
  right: 10px;
  bottom: 124px;
`;

const Inputbox = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: auto;
  margin-top: 20px;
  position: relative;
  input {
    font-size: 16px;
    height: 40px;
    margin-bottom: 20px;
    margin-top: 5px;
    border: none;
    border-bottom: 3px solid #eeeeee;
    transition: 0.3s;
    &:focus {
      outline: none;
      border-bottom: 3px solid #41b67e;
    }
  }
  label {
    font-size: 16px;
    margin-top: 10px;
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
    background-color: #41b67e;
    border: none;
    border-radius: 7px;
    margin-top: 10px;
    color: white;
    cursor: pointer;
  }
`;

export default Signup;
