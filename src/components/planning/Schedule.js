import React, { Children, useEffect, useRef, useState } from "react";
import RTdatabase from "../../firebase";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  update,
  query,
  orderByChild,
  runTransaction,
} from "firebase/database";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import _ from "lodash";
import ModalfixTime from "../common/ModalfixTime";
import { useDispatch } from "react-redux";
import { planAction } from "../../redux/module/plan";
const Schedule = ({ dayNow }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const postId = useParams().postId;
  const db = getDatabase();
  const [place, setPlace] = useState();
  const [placeKey, setPlaceKey] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [targetFBkey, setTargetFBkey] = useState();

  const timeRef = useRef();
  const minuteRef = useRef();

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

  const closeModal = () => {
    setModalOpen(false);
  };

  const changeTimeBtnClick = (e) => {
    const index = e.target.id;
    const targetKey = placeKey[index];
    setTargetFBkey(targetKey);
    setModalOpen(true);
  };

  const clickEditTime = (e) => {
    const planTime = timeRef.current.value + minuteRef.current.value;
    const placeRef = ref(
      db,
      `${postId}/allPlan/day${dayNow}/${targetFBkey}/planTime`
    );
    runTransaction(placeRef, (currentTime) => {
      return parseInt(planTime);
    });
    setModalOpen(false);
  };
  // const minusTime = (e) => {
  //   const index = e.target.id;
  //   const targetKey = placeKey[index];
  //   const placeRef = ref(
  //     db,
  //     `${postId}/allPlan/day${dayNow}/${targetKey}/planTime`
  //   );
  //   runTransaction(placeRef, (currentTime) => {
  //     let resultTime;
  //     if (currentTime < 100) {
  //       return;
  //     } else {
  //       resultTime = currentTime - 100;
  //     }
  //     return resultTime;
  //   });
  // };
  // const plusTime = (e) => {
  //   const index = e.target.id;
  //   const targetKey = placeKey[index];
  //   const placeRef = ref(
  //     db,
  //     `${postId}/allPlan/day${dayNow}/${targetKey}/planTime`
  //   );
  //   runTransaction(placeRef, (currentTime) => {
  //     let resultTime;
  //     if (currentTime > 2300) {
  //       return;
  //     } else {
  //       resultTime = currentTime + 100;
  //     }
  //     return resultTime;
  //   });
  // };

  const changeMemoInput = (e) => {
    const memoInput = e.target.value;
    const memoIdx = e.target.id;
    const key = placeKey[memoIdx];
    const placeRef = ref(db, `${postId}/allPlan/day${dayNow}/${key}/placeMemo`);
    // update(placeRef, { placeMemo: memoInput });
    runTransaction(placeRef, (currentMemo) => {
      return memoInput;
    });
  };

  useEffect(() => {
    let unlisten = history.listen((location) => {
      if (history.action === "POP") {
        dispatch(planAction.exitBrowserOnPlanDB(postId));
      }
      return () => {
        unlisten();
      };
    });
  }, []);
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
                <button onClick={changeTimeBtnClick} id={idx}>
                  시간변경
                </button>
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
              value={p.placeMemo}
              onChange={(e) => changeMemoInput(e)}
            ></input>
            <ModalfixTime
              open={modalOpen}
              close={closeModal}
              header={
                <TimeModal>
                  <div>
                    <select ref={timeRef}>
                      <option value="0">오전 0시</option>
                      <option value="1">오전 1시</option>
                      <option value="2">오전 2시</option>
                      <option value="3">오전 3시</option>
                      <option value="4">오전 4시</option>
                      <option value="5">오전 5시</option>
                      <option value="6">오전 6시</option>
                      <option value="7">오전 7시</option>
                      <option value="8">오전 8시</option>
                      <option value="9">오전 9시</option>
                      <option value="10">오전 10시</option>
                      <option value="11">오전 11시</option>
                      <option value="12">오후 12시</option>
                      <option value="13">오후 1시</option>
                      <option value="14">오후 2시</option>
                      <option value="15">오후 3시</option>
                      <option value="16">오후 4시</option>
                      <option value="17">오후 5시</option>
                      <option value="18">오후 6시</option>
                      <option value="19">오후 7시</option>
                      <option value="20">오후 8시</option>
                      <option value="21">오후 9시</option>
                      <option value="22">오후 10시</option>
                      <option value="23">오후 11시</option>
                    </select>
                    <select ref={minuteRef}>
                      <option value="00">00분</option>
                      <option value="10">10분</option>
                      <option value="20">20분</option>
                      <option value="30">30분</option>
                      <option value="40">40분</option>
                      <option value="50">50분</option>
                    </select>
                  </div>
                  <div>
                    <button onClick={clickEditTime} id={idx}>
                      시간 수정
                    </button>
                  </div>
                </TimeModal>
              }
            ></ModalfixTime>
          </PlaceCard>
        );
      })}
    </div>
  );
};
const TimeModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    &:first-child {
      width: 80%;
      display: flex;
      justify-content: space-around;
      select {
        width: 40%;
        font-size: 20px;
      }
    }
    &:last-child {
      width: 80%;
      display: flex;
      justify-content: space-around;
      button {
        margin-top: 20px;
        width: 60%;
        padding: 10px 20px;
        border-radius: 10px;
        font-size: 20px;
      }
    }
  }
`;

const PlaceCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Schedule;
