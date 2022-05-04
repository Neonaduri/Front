import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const ButtonArea = (props) => {
  const settings = {
    slidesToShow: 5,
    slidesToScroll: 2,
    centerMode: true,
    centerPadding: "0px",
    arrows: true,
    dots: true,
    fade: false,
    infinite: true,
    pauseOnFocus: true,
    pauseOnHover: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <StyledSlide {...settings}>
        <BtnArea>서울</BtnArea>
        <BtnArea>부산</BtnArea>
        <BtnArea>여수</BtnArea>
        <BtnArea>강릉</BtnArea>
        <BtnArea>전주</BtnArea>
        <BtnArea>경주</BtnArea>
        <BtnArea>안동</BtnArea>
        <BtnArea>제주</BtnArea>
      </StyledSlide>
    </>
  );
};

export default ButtonArea;

const StyledSlide = styled(Slider)`
  position: relative;
  margin-top: 30px;
  margin-left: 10px;
  width: 100%;

  .slick-list {
    position: absolute;
    width: 300px;
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

const BtnArea = styled.button`
  cursor: pointer;
  margin-top: 10px;
  padding: 4px 10px;
  border: none;
  color: white;
  background: #62ce8b;
  border-radius: 20px;
`;
