import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import Footer from "../components/common/Footer";
import Titleline from "../components/elements/Titleline";
import Password from "../components/mypage/Password";
import { changePwdDB } from "../redux/module/user";
import back from "../static/images/icon/back.png";

const PasswordChange = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [pwd, setPwd] = useState({
    password: "",
    newPassword: "",
    checkPwd: "",
  });

  const onClick = () => {
    if (pwd.newPassword !== pwd.checkPwd) {
      alert("비밀번호가 일치하지않습니다!");
    } else {
      dispatch(changePwdDB(pwd.password, pwd.newPassword));
    }
  };

  console.log(pwd);

  return (
    <Total>
      <div>
        <Titleline
          title="비밀번호 변경"
          onClick={() => {
            history.goBack();
          }}
        />
      </div>

      <Content>
        <Password
          pwd={pwd}
          setPwd={setPwd}
          name="password"
          title="현재 비밀번호"
        />
        <Password
          pwd={pwd}
          setPwd={setPwd}
          name="newPassword"
          title="새로운 비밀번호"
        />
        <Password
          pwd={pwd}
          setPwd={setPwd}
          name="checkPwd"
          title="비밀번호 확인"
        />
        <Button onClick={onClick}>변경완료</Button>
      </Content>
      <Footer />
    </Total>
  );
};

export default PasswordChange;

const Button = styled.button`
  width: 335px;
  height: 39px;
  margin-left: 20px;
  margin-top: 20px;
  background-color: #56be91;
  border: 0;
  color: white;
  opacity: 0.5;
  border-radius: 5px;
`;

const Total = styled.div``;

const Content = styled.div`
  margin: 0 auto;
  padding: 10px;
`;
