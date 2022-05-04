import React from "react";
import styled from "styled-components";
import Grid from "./Grid";

const Button = () => {
  return (
    <Grid flex>
      <BannerBtn>계획 보러가기</BannerBtn>
    </Grid>
  );
};

export default Button;

const BannerBtn = styled.button`
  width: 200px;
  height: 70px;
  background: #c4c4c4;
  border-radius: 20px;
  margin: 50px 0;
  border: none;
`;
