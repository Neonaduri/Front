import React, { memo, useEffect, useRef, useState } from "react";
import { Map, Polyline, MapMarker } from "react-kakao-maps-sdk";
import RTdatabase from "../../firebase";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  query,
  orderByChild,
  runTransaction,
  onChildChanged,
} from "firebase/database";
import { useParams } from "react-router";
import styled from "styled-components";
import ModalfixTime from "../common/ModalfixTime";
import { useSelector } from "react-redux";
import hamburger from "../../static/images/icon/hamburger.png";
import "../../assets/editingMemo.css";
import cancel from "../../static/images/icon/cancelX.png";

const Schedule = (props) => {
  const postId = useParams().postId;
  const db = getDatabase();
  const [place, setPlace] = useState();
  const [placeKey, setPlaceKey] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [targetFBkey, setTargetFBkey] = useState();
  const dateCnt = useSelector((state) => state.plan.list.dateCnt);
  const timeRef = useRef();
  const minuteRef = useRef();
  const [dayNow, setDayNow] = useState(props.daynow);
  const [hamburgerNum, setHamburgerNum] = useState(null);
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);
  const [deleteIndex, setDeleteIdx] = useState();
  const { kakao } = window;

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
    const onvalue = onValue(fixedPlaceRef, (snapshot) => {
      let fixedPlace = [];
      let fixedPlaceKey = [];
      snapshot.forEach((child) => {
        fixedPlace.push(child.val());
        fixedPlaceKey.push(child.key);
      });
      setPlace(fixedPlace);
      setPlaceKey(fixedPlaceKey);
    });
    return () => onvalue();
  }, [dayNow]);

  const deletePlaceClick = (e) => {
    setdeleteModalOpen(true);
    setDeleteIdx(e.target.id);
    setHamburgerNum(null);
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
    const myRealDay = e.target.attributes.isitwork.nodeValue;
    const memoInput = e.target.value;
    const key = e.target.id;
    const placeRef = ref(
      db,
      `${postId}/allPlan/day${myRealDay}/${key}/placeMemo`
    );
    runTransaction(placeRef, (currentMemo) => {
      return memoInput;
    });
  };

  //텍스트 편집시 알리기 기능
  let object = {};
  for (let i = 0; i < 10; i++) {
    object[`timeout${i}`] = "";
  }
  let dupArr = [];
  useEffect(() => {
    const memoRef = ref(db, `${postId}/allPlan/day${dayNow}`);
    // DB의 값이 변하는지 지켜보는 함수, 해당 ref 자식의 데이터가 바뀌면 가져옴
    const onChildChange = onChildChanged(memoRef, (data) => {
      const editingPlaceKey = data.key;
      dupArr.push(editingPlaceKey);
      const set = new Set(dupArr);
      const uniqueArr = [...set];

      const targetKeyIdx = uniqueArr.indexOf(editingPlaceKey);

      const target = document.getElementById(editingPlaceKey);
      target.classList.add("editing");

      switch (targetKeyIdx) {
        case 0:
          clearTimeout(object.timeout0);
          object.timeout0 = setTimeout(() => {
            target.classList.remove("editing");
          }, 1500);
          break;
        case 1:
          clearTimeout(object.timeout1);
          object.timeout1 = setTimeout(() => {
            target.classList.remove("editing");
          }, 1500);
          break;
        case 2:
          clearTimeout(object.timeout2);
          object.timeout2 = setTimeout(() => {
            target.classList.remove("editing");
          }, 1500);
          break;
        case 3:
          clearTimeout(object.timeout3);
          object.timeout3 = setTimeout(() => {
            target.classList.remove("editing");
          }, 1500);
          break;
        case 4:
          clearTimeout(object.timeout4);
          object.timeout4 = setTimeout(() => {
            target.classList.remove("editing");
          }, 1500);
          break;
        case 5:
          clearTimeout(object.timeout5);
          object.timeout5 = setTimeout(() => {
            target.classList.remove("editing");
          }, 1500);
          break;
        case 6:
          clearTimeout(object.timeout6);
          object.timeout6 = setTimeout(() => {
            target.classList.remove("editing");
          }, 1500);
          break;
        case 7:
          clearTimeout(object.timeout7);
          object.timeout7 = setTimeout(() => {
            target.classList.remove("editing");
          }, 1500);
          break;
        case 8:
          clearTimeout(object.timeout8);
          object.timeout8 = setTimeout(() => {
            target.classList.remove("editing");
          }, 1500);
          break;
        case 9:
          clearTimeout(object.timeout9);
          object.timeout9 = setTimeout(() => {
            target.classList.remove("editing");
          }, 1500);
          break;
      }
    });
    return () => onChildChange();
  }, []);

  if (latlngArr.length === 0) {
    return (
      <Container>
        <TitleDiv>
          <button
            onClick={() => {
              props.setopen(false);
            }}
          >
            <img src={cancel} alt="x" />
          </button>
          <span>여행 계획표</span>
        </TitleDiv>
        <DayBtndiv>
          {dateCntArr.map((date, idx) => {
            return (
              <DayBtn
                key={idx}
                onClick={() => {
                  setDayNow(date);
                }}
                idx={idx}
                daynow={dayNow}
              >
                DAY {date}
              </DayBtn>
            );
          })}
        </DayBtndiv>
        <MapContainer>
          <Map
            center={{ lat: 37.4674137335801, lng: 126.434614441118 }}
            style={{
              width: "100%",
              height: "230px",
              borderRadius: "10px",
            }}
            level={10}
          ></Map>
        </MapContainer>
      </Container>
    );
  }

  return (
    <Container>
      <TitleDiv>
        <button
          onClick={() => {
            props.setopen(false);
          }}
        >
          <img src={cancel} alt="x" />
        </button>
        <span>여행 계획표</span>
      </TitleDiv>
      <DayBtndiv>
        {dateCntArr.map((date, idx) => {
          return (
            <DayBtn
              key={idx}
              onClick={() => {
                setDayNow(date);
              }}
              idx={idx}
              daynow={dayNow}
            >
              DAY {date}
            </DayBtn>
          );
        })}
      </DayBtndiv>
      <MapContainer>
        <Map
          center={latlngArr[0]}
          style={{
            width: "100%",
            height: "230px",
            borderRadius: "10px",
          }}
          level={5}
        >
          {latlngArr.map((letlng, idx) => {
            return (
              <MapMarker
                key={idx}
                position={letlng}
                image={{
                  src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb90fLh%2FbtrDiQmSm8v%2FKYuLBV7kKPslmi5AH8SSA0%2Fimg.png",
                  size: { width: 22, height: 22 },
                  options: {
                    spriteSize: new kakao.maps.Size(21, 490),
                    spriteOrigin: new kakao.maps.Point(0, idx * 33 + 1),
                    offset: {
                      x: 10,
                      y: 15,
                    },
                  },
                }}
                clickable={true}
              ></MapMarker>
            );
          })}

          <Polyline
            path={latlngArr}
            strokeWeight={2} // 선의 두께 입니다
            strokeColor={`black`} // 선의 색깔입니다
            strokeOpacity={1} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle={"solid"} // 선의 스타일입니다
          />
        </Map>
      </MapContainer>
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
              <FixedTime>
                {hour}: {minute}
              </FixedTime>
            </Timediv>
            <Contentdiv>
              <div>
                <h4>{p.placeName}</h4>
                <img
                  alt="menu"
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
                <a href={p.placeInfoUrl} target="_blank">
                  {p.placeName} 바로가기
                </a>
              </span>

              <textarea
                id={placeKey[idx]}
                // onBlur={mouseleave}
                isitwork={dayNow}
                value={p.placeMemo}
                placeholder="친구에게 메모가 실시간으로 공유됩니다!"
                maxLength={"150"}
                onClick={() => {
                  setHamburgerNum(null);
                }}
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
          </PlaceCard>
        );
      })}
      <ModalfixTime
        open={deleteModalOpen}
        close={closeDeleteModal}
        onSubmitClick={realDeleteBtn}
        btnstyle="del"
        header={
          <TimeModal>
            <DeleteClickedDiv>
              <span>계획을 삭제하시겠습니까?</span>
            </DeleteClickedDiv>
          </TimeModal>
        }
      ></ModalfixTime>
      <ModalfixTime
        open={modalOpen}
        close={closeModal}
        onSubmitClick={clickEditTime}
        header={
          <TimeModal>
            <h4>수정하기</h4>
            <span style={{ color: "#8D8D8D", fontFamily: "apple1" }}>
              DAY{dayNow}
            </span>
            <TimeEditdiv>
              <span>방문 시간</span>
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
            </TimeEditdiv>
          </TimeModal>
        }
      ></ModalfixTime>
    </Container>
  );
};

