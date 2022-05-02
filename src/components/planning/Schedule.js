import React, { useEffect, useState } from "react";
import RTdatabase from "../../firebase";
import { getDatabase, ref, onValue, remove, update } from "firebase/database";
import { useParams } from "react-router";
import styled from "styled-components";
import { set } from "date-fns";
import { throttle } from "lodash";
const Schedule = ({ dayNow }) => {
  const postId = useParams().postId;
  const db = getDatabase();
  const [place, setPlace] = useState();
  const [placeKey, setPlaceKey] = useState();

  useEffect(() => {
    const fixedPlaceRef = ref(db, `${postId}/allPlan/day${dayNow}`);
    onValue(fixedPlaceRef, (snapshot) => {
      let fixedPlace = snapshot.val();
      if (fixedPlace) {
        const fixedPlaceArr = Object.values(fixedPlace);
        const fixedPlaceKeyArr = Object.keys(fixedPlace);
        setPlace(fixedPlaceArr);
        setPlaceKey(fixedPlaceKeyArr);
      } else if (fixedPlace === null) {
        setPlace(null);
      }
    });
  }, [dayNow]);

  const deletePlaceClick = (e) => {
    const index = e.target.id;
    const targetKey = placeKey[index];
    const fixedPlaceRef = ref(
      db,
      `${postId}/allPlan/day${dayNow}/${targetKey}`
    );
    remove(fixedPlaceRef);
  };

  const changeMemoInput = (e) => {
    const memoInput = e.target.value;
    const memoIdx = e.target.id;
    const key = placeKey[memoIdx];
    const placeRef = ref(db, `${postId}/allPlan/day${dayNow}/${key}`);
    update(placeRef, { memo: memoInput });
  };

  return (
    <div>
      {place?.map((p, idx) => {
        return (
          <PlaceCard key={idx}>
            <div>
              <span style={{ fontSize: "25px" }}>{p.storeTitle}</span>
              <button onClick={(e) => deletePlaceClick(e)} id={idx}>
                삭제
              </button>
            </div>
            <span>{p.category}</span>
            <span>
              <a href={p.url} target="_blank">
                {p.storeTitle} 바로가기
              </a>
            </span>
            <input
              id={idx}
              defaultValue={p.memo}
              onChange={(e) => {
                changeMemoInput(e);
              }}
            ></input>
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
