import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const ScheduleDetail = ({ dayNow }) => {
  const planByDay = useSelector((state) => state.plan?.detailPlan.days);

  if (!planByDay) {
    return null;
  }
  const dayPlanPlaces = planByDay[dayNow - 1].places;

  return (
    <Container>
      {dayPlanPlaces.map((place, idx) => {
        return (
          <PlaceCard key={idx}>
            <div>
              <span>{place.placeName}</span>
              <span>{place.roadAddress}</span>
              <a href={place.placeInfoUrl}>{place.placeName}바로가기</a>
              <div>{place.placeMemo}</div>
            </div>
            <div></div>
          </PlaceCard>
        );
      })}
    </Container>
  );
};
const PlaceCard = styled.div`
  margin-bottom: 5px;
  border: 1px solid black;
  div {
    &:first-child {
      display: flex;
      flex-direction: column;
    }
  }
`;

const Container = styled.div`
  margin-top: 30px;
`;

export default ScheduleDetail;
