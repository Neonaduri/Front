import React, { Children, useEffect, useRef, useState } from "react";
import RTdatabase from "../../firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const Schedule = () => {
  const dispatch = useDispatch();
  const db = getDatabase();
  const postId = useParams().postId;
  const inputRef = useRef();
  const [place, setPlace] = useState();

  useEffect(() => {
    const fixedPlaceRef = ref(db, `postId/${postId}`);
    onValue(fixedPlaceRef, (snapshot) => {
      let fixedPlace = snapshot.val();
      setPlace(Object.values(fixedPlace));

      console.log(fixedPlace);
    });
  }, []);

  if (!place) return null;
  return (
    <div>
      {place?.map((p, idx) => {
        console.log(p.tripPlan);
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
