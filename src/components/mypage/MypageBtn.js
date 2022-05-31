import React from "react";
import styled from "styled-components";
import goRight from "../../static/images/icon/goRight.png";

const MypageBtn = ({ content, onClick, textcolor = "black", btn = "show" }) => {
  return (
    <Container onClick={onClick}>
      <Span textcolor={textcolor}>{content}</Span>
      <Img src={goRight} alt="go" btn={btn} />
    </Container>
  );
};
const Img = styled.img`
  width: 28px;
  display: ${(props) => (props.btn === "hide" ? "none" : null)};
`;

const Span = styled.span`
  color: ${(props) => (props.textcolor === "red" ? "red" : "black")};
  font-size: 16px;
`;

const Container = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  height: 55px;
  cursor: pointer;
`;

export default MypageBtn;
