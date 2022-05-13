import React, { Children, useEffect, useRef, useState } from "react";
import { Map, MapMarker, Polyline, MapTypeId } from "react-kakao-maps-sdk";
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
import { useDispatch, useSelector } from "react-redux";
import { planAction } from "../../redux/module/plan";
import hamburger from "../../static/images/icon/hamburger.png";
import Modalroompass from "../common/Modalroompass";

const Schedule = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const postId = useParams().postId;
  const db = getDatabase();
  const [place, setPlace] = useState();
  const [placeKey, setPlaceKey] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [targetFBkey, setTargetFBkey] = useState();
  const dateCnt = useSelector((state) => state.plan.list.dateCnt);
  const timeRef = useRef();
  const minuteRef = useRef();
  const [dayNow, setDayNow] = useState(1);
  const [hamburgerNum, setHamburgerNum] = useState(null);
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);
  const [deleteIndex, setDeleteIdx] = useState();

  let latlngArr = [];
  if (place !== undefined) {
    for (let i = 0; i < place.length; i++) {
      const val = { lat: place[i].lat, lng: place[i].lng };
      latlngArr.push(val);
    }
  }

  let dateCntArr = [];
  for (let i = 1; i <= dateCnt; i++) {
    dateCntArr.push(i);
  }

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
    return () =>
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
    setdeleteModalOpen(true);
    setDeleteIdx(e.target.id);
  };
  const realDeleteBtn = () => {
    const targetKey = placeKey[deleteIndex];
    const fixedPlaceRef = ref(
      db,
      `${postId}/allPlan/day${dayNow}/${targetKey}`
    );
    remove(fixedPlaceRef);
    setHamburgerNum(null);
    setdeleteModalOpen(false);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const closeDeleteModal = () => {
    setdeleteModalOpen(false);
  };

  const changeTimeBtnClick = (e) => {
    const index = e.target.id;
    const targetKey = placeKey[index];
    setTargetFBkey(targetKey);
    setHamburgerNum(null);
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

  if (latlngArr.length === 0) {
    return null;
  }

  return (
    <Container>
      <TitieDiv>
        <span>여행 계획표</span>
      </TitieDiv>
      <DayBtndiv>
        {dateCntArr.map((date, idx) => {
          return (
            <button
              key={idx}
              onClick={() => {
                setDayNow(date);
              }}
              style={{
                borderBottom: idx + 1 === dayNow ? "3px solid #56BE91" : null,
                color: idx + 1 === dayNow ? "black" : "#8d8d8d",
              }}
            >
              DAY {date}
            </button>
          );
        })}
      </DayBtndiv>
      <div style={{ padding: "5px 10px" }}>
        <Map
          center={latlngArr[0]}
          style={{
            width: "100%",
            height: "230px",
            borderRadius: "10px",
          }}
          level={5}
        >
          <Polyline
            path={latlngArr}
            strokeWeight={4} // 선의 두께 입니다
            strokeColor={"red"} // 선의 색깔입니다
            strokeOpacity={0.8} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle={"solid"} // 선의 스타일입니다
          />
        </Map>
      </div>
      {place?.map((p, idx) => {
        const planTimeStr = String(p.planTime);
        let hour;
        let minute;
        if (planTimeStr.length === 3) {
          minute = planTimeStr.slice(-2);
          hour = planTimeStr.substring(0, 1);
        } else if (planTimeStr.length === 4) {
          minute = planTimeStr.slice(-2);
          hour = planTimeStr.substring(0, 2);
        } else if (planTimeStr.length === 2) {
          hour = "00";
          minute = planTimeStr;
        } else if (planTimeStr.length === 1) {
          hour = "00";
          minute = "00";
        }
        return (
          <PlaceCard key={idx}>
            <Timediv>
              <div>
                {idx + 1}
                {place.length !== idx + 1 ? (
                  <NumColumnBar></NumColumnBar>
                ) : null}
              </div>

              <span>
                {hour}: {minute}
              </span>
            </Timediv>
            <Contentdiv>
              <div>
                <h4>{p.placeName}</h4>
                <img
                  src={hamburger}
                  onClick={() => {
                    hamburgerNum === null
                      ? setHamburgerNum(idx)
                      : setHamburgerNum(null);
                  }}
                />
              </div>
              <span>{p.roadAddress}</span>
              <span>
                <a href={p.placeinfoUrl} target="_blank">
                  자세히 보기
                </a>
              </span>
              <textarea
                id={idx}
                value={p.placeMemo}
                onChange={(e) => changeMemoInput(e)}
              ></textarea>
              {hamburgerNum === idx ? (
                <ToggleBox>
                  <div
                    id={idx}
                    onClick={(e) => {
                      changeTimeBtnClick(e);
                    }}
                  >
                    시간 수정하기
                  </div>
                  <div
                    id={idx}
                    onClick={(e) => {
                      deletePlaceClick(e);
                    }}
                  >
                    삭제하기
                  </div>
                </ToggleBox>
              ) : null}
            </Contentdiv>
            <ModalfixTime
              open={deleteModalOpen}
              close={closeDeleteModal}
              header={
                <TimeModal>
                  <DeleteClickedDiv>
                    <span>계획을 삭제하시겠습니까?</span>
                    <button onClick={realDeleteBtn}>삭제</button>
                  </DeleteClickedDiv>
                </TimeModal>
              }
            ></ModalfixTime>
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
    </Container>
  );
};

const DeleteClickedDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    background-color: #e93c3c;
    color: white;
    width: 30px;
  }
`;

const ToggleBox = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  width: 35%;
  border-radius: 5px;
  position: absolute;
  background-color: white;
  right: 20px;
  top: 10px;
  div {
    padding: 8px;
    font-size: 15px;
    &:first-child {
      border-bottom: 1px solid black;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const NumColumnBar = styled.span`
  width: 5px;
  height: 100px;
  background-color: #56be91;
  position: absolute;
  top: 20px;
`;

const Timediv = styled.div`
  width: 20%;
  display: flex;
  padding-left: 15px;
  padding-top: 5px;
  div {
    background-color: #56be91;
    width: 20px;
    height: 20px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-left: -10px;
    margin-right: 5px;
    position: relative;
  }
`;
const Contentdiv = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  position: relative;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      height: 20px;
      margin-right: 10px;
    }
    h4 {
      font-size: 18px;
    }
  }
  textarea {
    width: 90%;
    outline: none;
    border: 1px solid #cacaca;
    border-radius: 5px;
    font-size: 15px;
  }
  span {
    color: #8d8d8d;
  }
`;

const PlaceCard = styled.div`
  display: flex;
  flex-direction: row;
  width: 94%;
  margin: auto;
`;

const TitieDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  span {
    font-size: 20px;
  }
`;

const DayBtndiv = styled.div`
  display: flex;
  justify-content: space-around;
  button {
    border: none;
    background-color: inherit;
    font-size: 16px;
  }
`;

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Schedule;
