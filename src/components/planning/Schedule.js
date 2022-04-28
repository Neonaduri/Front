import React, { useEffect, useState } from "react";
import RTdatabase from "../../firebase";
import { getDatabase, ref, onValue, get, child } from "firebase/database";
import { useParams } from "react-router";
import { planAction } from "../../redux/module/plan";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Schedule = () => {
  const dispatch = useDispatch();
  const postId = useParams().postId;
  const db = getDatabase();
  const [place, setPlace] = useState();
  let latlngArr = [];

  useEffect(() => {
    const fixedPlaceRef = ref(db, `postid/${postId}`);
    onValue(fixedPlaceRef, (snapshot) => {
      let fixedPlace = snapshot.val();
      const fixedPlaceArr = Object.values(fixedPlace);
      setPlace(fixedPlaceArr);
    });
  }, []);

  if (place) {
    for (let i of place) {
      latlngArr.push({ lat: i.tripPlan.y, lng: i.tripPlan.x });
    }
    dispatch(planAction.fixedPlaceXY(latlngArr));
  }
  return (
    <div>
      {place?.map((p, idx) => {
        return (
          <PlaceCard key={idx}>
            <span style={{ fontSize: "25px" }}>{p.tripPlan.storeTitle}</span>
            <span>{p.tripPlan.category}</span>
            <span>
              <a href={p.tripPlan.url} target="_blank">
                {p.tripPlan.storeTitle} 바로가기
              </a>
            </span>
          </PlaceCard>
        );
      })}
    </div>
  );
};
const PlaceCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Schedule;
