import React from "react";
import styled from "styled-components";
import goRight from "../../static/images/icon/goRight.png";

const MypageBtn = ({ content, onClick, textcolor }) => {
  return (
    <Container onClick={onClick}>
      <span color={textcolor}>{content}</span>
      <img src={goRight} alt="go" />
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  cursor: pointer;
  span {
    font-size: 16px;
  }
  img {
    width: 28px;
  }
`;

export default MypageBtn;
