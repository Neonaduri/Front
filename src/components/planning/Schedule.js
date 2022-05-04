import React, { useEffect, useState } from "react";
import RTdatabase from "../../firebase";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  update,
  query,
  orderByChild,
} from "firebase/database";
import { useParams } from "react-router";
import styled from "styled-components";
import _ from "lodash";
const Schedule = ({ dayNow }) => {
  const postId = useParams().postId;
  const db = getDatabase();
  const [place, setPlace] = useState();
  const [placeKey, setPlaceKey] = useState();

  useEffect(() => {
    const fixedPlaceRef = query(
      ref(db, `${postId}/allPlan/day${dayNow}`),
      orderByChild("planTime")
    );
    onValue(fixedPlaceRef, (snapshot) => {
      let fixedPlace = [];
      let fixedPlaceKey = [];
      snapshot.forEach((child) => {
        fixedPlace.push(child.val());
        fixedPlaceKey.push(child.key);
      });
      setPlace(fixedPlace);
      setPlaceKey(fixedPlaceKey);
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
    update(placeRef, { placeMemo: memoInput });
  };

  return (
    <div>
      {place?.map((p, idx) => {
        const planTimeStr = String(p.planTime);
        let hour;
        let minute;
        if (planTimeStr.length === 3) {
          minute = planTimeStr.slice(-2);
          hour = planTimeStr.substring(0, 1);
        } else {
          minute = planTimeStr.slice(-2);
          hour = planTimeStr.substring(0, 2);
        }
        return (
          <PlaceCard key={idx}>
            <div>
              <span>
                {hour}시 {minute}분
              </span>
              <span style={{ fontSize: "25px" }}>{p.placeName}</span>
              <button onClick={deletePlaceClick} id={idx}>
                삭제
              </button>
            </div>
            <span>{p.category}</span>
            <span>
              <a href={p.placeinfoUrl} target="_blank">
                {p.placeName} 바로가기
              </a>
            </span>
            <input
              id={idx}
              defaultValue={p.placeMemo}
              onChange={(e) => changeMemoInput(e)}
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
