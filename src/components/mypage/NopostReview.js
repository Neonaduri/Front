import React from "react";
import styled from "styled-components";
import Footer from "../common/Footer";
import Titleline from "../elements/Titleline";
import imgLogin from "../../static/images/icon/loginCharacter.png";
import back from "../../static/images/icon/back.png";
import { useHistory } from "react-router";

const NopostReview = () => {
  const history = useHistory();
  return (
    <Container>
      <HeaderDiv>
        <img
          alt="back"
          src={back}
          onClick={() => {
            history.goBack();
          }}
        />
        <Titleline title={"내 댓글 보기"} />
        <div></div>
      </HeaderDiv>
      <NoreviewDiv>
        <img src={imgLogin} alt="character" />
        <span>작성한 댓글이 없습니다</span>
      </NoreviewDiv>

      <FooterDiv>
        <Footer />
      </FooterDiv>
    </Container>
  );
};
const FooterDiv = styled.div`
  height: 8%;
`;

const NoreviewDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  img {
    width: 50%;
  }
  span {
    margin-top: 30px;
    font-size: 16px;
  }
`;
const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 15px;
  height: 8%;
  img {
    width: 22px;
    margin-top: 8px;
    cursor: pointer;
  }
  div {
    padding-left: 30px;
  }
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default NopostReview;
