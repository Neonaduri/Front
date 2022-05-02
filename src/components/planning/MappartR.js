import React, { useState, useEffect, useRef } from "react";
import { Map, MapMarker, MapInfoWindow, Polyline } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { getDatabase, push, ref, set, onValue } from "firebase/database";
import { useParams } from "react-router";
const { kakao } = window;

const MappartR = ({ dayNow }) => {
  const staticMapContainerRef = useRef();
  const params = useParams();
  const postId = params.postId;
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [searchPlace, setSearchPlace] = useState("");
  const [polyLineArr, setPolyLineArr] = useState([]);
  const [firstdayLatLng, setFirstdayLatLng] = useState();

  const submitStaticMap = () => {
    let arr = [];
    firstdayLatLng.map((day) => {
      arr.push({ position: new kakao.maps.LatLng(day.lat, day.lng) });
    });
    const staticMapContainer = staticMapContainerRef.current;
    const staticMapOption = {
      center: new kakao.maps.LatLng(
        firstdayLatLng[0].lat,
        firstdayLatLng[0].lng
      ),
      level: 5,
      marker: arr,
    };
    const staticMap = new kakao.maps.StaticMap(
      staticMapContainer,
      staticMapOption
    );
    const formdata = new FormData();
    formdata.append("mapImg", staticMap);
  };

  useEffect(() => {
    const db = getDatabase();
    const fixedLatLngRef = ref(db, `${postId}/allPlan/day${dayNow}`);
    onValue(fixedLatLngRef, (snapshot) => {
      const data = snapshot.val();
      let arr = [];
      if (data) {
        const fixedLatLngArr = Object.values(data);
        fixedLatLngArr.map((fix) => {
          arr.push({ lat: fix.lat, lng: fix.lng });
        });
      }
      setPolyLineArr(arr);
    });
    const firstdayLatLngRef = ref(db, `${postId}/allPlan/day1`);
    onValue(firstdayLatLngRef, (snapshot) => {
      const firstData = snapshot.val();
      let dayarr = [];
      if (firstData) {
        const firstDataLatLngArr = Object.values(firstData);
        firstDataLatLngArr.map((day) => {
          dayarr.push({ lat: day.lat, lng: day.lng });
        });
      }
      setFirstdayLatLng(dayarr);
    });
  }, [dayNow]);

  const clickFixPlace = (marker) => {
    const title = marker.infomation.place_name;
    const url = marker.infomation.place_url;
    const cate = marker.infomation.category_name;
    const address = marker.infomation.address_name;
    const road_address = marker.infomation.road_address_name;
    const lat = marker.infomation.y;
    const lng = marker.infomation.x;
    // polylineArr.push({ lat: lat, lng: lng });
    const db = getDatabase();
    set(push(ref(db, `${postId}/allPlan/day${dayNow}`)), {
      placeName: title,
      placeinfoUrl: url,
      category: cate,
      address,
      roadAddress: road_address,
      lat,
      lng,
      placeMemo: "",
    });
    setInfo(null);
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
                      clickFixPlace(marker);
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
                <a href={place.infomation.place_url}>
                  {place.infomation.place_name} 바로가기
                </a>
              </span>
            </PlaceListCard>
          );
        })}
      </PlaceList>
    </div>
  );
};
const FixPlaceMarker = styled.div`
  z-index: 9999;
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
