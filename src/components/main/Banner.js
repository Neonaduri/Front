import React from "react";
import styled from "styled-components";
import post1 from "../../static/images/bannerPost/post1.png";
import post2 from "../../static/images/bannerPost/post2.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    arrows: true,
    dots: true,
    fade: false,
    infinite: true,
    pauseOnFocus: true,
    pauseOnHover: true,
    autoplay: true,
    speed: 1000,
  };

  return (
    <>
      <Container>
        <Section>
          <StyledSlide {...settings}>
            <Img src={post1}></Img>
            <Img src={post2}></Img>
          </StyledSlide>
        </Section>
      </Container>
    </>
  );
};

export default Banner;

const Container = styled.div``;

const Section = styled.section`
  width: 100%;
  height: 335px;
`;

const Img = styled.img`
  background-size: cover;
  width: 100%;
`;

const StyledSlide = styled(Slider)`
  width: 100%;

  .slick-list {
    width: 100%;
    height: 380px;
    margin: 0 auto;
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
