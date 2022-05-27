import React from "react";
import styled from "styled-components";
import Error from "../static/images/error.png";

const NotFoundSearchList = () => {
  return (
    <Msg>
      <div>
        <Img src={Error} alt="error"></Img>
        <p>앗, 관련 계획표가 없어요.</p>
        <p>다른 검색어를 입력해주세요.</p>
      </div>
    </Msg>
  );
};

export default NotFoundSearchList;

const Msg = styled.div`
  font-size: 18px;
  text-align: center;
  div {
    margin-top: 40%;
  }
`;

const Img = styled.img`
  margin-bottom: 20px;
  margin-top: 20px;
  width: 160px;
  height: 100%;
`;
