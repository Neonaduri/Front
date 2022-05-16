import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import {
  getKeywordPostDB,
  getLocationPostDB,
  getSearchPost,
  keywordDB,
} from "../../redux/module/post";
import { area } from "../elements/ArrValue";

const ButtonArea = () => {
  const dispatch = useDispatch();

  const onClick = (e) => {
    const location = e.target.value;
    dispatch(getLocationPostDB(location));

    dispatch(keywordDB(location));
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
      {area.map((item, idx) => {
        return (
          <BtnArea onClick={onClick} value={item} key={idx}>
            {item}
          </BtnArea>
        );
      })}
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
`;

const BtnArea = styled.button`
  background: #ffffff;
  border: 1px solid #cacaca;
  color: #cacaca;
  border-radius: 20px;
  margin-top: 10px;
  padding: 4px 10px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 4px 14px;
  gap: 10px;
  cursor: pointer;

  &:focus {
    border: none;
    color: white;
    background: #56be91;
    border-radius: 20px;
  }
`;
