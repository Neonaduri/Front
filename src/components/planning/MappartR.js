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
import { useParams } from "react-router";
import ModalfixTime from "../common/ModalfixTime";

const { kakao } = window;

const MappartR = ({ dayNow }) => {
  const timeRef = useRef();
  const minuteRef = useRef();
  const params = useParams();
  const postId = params.postId;
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
    console.log(lat, lng);

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
    <div>
      <PlaceInput
        placeholder="장소검색"
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            setSearchPlace(e.target.value);
          }
        }}
      ></PlaceInput>
      <Map
        center={{
          lat: 37.5,
          lng: 127,
        }}
        style={{
          width: "100%",
          height: "450px",
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
      <PlaceList>
        {markers.map((place, idx) => {
          return (
            <PlaceListCard key={idx}>
              <span>{place.infomation.place_name}</span>
              <span>{place.infomation.category_name}</span>
              <span>{place.infomation.road_address_name}</span>
              <span>
                <a target="_blank" href={place.infomation.place_url}>
                  {place.infomation.place_name} 바로가기
                </a>
              </span>
            </PlaceListCard>
          );
        })}
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
    </div>
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

const PlaceList = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  white-space: nowrap;
  bottom: 210px;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 3;
  scroll-behavior: auto;
`;

const PlaceListCard = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 0px 5px;
  border-radius: 5px;
`;

const PlaceInput = styled.input`
  position: absolute;
  z-index: 2;
  left: 50%;
  transform: translate(-50%, 0);
  width: 60%;
  margin-top: 5px;
  outline: none;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  padding: 3px 5px;
`;

export default MappartR;
