import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import Schedule from "../components/planning/Schedule";
import Helmet from "react-helmet";
import { planAction } from "../redux/module/plan";
import MappartR from "../components/planning/MappartR";
import SubmitBtn from "../components/planning/SubmitBtn";
import moment from "moment";
import Sheet from "react-modal-sheet";
import Footer from "../components/common/Footer";
import { getDatabase, ref, onValue, onChildAdded } from "firebase/database";
import NopostAlert from "../components/myplan/NopostAlert";
import "../assets/editingMemo.css";

const Planning = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const postId = params.postId;
  const dateCnt = useSelector((state) => state.plan.list.dateCnt);
  const planInfo = useSelector((state) => state.plan.list);
  const [dayNow, setDayNow] = useState(1);
  const [closeRoom, setCloseRoom] = useState(false);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const db = getDatabase();

  let dateCntArr = [];
  for (let i = 1; i <= dateCnt; i++) {
    dateCntArr.push(i);
  }

  //방 폭파 기능
  useEffect(() => {
    dispatch(planAction.getRoomDB(postId));
    const fixedPlanRef = ref(db, `${postId}`);
    const value = onValue(fixedPlanRef, (snapshot) => {
      let fixedPlan = snapshot.val();
      if (fixedPlan === null) {
        setCloseRoom(true);
      }
    });

    return () => value();
  }, []);

  useEffect(() => {
    const addedRef = ref(db, `${postId}/allPlan/day${dayNow}`);
    const added = onChildAdded(addedRef, (data) => {
      const addedText = document.getElementById("addalert");
      setClickable(true);
      addedText.classList.add("added");

      setTimeout(() => {
        addedText.classList.remove("added");
      }, 3000);
    });
    return () => added();
  }, [dayNow]);

  const startDaynum = moment(planInfo.startDate).day();
  const startDay = days[startDaynum];
  const endDaynum = moment(planInfo.endDate).day();
  const endDay = days[endDaynum];
  const [clickable, setClickable] = useState(false);
  const [isOpen, setOpen] = React.useState(false);

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  if (closeRoom) {
    return (
      <NopostAlert
        firstContent={"이미 완성되었거나"}
        secondContent={" 존재하지 않는 방입니다! 🤗"}
        btnContent={"홈으로 돌아가기"}
        pushUrl={"/"}
      />
    );
  }

  return (
    <Container>
      <Helmet>
        <title>너나들이 | 계획세우기</title>
      </Helmet>
      <DayBtnDiv>
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
      </DayBtnDiv>
      <MappartR
        dayNow={dayNow}
        startDay={startDay}
        endDay={endDay}
        clickable={clickable}
      />
      <CustomSheet
        rootId="root"
        isOpen={isOpen}
        onClose={close}
        snapPoints={[0.9, 500, 100, 0]}
        disableDrag={true}
      >
        <Sheet.Container>
          <Sheet.Content>
            <Schedule daynow={dayNow} setopen={setOpen} />
            <SubmitBtn dateCnt={dateCnt} />
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </CustomSheet>
      <TriggerBtn onClick={open} clickable={clickable}>
        <div
          onClick={() => {
            setClickable(true);
          }}
        >
          Click!
        </div>
        <span id="addalert">일정이 추가되었습니다! ✈️</span>
      </TriggerBtn>
      {/* <Footer /> */}
    </Container>
  );
};

const CustomSheet = styled(Sheet)`
  max-width: 375px;
  margin: auto;

  .react-modal-sheet-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const Container = styled.div`
  position: relative;
  height: 100%;
`;

const TriggerBtn = styled.button`
  background-color: white;
  width: 100%;
  border: none;
  height: ${(props) => (props.clickable ? "63px" : "93px")};
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  position: absolute;
  bottom: 0px;
  z-index: 10;
  div {
    &:first-child {
      position: absolute;
      width: 80px;
      height: 38px;
      background-color: ${({ theme }) => theme.colors.mainGreen};
      border-radius: 20px;
      border: 3px solid white;
      bottom: ${(props) => (props.clickable ? "40px" : "70px")};
      z-index: 9999;
      cursor: pointer;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }
    &:last-child {
      display: flex;
      flex-direction: column;
    }
  }
`;

const DayBtnDiv = styled.div`
  z-index: 3;
  display: flex;
  width: 100%;
  justify-content: space-around;
  position: absolute;
  top: 9vh;
`;

const DayBtn = styled.button`
  display: block;
  width: 55px;
  background-color: white;
  border: none;
  padding: 3px 5px;
  color: ${({ theme }) => theme.colors.text2};
  font-size: 16px;
  border-bottom: ${(props) =>
    props.idx + 1 === props.daynow ? `3px solid #56BE91` : null};
  color: ${(props) => (props.idx + 1 === props.daynow ? "black" : "#8D8D8D")};
  cursor: pointer;
`;

export default Planning;
