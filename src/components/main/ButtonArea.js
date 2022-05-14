import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { getLocationPostDB } from "../../redux/module/post";

const ButtonArea = (props) => {
  const dispatch = useDispatch();

  const onClick = (e) => {
    const location = e.target.value;

    dispatch(getLocationPostDB(location));
  };

  const settings = {
    slidesToShow: 5,
    slidesToScroll: 5,
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
    <StyledSlide {...settings}>
      <BtnArea onClick={onClick} value="서울">
        서울
      </BtnArea>

      <BtnArea onClick={onClick} value="부산">
        부산
      </BtnArea>

      <BtnArea onClick={onClick} value="경주">
        경주
      </BtnArea>

      <BtnArea onClick={onClick} value="전주">
        전주
      </BtnArea>

      <BtnArea onClick={onClick} value="안동">
        안동
      </BtnArea>

      <BtnArea onClick={onClick} value="여수">
        여수
      </BtnArea>

      <BtnArea onClick={onClick} value="강릉">
        강릉
      </BtnArea>

      <BtnArea onClick={onClick} value="제주">
        제주
      </BtnArea>
    </StyledSlide>
  );
};

export default ButtonArea;

const StyledSlide = styled(Slider)`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;

  .slick-list {
    width: 335px;

    div + div {
      margin-left: 5px;
    }
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
  background: #41b67e;
  border-radius: 20px;
`;
