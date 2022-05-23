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

  const dayPlanPlaces = planByDay[dayNow - 1]?.places;
  if (!dayPlanPlaces) {
    return null;
  }

  if (dayPlanPlaces.length !== 0) {
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
  } else if (dayPlanPlaces.length === 0) {
    return (
      <>
        <MapContainer>
          <Map
            onClick={() => setIsOpen(false)}
            center={{ lat: 37.4674137335801, lng: 126.434614441118 }}
            style={{
              width: "100%",
              height: "176px",
              borderRadius: "10px",
            }}
            level={10}
          ></Map>
        </MapContainer>
      </>
    );
  }

  return (
    <div>
      <MapContainer>
        <Map
          onClick={() => setIsOpen(false)}
          center={latlngArr[0]}
          style={{
            width: "100%",
            height: "210px",
            borderRadius: "10px",
          }}
          level={9}
        >
          {markerArr.map((positions, idx) => (
            <MapMarker
              key={idx}
              position={positions.latlng}
              image={{
                src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdOqcy4%2FbtrCMX5F90p%2FqX2VdKGqVuJckRq04mq0FK%2Fimg.png",
                size: { width: 20, height: 28 },
                options: {
                  offset: {
                    x: 10,
                    y: 10,
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
            strokeWeight={3} // 선의 두께 입니다
            strokeColor={`#363636`} // 선의 색깔입니다
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
    background-color: #f96343;
    color: white;
    font-size: 18px;
    position: absolute;
    left: 70px;
    top: 29px;
  }
`;

const MapContainer = styled.div`
  width: 95%;
  margin: auto;
`;

export default MapDetail;
