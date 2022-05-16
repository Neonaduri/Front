import React, { useState } from "react";
import { Map, MapMarker, Polyline, MapTypeId } from "react-kakao-maps-sdk";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import Titleline from "../../components/elements/Titleline";
import back from "../../static/images/icon/back.png";

const MapDetail = ({ dayNow }) => {
  const { kakao } = window;
  const detailPlan = useSelector((state) => state.plan.detailPlan);
  const planByDay = useSelector((state) => state.plan?.detailPlan.days);
  const history = useHistory();
  const [isOpen, setIsOpen] = useState();
  const [showTraffic, setShowTraffic] = useState(false);
  let latlngArr = [];
  let markerArr = [];
  if (!planByDay) {
    return null;
  }

  const clickTraffic = () => {
    setShowTraffic(!showTraffic);
  };

  const dayPlanPlaces = planByDay[dayNow - 1]?.places;

  if (dayPlanPlaces !== undefined) {
    for (let i = 0; i < dayPlanPlaces.length; i++) {
      let latlng = { lat: dayPlanPlaces[i].lat, lng: dayPlanPlaces[i].lng };
      latlngArr.push(latlng);
    }
    for (let i = 0; i < dayPlanPlaces.length; i++) {
      let val = {
        title: dayPlanPlaces[i].placeName,
        latlng: { lat: dayPlanPlaces[i].lat, lng: dayPlanPlaces[i].lng },
      };
      markerArr.push(val);
    }
  } else {
    return (
      <>
        <img
          src={back}
          onClick={() => {
            history.push("/myplan");
          }}
        />
        <Titleline title={detailPlan.postTitle} />
        <MapContainer>
          <Map
            onClick={() => setIsOpen(false)}
            center={{ lat: 37.4674137335801, lng: 126.434614441118 }}
            style={{
              width: "100%",
              height: "280px",
              borderRadius: "10px",
              border: "1px solid black",
            }}
            level={10}
          ></Map>
        </MapContainer>
      </>
    );
  }

  return (
    <div>
      <img
        src={back}
        onClick={() => {
          history.goBack();
        }}
      />
      <Titleline title={detailPlan.postTitle} />
      <MapContainer>
        <button onClick={clickTraffic}>교통정보 보기</button>

        <Map
          onClick={() => setIsOpen(false)}
          center={latlngArr[0]}
          style={{
            width: "100%",
            height: "280px",
            borderRadius: "10px",
            border: "1px solid black",
          }}
          level={6}
        >
          {markerArr.map((positions, idx) => (
            <MapMarker
              key={idx}
              position={positions.latlng}
              image={{
                src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F37WUa%2FbtrCjEzIbYK%2FQAyIkqcQxyzcCAcVWQoWTk%2Fimg.png",
                size: { width: 20, height: 20 },
                options: {
                  offset: {
                    x: 9,
                    y: 12,
                  },
                },
              }}
              clickable={true}
              onClick={() => setIsOpen(true)}
            >
              {isOpen && (
                <InfoWindow>
                  <div>{idx + 1}</div>
                  {positions.title}
                </InfoWindow>
              )}
            </MapMarker>
          ))}
          <Polyline
            path={latlngArr}
            strokeWeight={4} // 선의 두께 입니다
            strokeColor={`#56BE91`} // 선의 색깔입니다
            strokeOpacity={1} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle={"solid"} // 선의 스타일입니다
          />
          {showTraffic ? (
            <MapTypeId type={kakao.maps.MapTypeId.TRAFFIC} />
          ) : null}
        </Map>
      </MapContainer>
    </div>
  );
};
const InfoWindow = styled.div`
  display: flex;
  position: relative;

  div {
    padding: 0px 5px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.mainGreen};
    color: white;
    position: absolute;
    left: 65px;
    top: 31px;
  }
`;

const MapContainer = styled.div`
  width: 95%;
  margin: auto;
`;

export default MapDetail;
