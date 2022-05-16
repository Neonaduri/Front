import React from "react";
import styled from "styled-components";
import Titleline from "../elements/Titleline";
import imgLogin from "../../static/images/icon/nopostCharacter.png";
import { useHistory } from "react-router";
import Footer from "../common/Footer";
import Button from "../elements/Button";
import pencil from "../../static/images/icon/whitePencil.png";

const NopostAlert = () => {
  const history = useHistory();

  return (
    <Container>
      <NopostContainer>
        <TitleDiv>
          <Titleline title={"계획"} />
        </TitleDiv>
        <ContentDiv>
          <span>등록된 계획표가 없습니다!</span>
          <img src={imgLogin} />
          <ButtonDiv>
            <img src={pencil} />
            <Button
              content={"계획하러 가기!"}
              onClick={() => {
                history.push("/planning");
              }}
            ></Button>
          </ButtonDiv>
        </ContentDiv>
      </NopostContainer>
      <Footer />
    </Container>
  );
};

const ContentDiv = styled.div`
  margin-bottom: 40%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 60%;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  span {
    font-size: 18px;
  }
`;

const Container = styled.div`
  height: 90%;
`;

const NopostContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ButtonDiv = styled.div`
  position: relative;
  width: 80%;
  img {
    width: 15px;
    height: 15px;
    color: white;
    position: absolute;
    bottom: -17px;
    left: 75px;
  }
`;

const TitleDiv = styled.div``;

export default NopostAlert;
