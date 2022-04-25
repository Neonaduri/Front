import React from "react";
import styled from "styled-components";

const Button = () => {
  return (
    <div>
      <BannerBtn>계획 보러가기</BannerBtn>
    </div>
  );
};

export default Button;

const BannerBtn = styled.button`
  width: 200px;
  height: 70px;
  margin-left: 1580px;
  margin-top: 60px;
  background: #c4c4c4;
  border-radius: 20px;
  border: none;
`;
