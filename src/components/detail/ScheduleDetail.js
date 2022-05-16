import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const ScheduleDetail = ({ dayNow }) => {
  const planByDay = useSelector((state) => state.plan?.detailPlan.days);
  const userByDay = useSelector((state) => state.plan?.detailPlan.user);
  const loginUser = useSelector((state) => state.user.list);

  if (!planByDay || !userByDay) {
    return null;
  }
  const dayPlanPlaces = planByDay[dayNow - 1]?.places;
  if (dayPlanPlaces === undefined) {
    return (
      <Container>
        <span>확정된 일정이 없습니다.</span>
      </Container>
    );
  }

  return (
    <Container>
      {dayPlanPlaces.map((place, idx) => {
        console.log(place);
        return (
          <PlaceCard key={idx}>
            <div>
              <span>{place.placeName}</span>
              <span>{place.roadAddress}</span>
              <a href={place.placeInfoUrl} target="_blank">
                {place.placeName}바로가기
              </a>
              {userByDay.userName === loginUser.userName ? (
                <div>{place.placeMemo}</div>
              ) : null}
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
