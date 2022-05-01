import React, { useEffect, useState } from "react";
import RTdatabase from "../../firebase";
import { getDatabase, ref, onValue, get, child } from "firebase/database";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const Schedule = ({ dayNow }) => {
  const postId = useParams().postId;
  const db = getDatabase();
  const [place, setPlace] = useState();
  console.log(dayNow);

  useEffect(() => {
    const fixedPlaceRef = ref(db, `${postId}/allPlan/day${dayNow}`);
    onValue(fixedPlaceRef, (snapshot) => {
      let fixedPlace = snapshot.val();
      console.log(fixedPlace);
      if (fixedPlace) {
        const fixedPlaceArr = Object.values(fixedPlace);
        setPlace(fixedPlaceArr);
      } else if (fixedPlace === null) {
        setPlace(null);
      }
    });
  }, [dayNow]);

  return (
    <div>
      {place?.map((p, idx) => {
        return (
          <PlaceCard key={idx}>
            <span style={{ fontSize: "25px" }}>{p.storeTitle}</span>
            <span>{p.category}</span>
            <span>
              <a href={p.url} target="_blank">
                {p.storeTitle} 바로가기
              </a>
            </span>
            <input></input>
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
