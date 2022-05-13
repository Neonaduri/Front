import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ModalfixTime from "../components/common/ModalfixTime";
import {
  getDatabase,
  push,
  ref,
  set,
  onValue,
  query,
  orderByChild,
} from "firebase/database";
import { useParams } from "react-router";

const Slide = ({ sliders, dayNow, callback }) => {
  const timeRef = useRef();
  const minuteRef = useRef();
  const [marker, setMarker] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const params = useParams();
  const postId = params.postId;
  const [latlng, setLatlng] = useState();

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
  return (
    <Container>
      <StyledSlider {...settings}>
        {sliders.map((place, idx) => {
          return (
            <PlaceListCard key={idx} onClick={() => setLatlng(place.position)}>
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
                <button
                  onClick={() => {
                    inputPlanTime(place);
                  }}
                >
                  확정하기
                </button>
              </div>
            </PlaceListCard>
          );
        })}
      </StyledSlider>
      <ModalfixTime
        open={modalOpen}
        close={closeModal}
        header={
          <TimeModal>
            <div>
              <select ref={timeRef}>
                <option value="0">오전 0시</option>
                <option value="1">오전 1시</option>
                <option value="2">오전 2시</option>
                <option value="3">오전 3시</option>
                <option value="4">오전 4시</option>
                <option value="5">오전 5시</option>
                <option value="6">오전 6시</option>
                <option value="7">오전 7시</option>
                <option value="8">오전 8시</option>
                <option value="9">오전 9시</option>
                <option value="10">오전 10시</option>
                <option value="11">오전 11시</option>
                <option value="12">오후 12시</option>
                <option value="13">오후 1시</option>
                <option value="14">오후 2시</option>
                <option value="15">오후 3시</option>
                <option value="16">오후 4시</option>
                <option value="17">오후 5시</option>
                <option value="18">오후 6시</option>
                <option value="19">오후 7시</option>
                <option value="20">오후 8시</option>
                <option value="21">오후 9시</option>
                <option value="22">오후 10시</option>
                <option value="23">오후 11시</option>
              </select>
              <select ref={minuteRef}>
                <option value="00">00분</option>
                <option value="10">10분</option>
                <option value="20">20분</option>
                <option value="30">30분</option>
                <option value="40">40분</option>
                <option value="50">50분</option>
              </select>
            </div>
            <div>
              <button onClick={clickFixPlace}>플랜 확정</button>
            </div>
          </TimeModal>
        }
      ></ModalfixTime>
    </Container>
  );
};

const TimeModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    &:first-child {
      width: 80%;
      display: flex;
      justify-content: space-around;
      select {
        width: 40%;
        font-size: 20px;
      }
    }
    &:last-child {
      width: 80%;
      display: flex;
      justify-content: space-around;
      button {
        margin-top: 20px;
        width: 60%;
        padding: 10px 20px;
        border-radius: 10px;
        font-size: 20px;
      }
    }
  }
`;

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
      position: relative;
      button {
        width: 50%;
        height: 40px;
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
          position: absolute;
          right: -10px;
        }
      }
    }
  }
`;
