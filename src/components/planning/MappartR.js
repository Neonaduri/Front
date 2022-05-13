import React, { useState, useEffect, useRef } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import styled from "styled-components";
import {
  getDatabase,
  push,
  ref,
  set,
  onValue,
  query,
  orderByChild,
} from "firebase/database";
import { useHistory, useParams } from "react-router";
import ModalfixTime from "../common/ModalfixTime";
import { FaAngleLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { planAction } from "../../redux/module/plan";
import sharebtn from "../../static/images/icon/sharebtn.png";
import Slide from "../../shared/SlickSlider";

const { kakao } = window;

const MappartR = ({ dayNow, startDay, endDay }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const timeRef = useRef();
  const minuteRef = useRef();
  const keywordRef = useRef();
  const params = useParams();
  const postId = params.postId;
  const thisPlan = useSelector((state) => state.plan.list);
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [searchPlace, setSearchPlace] = useState("");
  const [polyLineArr, setPolyLineArr] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [marker, setMarker] = useState();

  useEffect(() => {
    const db = getDatabase();
    const fixedLatLngRef = query(
      ref(db, `${postId}/allPlan/day${dayNow}`),
      orderByChild("planTime")
    );
    onValue(fixedLatLngRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((child) => {
        let val = child.val();
        arr.push({ lat: val.lat, lng: val.lng });
      });
      setPolyLineArr(arr);
    });
  }, [dayNow]);

  const inputPlanTime = (marker) => {
    setMarker(marker);
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
    setInfo(null);
    setModalOpen(false);
  };

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];
        for (let i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
            infomation: data[i],
          });
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);
        map.setBounds(bounds);
      }
    });
  }, [map, searchPlace]);

  return (
    <Container>
      <FaAngleLeft
        onClick={() => {
          dispatch(planAction.exitBrowserOnPlanDB(postId));
          history.push("/myplan");
        }}
        style={{
          position: "absolute",
          top: "27px",
          left: "15px",
          fontSize: "20px",
          zIndex: "99",
        }}
      />
      <HeadLineDiv>
        <span>{thisPlan.postTitle}</span>
        <small>
          {thisPlan.startDate}({startDay}) ~ {thisPlan.endDate}({endDay})
        </small>
      </HeadLineDiv>
      <PlaceInput
        placeholder="검색어를 입력해주세요."
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            setSearchPlace(e.target.value);
            e.target.value = "";
          }
        }}
        ref={keywordRef}
      ></PlaceInput>
      <PlaceBtn
        onClick={() => {
          setSearchPlace(keywordRef.current.value);
          keywordRef.current.value = "";
        }}
      >
        <img src={sharebtn} />
      </PlaceBtn>

      <Map
        center={{
          lat: 37.5,
          lng: 127,
        }}
        style={{
          width: "100%",
          height: "86.5vh",
        }}
        level={7}
        onCreate={setMap}
      >
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
          >
            {info && info.content === marker.content && (
              <div style={{ color: "#000" }}>
                <div>
                  <span>{marker.content}</span>
                  <button onClick={() => setInfo("")}>닫기</button>
                </div>
                <span>
                  <a href={marker.infomation.place_url}>
                    {marker.infomation.place_name} 바로가기
                  </a>
                </span>
                <div>
                  <button
                    onClick={() => {
                      // clickFixPlace(marker);
                      inputPlanTime(marker);
                    }}
                  >
                    확정하기
                  </button>
                </div>
              </div>
            )}
          </MapMarker>
        ))}
        <Polyline
          path={[polyLineArr]}
          strokeWeight={4} // 선의 두께 입니다
          strokeColor={"red"} // 선의 색깔입니다
          strokeOpacity={0.8} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle={"solid"} // 선의 스타일입니다
        />
      </Map>
      {/* <PlaceList>
        {markers.map((place, idx) => {
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
      </PlaceList> */}
      <PlaceList>
        <Slide sliders={markers} />
      </PlaceList>
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

const HeadLineDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 13.5vh;
  span {
    font-size: 20px;
    margin-top: -7px;
  }
  small {
    color: #8d8d8d;
  }
`;

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

const PlaceList = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  white-space: nowrap;
  background-color: inherit;
  z-index: 5;
  scroll-behavior: auto;
  position: absolute;
  bottom: 45px;
`;

const Container = styled.div`
  position: relative;
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

const PlaceInput = styled.input`
  position: absolute;
  z-index: 2;
  left: 50%;
  transform: translate(-60%, 0);
  width: 78%;
  margin-top: 5px;
  outline: none;
  border: none;
  border-radius: 3px;
  font-size: 16px;
  padding: 3px 5px;
  height: 35px;
`;
const PlaceBtn = styled.div`
  background-color: white;
  width: 37px;
  height: 37px;
  border-radius: 50%;
  position: absolute;
  top: 14.3vh;
  right: 30px;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    margin-left: 2px;
    margin-bottom: 2px;
  }
`;

export default MappartR;
