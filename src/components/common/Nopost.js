import React from "react";
import styled from "styled-components";
import Footer from "../common/Footer";
import Titleline from "../elements/Titleline";
import imgLogin from "../../static/images/icon/loginCharacter.png";
import back from "../../static/images/icon/back.png";
import { useHistory } from "react-router";
import Button from "../elements/Button";

const Nopost = ({ title, content, btnhide = false }) => {
  const history = useHistory();
  return (
    <Container>
      <div>
        <Titleline
          title={title}
          onClick={() => {
            history.goBack();
          }}
        />
      </div>
      <NoreviewDiv>
        <img src={imgLogin} alt="character" />
        <span>{content}</span>
        {btnhide ? null : (
          <Button
            content="뒤로가기"
            width="150px"
            onClick={() => {
              history.goBack();
            }}
            height="slim"
          ></Button>
        )}
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
    font-size: 19px;
    margin-bottom: 20px;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default Nopost;