const TimeEditdiv = styled.div`
  width: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
  span {
    width: 100px;
    margin-right: 50px;
  }
  div {
    select {
      border: none;
      font-size: 16px;
      margin-left: 5px;
    }
  }
`;

const FixedTime = styled.span`
  font-size: 14px;
  margin-left: -3px;
  font-family: "apple1";
  margin-top: 2px;
`;

const MapContainer = styled.div`
  padding: 5px 10px;
`;

const DayBtn = styled.button`
  border: none;
  background-color: inherit;
  font-size: 16px;
  border-bottom: ${(props) =>
    props.idx + 1 === props.daynow ? `3px solid #56BE91` : null};
  color: ${(props) => (props.idx + 1 === props.daynow ? "black" : "#8D8D8D")};
  cursor: pointer;
`;

const DeleteClickedDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    background-color: ${({ theme }) => theme.colors.mainRed};
    color: white;
    width: 30px;
  }
`;

const ToggleBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  border-radius: 5px;
  position: absolute;
  background-color: white;
  right: 24px;
  top: 10px;
  border: 1px solid #ececec;
  box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  div {
    padding: 8px;
    font-size: 14px;
    &:first-child {
      border-bottom: 1px solid #ececec;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const NumColumnBar = styled.span`
  width: 2px;
  height: 110px;
  background-color: ${({ theme }) => theme.colors.borderColor};
  position: absolute;
  top: 20px;
`;

const Timediv = styled.div`
  width: 22%;
  display: flex;
  padding-left: 15px;
  padding-top: 5px;
  div {
    background-color: #ff6442;
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
  span {
  }
`;
const Contentdiv = styled.div`
  width: 78%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  margin-left: 10px;
  position: relative;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      height: 20px;
      margin-top: 4px;
      margin-right: 10px;
      cursor: pointer;
    }
    h4 {
      font-size: 16px;
      margin-top: 4px;
    }
  }
  textarea {
    width: 95%;
    outline: none;
    border-radius: 5px;
    font-size: 15px;
    resize: none;
    padding: 3px 7px;
    &::placeholder {
      color: ${({ theme }) => theme.colors.text3};
    }
  }
  span {
    color: ${({ theme }) => theme.colors.text2};
    font-size: 12px;
    margin: 3px 0px;
    font-family: "apple1";
    a {
      font-family: "apple2";
      color: #3d75cc;
      text-decoration: none;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const PlaceCard = styled.div`
  display: flex;
  flex-direction: row;
  width: 94%;
  margin: auto;
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  position: relative;
  button {
    border: none;
    background-color: ${({ theme }) => theme.colors.mainGreen};
    margin-top: 5px;
    margin-bottom: 10px;
    font-size: 18px;
    color: white;
    width: 100px;
    border-radius: 15px;
    height: 30px;
  }
  span {
    font-size: 20px;
    font-family: "apple3";
  }
  img {
    height: 30px;
  }
`;

const DayBtndiv = styled.div`
  display: flex;
  justify-content: space-around;
`;

const TimeModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    &:first-child {
      width: 80%;
      display: flex;
      justify-content: space-between;
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
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }
`;

export default Schedule;
