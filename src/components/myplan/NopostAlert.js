import React from "react";
import styled from "styled-components";
import imgLogin from "../../static/images/icon/nopostCharacter.webp";
import { useHistory } from "react-router";
import Footer from "../common/Footer";
import Button from "../elements/Button";
import pencil from "../../static/images/icon/whitePencil.png";

const NopostAlert = ({
  firstContent,
  secondContent,
  btnContent,
  pushUrl,
  titleContent,
}) => {
  const history = useHistory();

  return (
    <Container>
      <NopostContainer>
        <ContentDiv>
          <MainTextdiv>
            <span>{firstContent}</span>
            <span>{secondContent}</span>
          </MainTextdiv>
          <Img src={imgLogin} alt="character" />
          <ButtonDiv>
            <img src={pencil} alt="img" />
            <Button
              content={btnContent}
              onClick={() => {
                history.push(pushUrl);
              }}
            ></Button>
          </ButtonDiv>
        </ContentDiv>
      </NopostContainer>
      <Footer />
    </Container>
  );
};

const MainTextdiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentDiv = styled.div`
  /* margin-bottom: 60%; */
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
  justify-content: center;
  padding-bottom: 100px;
`;

const Img = styled.img`
  width: 217.18px;
  height: 178px;
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

const TitleDiv = styled.div`
  margin-bottom: 20px;
`;

export default NopostAlert;
