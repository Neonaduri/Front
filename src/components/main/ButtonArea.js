import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  getKeywordPostDB,
  getLocationPostDB,
  keywordDB,
} from "../../redux/module/post";
import { area } from "../elements/ArrValue";

const ButtonArea = () => {
  const dispatch = useDispatch();
  const [selectVal, setSelectVal] = useState("서울");
  const key = useSelector((state) => state.post.keyword);

  const onClick = (e) => {
    const location = e.target.value;
    setSelectVal(selectVal);
    // dispatch(getKeywordPostDB(location));
    dispatch(getLocationPostDB(location));
    dispatch(keywordDB(location));
  };

  const settings = {
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
              selectVal={key}
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

const BtnArea = styled.button`
  background: ${(props) =>
    props.selectVal === props.item ? "#56be91" : "#fff"};
  border: ${(props) =>
    props.selectVal === props.item ? "none" : "1px solid #cacaca"};
  color: ${(props) => (props.selectVal === props.item ? "white" : "#cacaca")};
  border-radius: 20px;
  /* margin-top: 10px; */
  /* padding: 4px 0; */
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
