import React, { useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import Openvidu from "../components/planning/Openvidu";

const BeforePlan = () => {
  const history = useHistory();
  const nickNameRef = useRef();
  const params = useParams();
  const postId = params.postId;
  const [nickName, setNickName] = useState();

  const clickJoinBtn = () => {
    sessionStorage.setItem("nickName", nickName);
    sessionStorage.setItem("roomId", postId);
    sessionStorage.setItem("role", "SUBSCRIBER");

    //비회원 데이터정보
    history.replace(`/planning/${postId}`);
  };

  const onChange = (e) => {
    setNickName(e.target.value);
    console.log(nickName);
  };

  return (
    <Container>
      <div>
        <label htmlFor="nickname">닉네임</label>
        <input
          id="nickname"
          type="text"
          placeholder="채팅방의 닉네임을 입력해주세요."
          ref={nickNameRef}
          onChange={onChange}
        ></input>
      </div>
      <div>
        <button onClick={clickJoinBtn}>플랜채팅방 입장하기</button>
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
