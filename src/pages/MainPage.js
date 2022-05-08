import React, { useEffect } from "react";
import styled from "styled-components";
import Footer from "../components/common/Footer";
import Banner from "../components/main/Banner";
import Location from "../components/main/Location";
import MakePlan from "../components/main/MakePlan";
import Popular from "../components/main/Popular";
import { getBestPostDB, getLocationPostDB } from "../redux/module/post";
import { useDispatch, useSelector } from "react-redux";
import ButtonArea from "../components/main/ButtonArea";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getLocation } from "connected-react-router";

const MainPage = ({ history }) => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const bestList = useSelector((state) => state.post.bestList);

  const settings = {
    slidesToShow: 2,
    slidesToScroll: 2,
    centerMode: true,
    centerPadding: "0px",
    arrows: true,
    dots: true,
    fade: false,
    infinite: true,
    pauseOnFocus: true,
    pauseOnHover: true,
    autoplay: true,
    speed: 2000,
  };

  if (!token) {
    history.push("/login");
  }

  useEffect(() => {
    dispatch(getBestPostDB());
    dispatch(getLocationPostDB());
  }, []);

  return (
    <>
      <Section>
        <Banner />
        <MakePlan />
        <Line />
        {/* 인기여행 */}
        <Container>
          <Name>
            <Title>인기 여행</Title>
          </Name>
          <StyledSlide {...settings}>
            {bestList.map((item, i) => {
              return (
                <div key={i}>
                  <Popular {...item} />
                </div>
              );
            })}
          </StyledSlide>
        </Container>
        {/* 인기 여행 */}
        {/* 지역별 여행 */}
        <LoDiv>
          <LoName>
            <LoTitle>지역별 여행 계획표</LoTitle>
            <Plus>더보기</Plus>
          </LoName>
          <ButtonArea />
          <StyledSlide {...settings}>
            {bestList.map((item, i) => {
              return (
                <div key={i}>
                  <Location {...item} />
                </div>
              );
            })}
          </StyledSlide>
        </LoDiv>
        {/* 지역별 여행 */}
        <Footer />
      </Section>
    </>
  );
};

export default MainPage;

const StyledSlide = styled(Slider)`
  position: relative;
  margin-top: 30px;
  width: 100%;

  .slick-list {
    position: absolute;
    width: 335px;
    height: 300px;
    margin: 0 auto;
    top: -30px;
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

const Section = styled.section`
  justify-content: center;
  align-content: center;
`;

const Name = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Line = styled.div`
  width: 400px;
  height: 10px;
  background: #eeeeee;
`;

const Title = styled.div`
  color: #585858;
  font-weight: 500;
`;

const Container = styled.div`
  color: #363636;
  margin-top: 50px;
  margin-left: 32px;
`;

const LoTitle = styled.div`
  color: #585858;
  font-weight: 700;
  margin-top: 300px;
`;

const LoName = styled.div`
  display: flex;
  justify-content: space-between;
  color: black;
`;

const LoDiv = styled.div`
  color: #363636;
  margin-top: 30px;
  padding-bottom: 20px;
  margin-left: 25px;
`;

const Plus = styled.div`
  font-size: small;
  padding-right: 40px;
  color: #363636;
  cursor: pointer;
  margin-top: 300px;
`;
