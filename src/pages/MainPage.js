import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../components/common/Footer";
import Banner from "../components/main/Banner";
import Location from "../components/main/Location";
import MakePlan from "../components/main/MakePlan";
import Popular from "../components/main/Popular";
import ad from "../static/images/bannerPost/ad.png";
import {
  getBestPostDB,
  getKeywordPostDB,
  getLocationPostDB,
  keywordDB,
} from "../redux/module/post";
import { useDispatch, useSelector } from "react-redux";
import ButtonArea from "../components/main/ButtonArea";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MainPage = ({ history }) => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const bestList = useSelector((state) => state.post.bestList);
  const locationList = useSelector((state) => state.post.locationList);
  const isLogin = useSelector((state) => state?.user?.isLogin);

  const keyword = useSelector((state) => state.post.keyword);
  const [key, setKey] = useState("서울");

  const settings1 = {
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
  };

  const settings2 = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  // if (!token) {
  //   console.log("토큰이 없어요");
  //   history.push("/login");
  // }

  const initLocation = "서울";

  useEffect(() => {
    dispatch(getBestPostDB());
    dispatch(keywordDB("서울"));
    dispatch(getLocationPostDB(initLocation)); //디폴트 지역설정
  }, []);

  return (
    <Section>
      <Banner />
      <MakePlan />

      {/* 인기여행 */}
      <Wrapper>
        <Container>
          <Name>
            <Title>인기 여행</Title>
          </Name>
          <StyledSlide1 {...settings1}>
            {bestList &&
              bestList.map((item, id) => {
                return <Popular key={id} {...item} />;
              })}
          </StyledSlide1>
        </Container>
        {/* 인기 여행 */}

        <a href="https://forms.gle/B8pWhmu3pDFNwsMe9" target="_blank">
          <AdImg src={ad}></AdImg>
        </a>
        {/* 지역별 여행 */}
        <Container>
          <LoName>
            <LoTitle>지역별 여행 계획표</LoTitle>
            <Plus
              onClick={(e) => {
                dispatch(getKeywordPostDB(keyword));

                history.push("/search");
              }}
            >
              더보기
            </Plus>
          </LoName>
          <ButtonArea />

          <ImgWrap>
            <StyledSlide2 {...settings2}>
              {locationList &&
                locationList.map((item, id) => {
                  return <Location key={id} {...item} />;
                })}
            </StyledSlide2>
          </ImgWrap>
        </Container>
      </Wrapper>
      {/* 지역별 여행 */}
      <Footer />
      {/* {isLoading ? <Splash /> : null} */}
    </Section>
  );
};

export default MainPage;

const Wrapper = styled.div`
  position: relative;
  padding: 30px 0 90px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
`;

const ImgWrap = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 17px;
  text-align: start;
`;

const StyledSlide1 = styled(Slider)`
  position: relative;
  margin-top: 15px;
  width: 100%;

  .slick-list {
    width: 335px;
  }

  .slick-track {
    display: flex;
    height: 100%;

    div + div {
      margin-left: 8px;
    }
  }

  .slick-dots {
    /* display: none !important; */
  }
`;

const StyledSlide2 = styled(Slider)`
  position: relative;
  margin-top: 15px;
  width: 100%;

  .slick-list {
    width: 335px;
  }

  .slick-track {
    display: flex;
    height: 100%;

    div + div {
      margin-left: 8px;
    }
  }

  .slick-dots {
    display: none !important;
  }
`;

const Section = styled.section`
  justify-content: center;
  align-content: center;
  background-color: ${({ theme }) => theme.colors.borderColor};
`;

const Name = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  font-family: "Apple SD Gothic Neo";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #363636;
  padding: 10px 0;
`;

const Container = styled.div`
  & + & {
    margin-top: 30px;
  }
`;

const LoTitle = styled.div`
  font-family: "Apple SD Gothic Neo";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #363636;
  padding: 20px 0;
`;

const LoName = styled.div`
  display: flex;
  justify-content: space-between;
  color: black;
`;

const Plus = styled.div`
  font-size: small;
  color: #363636;
  cursor: pointer;
  padding: 20px 0;
`;

const AdImg = styled.img`
  /* width: 100%; */
  height: 101px;
  background-size: cover;
  /* margin: 30px 0; */
  margin-top: 40px;
  cursor: pointer;
`;
