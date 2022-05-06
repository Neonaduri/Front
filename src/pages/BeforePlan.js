import React, { useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import Openvidu from "../components/planning/Openvidu";

const BeforePlan = () => {
  const history = useHistory();
  const nickNameRef = useRef();
  const params = useParams();
  const postId = params.postId;
  const JWTtoken = localStorage.getItem("token");

  const clickJoinPlanBtn = () => {
    const nickName = nickNameRef.current.value;
    const role = "SUBSCRIBER";
    sessionStorage.setItem("OVnickName", nickName);
    sessionStorage.setItem("OVrole", role);
    history.replace(`/planning/${postId}`);
  };

  if (
    sessionStorage.getItem("OVrole") ||
    localStorage.getItem("OVAccessToken")
  ) {
    history.replace(`/planning/${postId}`);
  }
  return (
    <Container>
      <div>
        <label htmlFor="nickname">닉네임</label>
        <input
          id="nickname"
          type="text"
          placeholder="채팅방의 닉네임을 입력해주세요."
          ref={nickNameRef}
        ></input>
      </div>
      <div>
        <button onClick={() => clickJoinPlanBtn()}>플랜채팅방 입장하기</button>
      </div>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default BeforePlan;
