import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { userAction } from "../redux/module/user";
import Modal from "../components/common/Modal";
import { useSelector } from "react-redux";
import Signup from "./Signup";

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
      <div>
        <span></span>
        <span>회원가입</span>
      </div>
      <div>
        <label htmlFor="email">사용하실 이메일을 입력해주세요.</label>
        <input
          id="email"
          placeholder="아이디(이메일)"
          ref={emailRef}
          onChange={(e) => emailFormCheck(e)}
        ></input>
        {emailCheck === false ? <span>중복된 이메일이 존재합니다.</span> : null}
      </div>
      <div>
        {regExpMatch ? (
          <button onClick={checkEmailClick}>중복확인</button>
        ) : null}
      </div>
      <Modal
        open={modalOpen}
        close={closeModal}
        header="사용 가능한 아이디입니다."
      ></Modal>
      {emailCheck ? <Signup email={emailRef.current.value}></Signup> : null}
    </div>
  );
};

export default Emailcheck;
