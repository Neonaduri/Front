import React from "react";
import styled from "styled-components";
import Error from "../static/images/error.png";

const NotFound = () => {
  return (
    <Msg>
      <div>
        <Img src={Error}></Img>

        <p>앗, 관련 계획표가 없어요.</p>
        <p>다른 검색어를 입력해주세요.</p>
      </div>
    </Msg>
  );
};

export default NotFound;

const Msg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Apple SD Gothic Neo";
  font-style: normal;
  font-weight: 350;
  font-size: 18px;
  text-align: center;
  color: #363636;
`;

const Img = styled.img`
  margin-bottom: 20px;
  margin-top: 20px;
  width: 160px;
  height: 100%;
`;
