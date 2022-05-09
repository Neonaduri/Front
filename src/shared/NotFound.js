import React from "react";
import styled from "styled-components";

const NotFound = () => {
  return (
    <Msg>
      앗, 관련 계획표가 없어요.
      <br></br>
      다른 검색어를 입력해주세요.
    </Msg>
  );
};

export default NotFound;

const Msg = styled.span`
  font-family: "Apple SD Gothic Neo";
  font-style: normal;
  font-weight: 350;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  color: #363636;
  position: absolute;
  width: 201px;
  height: 50px;
  left: 87px;
  top: 279px;
`;
