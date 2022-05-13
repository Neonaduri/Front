import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slide = ({ sliders }) => {
  return (
    <Container>
      <StyledSlider {...settings}>
        {sliders.map((place, idx) => {
          return (
            <PlaceListCard key={idx}>
              <div>
                <h4>{place.infomation.place_name}</h4>
                <small>{place.infomation.category_name}</small>
                <span>{place.infomation.road_address_name}</span>
              </div>
              <div>
                <button>
                  <a target="_blank" href={place.infomation.place_url}>
                    자세히 보기
                  </a>
                </button>
                <button>확정하기</button>
              </div>
            </PlaceListCard>
          );
        })}
      </StyledSlider>
    </Container>
  );
};

export default Slide;

const settings = {
  dots: false,
  infinite: true,
  speed: 1500,
  autoplay: false,
  autoplaySpeed: 5000,
  slidesToShow: 4,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: "0px",
};

const Container = styled.div`
  margin-right: 25px;
`;

const StyledSlider = styled(Slider)`
  .slick-list {
    width: 1200px;
    margin: 0 auto;
  }
  .slick-slide div {
    /* cursor: pointer; */
    margin-right: 10px;
  }
  .slick-dots {
    bottom: -50px;
    margin-top: 200px;
  }
  .slick-track {
    /* overflow-x: hidden; */
  }
`;

const PlaceListCard = styled.div`
  z-index: 2;
  background-color: white;
  display: flex;
  flex-direction: column;
  border: none;
  margin: 0px 5px;
  border-radius: 5px;
  div {
    &:first-child {
      padding: 2px 10px;
      display: flex;
      flex-direction: column;
      small {
        color: #8d8d8d;
      }
      span {
        font-size: 14px;
      }
    }
    &:nth-child(2) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      button {
        width: 50%;
        border: none;
        padding: 5px 2px;
        &:first-child {
          background-color: white;
          color: #56be91;
          border-bottom-left-radius: 5px;
          a {
            text-decoration: none;
            color: #56be91;
          }
        }
        &:last-child {
          background-color: #56be91;
          color: white;
          border-bottom-right-radius: 5px;
        }
      }
    }
  }
`;
