import React from "react";
import styled from "styled-components";
import love from "../../static/images/icon/love.png";
import Union from "../../static/images/icon/Union.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ButtonArea from "../main/ButtonArea.js";

const Location = () => {
  const settings = {
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    fade: false,
    infinite: true,
    pauseOnFocus: true,
    pauseOnHover: true,
    speed: 400,
  };
  return (
    <>
      <Div>
        <Name>
          <Title>지역별 여행 계획표</Title>
          <Plus>더보기</Plus>
        </Name>
        <ButtonArea />
        <div style={{ display: "flex", position: "relative" }}>
          <StyledSlide {...settings}>
            <Wrap>
              <ImagePop src="https://img2.yna.co.kr/etc/inner/KR/2019/08/23/AKR20190823144700051_01_i_P2.jpg" />
              <div>
                <Content>방콕에서의 하루</Content>
                <SectionBox>
                  <Like>
                    <img src={love} />
                    <Cnt>2,431</Cnt>
                  </Like>

                  <Like>
                    <img src={Union} />
                    <Cnt>25</Cnt>
                  </Like>
                </SectionBox>
              </div>
            </Wrap>

            <Wrap>
              <ImagePop src="https://img2.yna.co.kr/etc/inner/KR/2019/08/23/AKR20190823144700051_01_i_P2.jpg" />
              <div>
                <Content>방콕에서의 하루</Content>
                <SectionBox>
                  <Like>
                    <img src={love} />
                    <Cnt>2,431</Cnt>
                  </Like>

                  <Like>
                    <img src={Union} />
                    <Cnt>25</Cnt>
                  </Like>
                </SectionBox>
              </div>
            </Wrap>

            <Wrap>
              <ImagePop src="https://static.hubzum.zumst.com/hubzum/2017/12/21/14/13677e28ebe54fe38305efeca285a19f_780x0c.jpg" />

              <Form>
                <Content>남친과 제주도 1박2일</Content>
                <SectionBox>
                  <Like>
                    <img src={love} />
                    <Cnt>2,431</Cnt>
                  </Like>

                  <Like>
                    <img src={Union} />
                    <Cnt>25</Cnt>
                  </Like>
                </SectionBox>
              </Form>
            </Wrap>

            <Wrap>
              <ImagePop src="https://t1.daumcdn.net/cfile/blog/995C684D5A6FCD231A" />

              <Form>
                <Content>남친과 제주도 1박2일</Content>
                <SectionBox>
                  <Like>
                    <img src={love} />
                    <Cnt>2,431</Cnt>
                  </Like>

                  <Like>
                    <img src={Union} />
                    <Cnt>25</Cnt>
                  </Like>
                </SectionBox>
              </Form>
            </Wrap>

            <Wrap>
              <ImagePop src="https://t1.daumcdn.net/cfile/blog/995C684D5A6FCD231A" />

              <Form>
                <Content>남친과 제주도 1박2일</Content>
                <SectionBox>
                  <Like>
                    <img src={love} />
                    <Cnt>2,431</Cnt>
                  </Like>

                  <Like>
                    <img src={Union} />
                    <Cnt>25</Cnt>
                  </Like>
                </SectionBox>
              </Form>
            </Wrap>
          </StyledSlide>
        </div>
      </Div>
    </>
  );
};

export default Location;

const StyledSlide = styled(Slider)`
  position: relative;
  margin-top: 30px;
  width: 100%;

  .slick-list {
    position: absolute;
    width: 330px;
    height: 370px;
    margin: 10px 25px;
    top: -30px;
  }

  .slick-slider {
    display: flex;
  }

  .slick-track {
    display: flex;
    height: 100%;
  }

  .slick-dots {
    display: none !important;
  }

  .slick-arrow {
    transform: translate(30px, 150px);
    cursor: pointer;
  }
`;

const ImagePop = styled.img`
  /* filter: drop-shadow(1px 2px 10px rgba(0, 0, 0, 0.1)); */
  border-radius: 10px;
  width: 162px;
  height: 103px;
  object-fit: cover;
  margin-top: 40px;
`;

const Wrap = styled.div`
  margin-left: 0px;
`;

const Form = styled.div`
  position: absolute;
`;

const Name = styled.div`
  display: flex;
  justify-content: space-between;
  color: black;
`;

const Content = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 15px;
  margin-left: 5px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #363636;
  font-family: "Apple SD Gothic Neo";
`;

const Like = styled.div`
  margin-left: 10px;
  display: flex;
  justify-content: left;
  align-items: center;
`;

const Cnt = styled.div`
  margin-left: 5px;
  color: #8d8d8d;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
`;

const SectionBox = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 5px;
`;

const Title = styled.div`
  color: #585858;
  font-weight: 700;
  margin-top: 300px;
  margin-left: 30px;
`;

const Div = styled.div`
  color: #363636;
  margin-top: 30px;
  margin-right: 10px;
`;

const Plus = styled.div`
  font-size: small;
  padding-right: 40px;
  color: #363636;
  cursor: pointer;
  margin-top: 300px;
`;
