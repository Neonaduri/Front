import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { userAction } from "../redux/module/user";
import closeeye from "../static/images/icon/eye.png";
import openeye from "../static/images/icon/openeye.png";
import useInput from "../components/hooks/useInput";
import Button from "../components/elements/Button";

const Signup = (props) => {
  const dispatch = useDispatch();
  const username = props.email;
  const emailCheck = props.emailCheck;
  const [password, setPassword] = useState("");
  const [passCheck, setPassCheck] = useState("");
  const [visuable, setVisuable] = useState(false);
  const [visuable2, setVisuable2] = useState(false);
  const [passChange, setPassChange] = useState(undefined);
  const [pass, setPass] = useState();
  const [permit, setPermit] = useState(undefined);
  const nickName = useInput();

  const signupBtnClick = () => {
    if (nickName.value.length < 3 || nickName.value.length > 11) {
      alert("닉네임은 3자리 이상, 12자리 미만입니다.");
      return;
    }
    if (password.length < 4 || password.length > 11) {
      alert("비밀번호는 4자리 이상, 12자리 미만입니다.");
      return;
    }
    if (password !== passCheck) {
      alert("비밀번호를 다시 확인해주세요.");
      return;
    }
    dispatch(
      userAction.signUpDB(username, nickName.value, password, passCheck)
    );
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length > 3 && e.target.value.length < 13) {
      setPassChange(true);
    } else if (e.target.value.length === 0) {
      setPassChange(undefined);
    } else {
      setPassChange(false);
    }
  };
  const onChangeReCheck = (e) => {
    setPassCheck(e.target.value);
    if (password === e.target.value) {
      setPermit(true);
    } else if (e.target.value.length === 0) {
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
          disabled={!emailCheck}
          {...nickName}
        ></input>
        <label htmlFor="password">비밀번호를 입력해주세요.</label>
        <input
          type={visuable ? "text" : "password"}
          placeholder="4자리 이상 12자리 미만"
          value={password}
          onChange={onChangePassword}
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
            alt="show"
            src={openeye}
            onClick={() => {
              setVisuable(false);
            }}
          />
        ) : (
          <PassEyeImg
            alt="show"
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
          value={passCheck}
          onChange={onChangeReCheck}
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
            alt="show"
            src={openeye}
            onClick={() => {
              setVisuable2(false);
            }}
          />
        ) : (
          <PassEyeImg2
            alt="show"
            src={closeeye}
            onClick={() => {
              setVisuable2(true);
            }}
          />
        )}
      </Inputbox>
      <Buttondiv>
        <Button onClick={signupBtnClick} content={"회원가입"} />
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
  width: 90%;
  margin: auto;
`;

export default Signup;
