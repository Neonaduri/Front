import React from "react";
import styled from "styled-components";
import goRight from "../../static/images/icon/goRight.png";

const MypageBtn = ({ content, onClick }) => {
  return (
    <Container onClick={onClick}>
      <span>{content}</span>
      <img src={goRight} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  cursor: pointer;
  span {
    font-size: 16px;
  }
`;

export default MypageBtn;
