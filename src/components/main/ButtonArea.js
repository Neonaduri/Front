import React, { useState } from "react";
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
  const [selectVal, setSelectVal] = useState("서울");

  const onClick = (e) => {
    const location = e.target.value;
    setSelectVal(e.target.value);
    dispatch(getLocationPostDB(location));
    dispatch(keywordDB(location));
  };

  const settings = {
    // slidesToShow: 5,
    // slidesToScroll: 2,
    // centerMode: true,
    // centerPadding: "0px",
    // arrows: true,
    // dots: true,
    // fade: false,
    // infinite: true,
    // pauseOnFocus: true,
    // pauseOnHover: true,
    // autoplaySpeed: 2000,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
  };

  return (
    <ImgWrap>
      <StyledSlide {...settings}>
        {area.map((item, idx) => {
          return (
            <BtnArea
              selectVal={selectVal}
              item={item}
              onClick={onClick}
              value={item}
              key={idx}
            >
              {item}
            </BtnArea>
          );
        })}
      </StyledSlide>
    </ImgWrap>
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

export const StyleSlider = styled(Slider)`
  width: 100%;
  position: relative;
  .slick-list {
    border-radius: 10px;
    overflow: hidden;
    margin: 0 -10px;
  }
  .slick-slide {
    padding: 0 10px;
  }
  .slick-prev {
    &:before {
      color: #212121;
    }
    left: 15px !important;
    z-index: 1;
  }
  .slick-next {
    right: 15px !important;
    &:before {
      color: #212121;
    }
  }
  .slick-initialized .slick-slide {
    & > div {
      display: flex;
    }
  }
  .slick-dots {
    display: flex !important;
    justify-content: center;
    bottom: auto;
    li {
      border: none !important;
    }
    li button {
      margin: 0;
      padding: 0;
      &:before {
        color: #fff;
      }
    }
  }
`;

const BtnArea = styled.button`
  background: ${(props) =>
    props.selectVal === props.item ? "#56be91" : "#fff"};
  border: ${(props) =>
    props.selectVal === props.item ? "none" : "1px solid #cacaca"};
  color: ${(props) => (props.selectVal === props.item ? "white" : "#cacaca")};
  border-radius: 20px;
  margin-top: 10px;
  padding: 4px 10px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 4px 14px;
  gap: 10px;
  cursor: pointer;
`;

const ImgWrap = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 17px;
  text-align: start;
`;
