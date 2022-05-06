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
    <div>
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
          ></input>
        </div>
        {emailCheck === false ? <span>중복된 이메일이 존재합니다.</span> : null}
      </Inputdiv>
      <CheckBtndiv>
        {regExpMatch ? (
          <>
            {emailCheck ? (
              <button
                onClick={checkEmailClick}
                style={{ backgroundColor: "#cacaca" }}
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
    </div>
  );
};
const CheckBtndiv = styled.div`
  display: flex;
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

const Inputdiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  div {
    display: flex;
    flex-direction: column;
    width: 80%;
    font-size: 20px;
    input {
      font-size: 16px;
      height: 40px;
      margin-bottom: 20px;
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
  }
`;

const Headerdiv = styled.div`
  text-align: center;
  padding: 15px 0px;
  margin-top: 15px;
`;

export default Emailcheck;
