import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { userAction } from "../redux/module/user";
import Modal from "../components/common/Modal";
import { useSelector } from "react-redux";
import Signup from "./Signup";
import styled from "styled-components";
import Button from "../components/elements/Button";
import back from "../static/images/icon/back.png";

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
      <BackBtndiv>
        <img
          src={back}
          onClick={() => {
            dispatch(userAction.emailCheck(null));
            history.push("/login");
          }}
        />
      </BackBtndiv>
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
          <span style={{ color: "#41B67E", fontSize: "14px" }}>
            사용 가능한 이메일입니다.
          </span>
        ) : null}
      </Inputdiv>
      <CheckBtndiv>
        {regExpMatch ? (
          <>
            {emailCheck ? (
              <Button onClick={checkEmailClick} content={"중복체크 완료"} />
            ) : (
              <Button onClick={checkEmailClick} content={"중복확인"} />
            )}
          </>
        ) : null}
      </CheckBtndiv>
      <Modal
        open={modalOpen}
        close={closeModal}
        header="사용 가능한 이메일입니다."
      ></Modal>
      <Signup email={emailRef.current?.value} emailCheck={emailCheck}></Signup>
    </Container>
  );
};

const BackBtndiv = styled.div`
  position: absolute;
  padding: 0px 10px;
  img {
    width: 30px;
    position: absolute;
    top: 12px;
    cursor: pointer;
  }
`;
const Container = styled.div`
  position: relative;
`;

const CheckBtndiv = styled.div`
  width: 80%;
  margin: auto;
  button {
    width: 25%;
    height: 30px;
    font-size: 14px;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.colors.mainGreen};
    border-radius: 7px;
    margin-top: 10px;
    color: ${({ theme }) => theme.colors.mainGreen};
    position: absolute;
    right: 20px;
    top: 133px;
    font-family: "apple1";
  }
`;

const Inputdiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
  margin-top: 30px;
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
      border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
      margin-top: 7px;
      transition: 0.3s;
      margin-bottom: 10px;
      &:focus {
        outline: none;
        border-bottom: 1px solid ${({ theme }) => theme.colors.mainGreen};
      }
    }
  }
  span {
    color: red;
    text-align: start;
    margin-bottom: 5px;
  }
`;

const Headerdiv = styled.div`
  text-align: center;
  padding: 15px 0px;
  margin-top: 15px;
`;

export default Emailcheck;
