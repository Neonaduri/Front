import React, { useState, useEffect, useRef } from "react";
import { Map, MapMarker, MapInfoWindow } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { getDatabase, push, ref, set, onValue } from "firebase/database";
import { useParams } from "react-router";
const { kakao } = window;

const MappartR = ({ dayNow }) => {
  const params = useParams();
  const postId = params.postId;
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [searchPlace, setSearchPlace] = useState("");

  const clickFixPlace = (marker) => {
    const title = marker.infomation.place_name;
    const url = marker.infomation.place_url;
    const cate = marker.infomation.category_name;
    const address = marker.infomation.address_name;
    const road_address = marker.infomation.road_address_name;
    const lat = marker.infomation.y;
    const lng = marker.infomation.x;
    const db = getDatabase();

    set(push(ref(db, `${postId}/allPlan/day${dayNow}`)), {
      day: dayNow,
      storeTitle: title,
      url,
      category: cate,
      address,
      road_address,
      lat,
      lng,
    });
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
