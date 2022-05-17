import React, { useState } from "react";
import { Map, MapMarker, Polyline, MapTypeId } from "react-kakao-maps-sdk";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Titleline from "../../components/elements/Titleline";
import { FaAngleLeft } from "react-icons/fa";
import { useHistory } from "react-router";

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
  // console.log(dayPlanPlaces);
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
        <FaAngleLeft
          onClick={() => {
            history.push("/myplan");
          }}
          style={{
            position: "absolute",
            top: "25px",
            left: "15px",
            fontSize: "20px",
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
      <FaAngleLeft
        onClick={() => {
          history.goBack();
        }}
        style={{
          position: "absolute",
          top: "25px",
          left: "15px",
          fontSize: "20px",
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
              // image={{
              //   src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
              //   size: { width: 45, height: 50 },
              //   options: {
              //     offset: {
              //       x: 27,
              //       y: 69,
              //     },
              //   },
              // }}
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
            strokeColor={"red"} // 선의 색깔입니다
            strokeOpacity={0.8} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
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
    border: 1px solid black;
    padding: 0px 7px;
    border-radius: 50%;
    background-color: #41b67e;
    color: white;
    position: absolute;
    left: 63px;
    top: 33px;
  }
`;

const MapContainer = styled.div`
  width: 95%;
  margin: auto;
`;

export default MapDetail;
