import React from "react";
import styled from "styled-components";
import Grid from "./Grid";

const Button = ({ content, onClick, width, height }) => {
  return (
    <Grid flex>
      <BannerBtn onClick={onClick} width={width} height={height}>
        {content}
      </BannerBtn>
    </Grid>
  );
};

export default Button;

const BannerBtn = styled.button`
  height: ${(props) => (props.height === "slim" ? "35px" : "45px")};
  background: ${({ theme }) => theme.colors.mainGreen};
  margin-top: 65px;
  border-radius: 5px;
  border: none;
  color: white;
  font-size: 18px;
  width: ${(props) => (props.width ? `${props.width}` : "100%")};
  cursor: pointer;
`;
