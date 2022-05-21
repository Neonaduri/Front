import React from "react";
import styled from "styled-components";

import profile from "../../static/images/icon/default.png";
import kakaoLink from "../../static/images/kakaoLink.png";
import smile from "../../static/images/icon/smile.png";
import lotte from "../../static/images/lotte.png";
import baemin from "../../static/images/baemin.png";
import coffee from "../../static/images/coffee.png";

const Background = () => {
  return (
    <WrapContainer>
      <ContainerTop>
        <Img src={profile}></Img>
        <Text>너나들이에서 준비한 이벤트!</Text>

        <Container>
          <div>참여기간</div>
          <span>2022.05.21(토) ~ 2022.06.04(토)</span>
        </Container>
      </ContainerTop>

      <Event>
        <h3>🎉 이벤트 참여방법 🎉</h3>
        <BoxContainer>
          <Box>
            <div>Step.1</div>
            <LinkImg src={kakaoLink}></LinkImg>
            <p>친구들에게 계획링크를 </p>
            <p> 카카오톡으로 공유하고</p>
            <p> 캡쳐해주세요!</p>
          </Box>

          <Box>
            <div>Step.2</div>
            <SmileImg src={smile}></SmileImg>
            <p>친구들과 함께 </p>
            <p> 실시간으로 여행 계획을 작성한 후!</p>
          </Box>

          <Box>
            <div>Step.3</div>
            <p>구글 폼을 제출해주시면 </p>
            <p> 추첨을 통해</p>
            <p>다양한 상품을 드립니다!</p>
            <button>구글폼 바로가기</button>
          </Box>
        </BoxContainer>
      </Event>

      {/* 상품 */}
      <EventProduct>
        <h3>🎉 힐링 선물 받아가자! 🎉</h3>
        <BoxProductContainer>
          <BoxProduct>
            <LotteImg src={lotte}></LotteImg>
            <p>롯데월드 2인</p>
            <p>8만원 상당 상품권 (1명)</p>
          </BoxProduct>

          <BoxProduct>
            <BaeminImg src={baemin}></BaeminImg>
            <p>배달의민족 3만원</p>
            <p> 상품권 (2명)</p>
          </BoxProduct>

          <BoxProduct>
            <CoffeeImg src={coffee}></CoffeeImg>
            <p>스타벅스 아이스아메리카노</p>
            <p>기프티콘 (10명)</p>
          </BoxProduct>
        </BoxProductContainer>
      </EventProduct>
    </WrapContainer>
  );
};

export default Background;

const WrapContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
`;

const ContainerTop = styled.div`
  display: flex;
  align-items: center;
  width: 480px;
`;

const LotteImg = styled.img`
  width: 156px;
  height: 98px;
`;

const BoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoxProductContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  width: 225px;
  height: 170px;
  text-align: center;
  box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 15px 25px;
  div {
    font-weight: 900;
    font-size: 18px;
    color: #56be91;
    margin-bottom: 10px;
  }

  p {
    font-weight: 500;
    font-size: 13px;
    text-align: center;
    color: #363636;
  }

  button {
    width: 180px;
    height: 48px;
    background: #56be91;
    border-radius: 10px;
    border: 0;
    color: white;
    margin-top: 15px;
  }
`;

const BoxProduct = styled.div`
  margin: 20px;
  width: 225px;
  height: 170px;
  text-align: center;
  background: #ffffff;
  box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 15px 25px;

  div {
    font-weight: 900;
    font-size: 18px;
    color: #56be91;
  }

  p {
    font-weight: 500;
    font-size: 13px;
    text-align: center;
    justify-content: center;
    color: #363636;
  }

  button {
    width: 180px;
    height: 48px;
    background: #56be91;
    border-radius: 10px;
    border: 0;
    color: white;
    margin-top: 25px;
  }
`;

const Event = styled.div`
  display: flex;
  align-items: center;

  h3 {
    font-weight: 700;
    font-size: 17px;
    color: #363636;
    width: 300px;
  }
`;

const EventProduct = styled.div`
  display: flex;
  align-items: center;
  h3 {
    font-weight: 700;
    font-size: 17px;
    color: #363636;
    width: 300px;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 480px;
  div {
    font-weight: 800;
    font-size: 20px;
    line-height: 26px;
    color: #56be91;
  }

  span {
    font-weight: 600;
    font-size: 17px;
    margin-left: 10px;
    line-height: 26px;
    color: #363636;
  }
`;

const Img = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 15px;
`;

const Text = styled.div`
  font-family: "Apple SD Gothic Neo";
  font-style: normal;
  font-weight: 800;
  font-size: 25px;
  line-height: 38px;
  color: #00c871;
`;

const LinkImg = styled.img`
  width: 123px;
  height: 48px;
  margin-bottom: 10px;
`;

const SmileImg = styled.img`
  width: 110px;
  height: 63.68px;
  margin-bottom: 10px;
`;

const BaeminImg = styled.img`
  width: 83px;
  height: 83px;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
`;

const CoffeeImg = styled.img`
  width: 71.24px;
  height: 97px;
`;
