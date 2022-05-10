import React, { useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";

const BeforePlan = () => {
  const history = useHistory();
  const nickNameRef = useRef();
  const passwordRef = useRef();
  const params = useParams();
  const postId = params.postId;

  const clickJoinPlanBtn = () => {
    const nickName = nickNameRef.current.value;
    const password = passwordRef.current.value;
    if (!nickName) {
      alert("닉네임을 입력해주세요");
      return;
    }
    if (!password) {
      alert("비밀번호를 입력해주세요");
      return;
    }
    sessionStorage.setItem("nickName", nickName);
    sessionStorage.setItem("password", password);
    history.replace(`/planning/${postId}`);
  };

  // if (
  //   sessionStorage.getItem("OVrole") ||
  //   localStorage.getItem("OVAccessToken")
  // ) {
  //   history.replace(`/planning/${postId}`);
  // }
  return (
    <Container>
      <Inputdiv>
        <label htmlFor="nickname">닉네임</label>
        <input
          id="nickname"
          type="text"
          placeholder="채팅방의 닉네임을 입력해주세요."
          ref={nickNameRef}
        ></input>
        <label htmlFor="pass">채팅방 비밀번호</label>
        <input
          placeholder="채팅방 비밀번호"
          id="pass"
          type="password"
          ref={passwordRef}
        ></input>
      </Inputdiv>
      <div>
        <button onClick={() => clickJoinPlanBtn()}>플랜채팅방 입장하기</button>
      </div>
    </Container>
  );
};
const Inputdiv = styled.div`
  display: flex;
  flex-direction: column;
  input {
    margin-bottom: 20px;
    width: 200px;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default BeforePlan;
