import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const ButtonArea = (props) => {
  const onClick = (e) => {
    console.log("클릭!");
    const { value } = e.target;
    console.log(value);
  };

  const settings = {
    slidesToShow: 5,
    slidesToScroll: 3,
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
        <div>
          <BtnArea onClick={onClick} value="서울">
            서울
          </BtnArea>
        </div>
        <div>
          <BtnArea>부산</BtnArea>
        </div>
        <div>
          <BtnArea>경주</BtnArea>
        </div>
        <div>
          <BtnArea>전주</BtnArea>
        </div>
        <div>
          <BtnArea>안동</BtnArea>
        </div>
        <div>
          <BtnArea>여수</BtnArea>
        </div>
        <div>
          <BtnArea>강릉</BtnArea>
        </div>
        <div>
          <BtnArea>제주</BtnArea>
        </div>
      </StyledSlide>
    </>
  );
};

export default ButtonArea;

const StyledSlide = styled(Slider)`
  position: relative;
  margin-top: 30px;
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
  width: 53px;
  height: 25px;
  color: white;
  background: #62ce8b;
  border-radius: 20px;
  z-index: 9999;
`;
