import React, { useState } from "react";
import { Map, MapMarker, Polyline, MapTypeId } from "react-kakao-maps-sdk";
import { useSelector } from "react-redux";
import styled from "styled-components";

const MapDetail = ({ dayNow }) => {
  const { kakao } = window;
  const planByDay = useSelector((state) => state.plan?.detailPlan.days);
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
        <MapContainer id="container">
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
      <MapContainer id="container">
        <Map
          onClick={() => setIsOpen(false)}
          center={markerArr[0].latlng}
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
                src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FznK5p%2FbtrDiSEVUIK%2F5qnuhKeq66TpoViSVPIrU0%2Fimg.png",
                size: { width: 22, height: 22 },
                options: {
                  spriteSize: new kakao.maps.Size(21, 480),
                  spriteOrigin: new kakao.maps.Point(0, idx * 33 - 1),
                  offset: {
                    x: 10,
                    y: 15,
                  },
                },
              }}
              clickable={true}
              onClick={() => setIsOpen(true)}
            >
              {isOpen && (
                <InfoWindow>
                  <span>{positions.title}</span>
                </InfoWindow>
              )}
            </MapMarker>
          ))}
          <Polyline
            path={latlngArr}
            strokeWeight={3} // ?????? ?????? ?????????
            strokeColor={`#363636`} // ?????? ???????????????
            strokeOpacity={1} // ?????? ???????????? ????????? 1?????? 0 ????????? ????????? 0??? ??????????????? ???????????????
            strokeStyle={"solid"} // ?????? ??????????????????
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
  text-align: center;
  span {
    background-color: white;
    width: 150px;
    border: 1px solid black;
    span {
      border-radius: 50%;
      background-color: ${({ theme }) => theme.colors.mainRed};
      border: none;
      color: white;
      padding: 0px 5px;
    }
  }
`;

const MapContainer = styled.div`
  width: 95%;
  margin: auto;
`;

export default MapDetail;
