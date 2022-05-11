import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { userAction } from "../redux/module/user";
import Modal from "../components/common/Modal";
import { useSelector } from "react-redux";
import Signup from "./Signup";
import { FaAngleLeft } from "react-icons/fa";
import styled from "styled-components";

const Emailcheck = ({ history }) => {
  const dispatch = useDispatch();
  const emailRegExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const [modalOpen, setModalOpen] = useState(false);
  const [regExpMatch, setRegExpMatch] = useState(false);
  const emailRef = useRef();
  const emailCheck = useSelector((state) => state.user.emailCheck);
  const emailFormCheck = (e) => {
    const inputEmail = e.target.value;
    if (inputEmail.match(emailRegExp) === null) {
      setRegExpMatch(false);
    } else {
      setRegExpMatch(true);
    }
  };

  const checkEmailClick = () => {
    const email = emailRef.current.value;
    dispatch(userAction.emailCheckDB(email));
  };
  React.useEffect(() => {
    if (emailCheck === true) {
      setModalOpen(true);
    } else {
      return;
    }
  }, [emailCheck]);

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <Container>
      <div
        style={{
          position: "absolute",
          fontSize: "30px",
          top: "25px",
          left: "5px",
        }}
      >
        <FaAngleLeft
          onClick={() => {
            dispatch(userAction.emailCheck(null));
            history.push("/login");
          }}
        />
      </div>
      <Headerdiv>
        <span>회원가입</span>
      </Headerdiv>
      <Inputdiv>
        <div>
          <label htmlFor="email">이메일을 입력해주세요.</label>
          <input
            id="email"
            placeholder="아이디(이메일)"
            ref={emailRef}
            onChange={(e) => emailFormCheck(e)}
            disabled={emailCheck ? true : false}
          ></input>
        </div>
        {emailCheck === false ? <span>중복된 이메일이 존재합니다.</span> : null}
        {emailCheck === true ? (
          <span style={{ color: "#62ce8b", fontSize: "14px" }}>
            사용 가능한 이메일입니다.
          </span>
        ) : null}
      </Inputdiv>
      <CheckBtndiv>
        {regExpMatch ? (
          <>
            {emailCheck ? (
              <button
                onClick={checkEmailClick}
                style={{
                  backgroundColor: "#62ce8b",
                  color: "white",
                }}
              >
                중복체크 완료
              </button>
            ) : (
              <button onClick={checkEmailClick}>중복확인</button>
            )}
          </>
        ) : null}
      </CheckBtndiv>
      <Modal
        open={modalOpen}
        close={closeModal}
        header="사용 가능한 이메일입니다."
      ></Modal>
      {emailCheck ? <Signup email={emailRef.current?.value}></Signup> : null}
    </Container>
  );
};
const Container = styled.div`
  position: relative;
`;

const CheckBtndiv = styled.div`
  width: 80%;
  margin: auto;
  button {
    width: 25%;
    height: 30px;
    font-size: 16px;
    background-color: white;
    border: 2px solid #62ce8b;
    border-radius: 7px;
    margin-top: 10px;
    color: #62ce8b;
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 133px;
  }
`;

const Inputdiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
  margin-top: 50px;
  div {
    display: flex;
    flex-direction: column;
    width: 90%;
    font-size: 16px;
    input {
      width: 74%;
      font-size: 16px;
      height: 40px;

      border: none;
      border-bottom: 3px solid #eeeeee;
      margin-top: 15px;
      transition: 0.3s;
      &:focus {
        outline: none;
        border-bottom: 3px solid #62ce8b;
      }
    }
  }
  span {
    color: red;
    text-align: start;
  }
`;

const Headerdiv = styled.div`
  text-align: center;
  padding: 15px 0px;
  margin-top: 15px;
`;

export default Emailcheck;
