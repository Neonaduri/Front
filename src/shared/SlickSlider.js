import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ModalfixTime from "../components/common/ModalfixTime";
import { getDatabase, push, ref, set } from "firebase/database";
import { useParams } from "react-router";

const Slide = ({ sliders, dayNow, callback, setInfo, info }) => {
  const timeRef = useRef();
  const minuteRef = useRef();
  const [marker, setMarker] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const params = useParams();
  const postId = params.postId;
  const [latlng, setLatlng] = useState();
  const carouselRef = useRef(null);

  let settings;
  if (sliders.length === 1) {
    settings = {
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      initialSlide: 0,
    };
  } else {
    settings = {
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 2,
      slidesToScroll: 1,
      arrows: false,
      initialSlide: 0,
    };
  }

  const inputPlanTime = (place) => {
    setMarker(place);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const clickFixPlace = () => {
    const planTime = timeRef.current.value + minuteRef.current.value;
    const title = marker.infomation.place_name;
    const url = marker.infomation.place_url;
    const cate = marker.infomation.category_name;
    const address = marker.infomation.address_name;
    const road_address = marker.infomation.road_address_name;
    const lat = marker.infomation.y;
    const lng = marker.infomation.x;

    const db = getDatabase();
    set(push(ref(db, `${postId}/allPlan/day${dayNow}`)), {
      placeName: title,
      placeInfoUrl: url,
      category: cate,
      address,
      roadAddress: road_address,
      lat,
      lng,
      placeMemo: "",
      planTime: parseInt(planTime),
    });
    // setInfo(null);
    setModalOpen(false);
  };

  useEffect(() => {
    callback(latlng);
  }, [latlng]);

  useEffect(() => {
    if (carouselRef.current?.slickGoTo)
      carouselRef.current.slickGoTo(targetIndex);
  }, [info]);

  let tmp = sliders.filter((item) => {
    if (item?.content === info?.content) {
      return item;
    }
  });
  const target = tmp[0];
  const targetIndex = sliders.indexOf(target);

  return (
    <Container>
      <StyledSlider {...settings} listCount={sliders.length} ref={carouselRef}>
        {sliders.map((place, idx) => {
          return (
            <PlaceListCard
              key={idx}
              onClick={() => {
                setLatlng(place.position);
                setInfo(place);
              }}
            >
              <div>
                <h4>{place.infomation.place_name}</h4>
                <small>{place.infomation.category_name}</small>
                <span>{place.infomation.road_address_name}</span>
              </div>
              <div>
                <button>
                  <a target="_blank" href={place.infomation.place_url}>
                    ????????? ??????
                  </a>
                </button>
                <button
                  onClick={() => {
                    inputPlanTime(place);
                  }}
                >
                  ????????????
                </button>
              </div>
            </PlaceListCard>
          );
        })}
      </StyledSlider>
      <ModalfixTime
        open={modalOpen}
        close={closeModal}
        onSubmitClick={clickFixPlace}
        header={
          <TimeModal>
            <h4>{marker?.content} ????????????</h4>
            <span>DAY{dayNow}</span>
            <Timediv>
              <span>?????? ??????</span>
              <div>
                <select ref={timeRef}>
                  <option value="0">?????? 0???</option>
                  <option value="1">?????? 1???</option>
                  <option value="2">?????? 2???</option>
                  <option value="3">?????? 3???</option>
                  <option value="4">?????? 4???</option>
                  <option value="5">?????? 5???</option>
                  <option value="6">?????? 6???</option>
                  <option value="7">?????? 7???</option>
                  <option value="8">?????? 8???</option>
                  <option value="9">?????? 9???</option>
                  <option value="10">?????? 10???</option>
                  <option value="11">?????? 11???</option>
                  <option value="12">?????? 12???</option>
                  <option value="13">?????? 1???</option>
                  <option value="14">?????? 2???</option>
                  <option value="15">?????? 3???</option>
                  <option value="16">?????? 4???</option>
                  <option value="17">?????? 5???</option>
                  <option value="18">?????? 6???</option>
                  <option value="19">?????? 7???</option>
                  <option value="20">?????? 8???</option>
                  <option value="21">?????? 9???</option>
                  <option value="22">?????? 10???</option>
                  <option value="23">?????? 11???</option>
                </select>
                <select ref={minuteRef}>
                  <option value="00">00???</option>
                  <option value="10">10???</option>
                  <option value="20">20???</option>
                  <option value="30">30???</option>
                  <option value="40">40???</option>
                  <option value="50">50???</option>
                </select>
              </div>
            </Timediv>
          </TimeModal>
        }
      ></ModalfixTime>
    </Container>
  );
};

export default Slide;

const Timediv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  div {
    select {
      border: none;
      font-size: 16px;
      margin-left: 5px;
    }
  }
`;

const TimeModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h4 {
    font-size: 20px;
  }
  span {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.text2};
    margin-bottom: 30px;
  }
`;

const Container = styled.div`
  margin-right: 25px;
`;

const StyledSlider = styled(Slider)`
  .slick-list {
    width: ${(props) => (props.listCount === 1 ? "300px" : "600px")};
    /* margin: 0 auto; */
    margin-left: -25px;
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
  width: 100%;
  div {
    &:first-child {
      padding: 2px 10px;
      display: flex;
      flex-direction: column;
      small {
        color: ${({ theme }) => theme.colors.text2};
        font-family: "apple1";
      }
      span {
        font-size: 14px;
        font-family: "apple1";
        color: ${({ theme }) => theme.colors.text2};
      }
    }
    &:nth-child(2) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      button {
        width: 50%;
        height: 40px;
        border: none;
        padding: 5px 2px;
        font-size: 14px;
        cursor: pointer;
        &:first-child {
          background-color: white;
          color: ${({ theme }) => theme.colors.mainGreen};
          border-bottom-left-radius: 5px;
          border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
          a {
            text-decoration: none;
            color: black;
            font-size: 14px;
          }
        }
        &:last-child {
          background-color: ${({ theme }) => theme.colors.mainGreen};
          color: white;
          border-bottom-right-radius: 5px;
          position: absolute;
          right: -10px;
        }
      }
    }
  }
`;
