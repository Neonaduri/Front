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

  useEffect(() => {
    const fixedPlaceRef = ref(db, `postid/${postId}`);
    onValue(fixedPlaceRef, (snapshot) => {
      let fixedPlace = snapshot.val();
      setPlace(Object.values(fixedPlace));
    });
  }, []);
  return (
    <div>
      {place?.map((p, idx) => {
        return (
          <PlaceCard key={idx}>
            <span style={{ fontSize: "25px" }}>{p.tripPlan[0].storeTitle}</span>
            <span>{p.tripPlan[0].category}</span>
            <span>
              <a href={p.tripPlan[0].url} target="_blank">
                {p.tripPlan[0].storeTitle} 바로가기
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
