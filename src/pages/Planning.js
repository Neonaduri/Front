import React, { useEffect, useState } from "react";
import styled from "styled-components";
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
import Logo from "../static/images/logo/Logo.png";
import { getDatabase, ref, onValue } from "firebase/database";
import NopostAlert from "../components/myplan/NopostAlert";

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

  const startDaynum = moment(planInfo.startDate).day();
  const startDay = days[startDaynum];
  const endDaynum = moment(planInfo.endDate).day();
  const endDay = days[endDaynum];

  const [isOpen, setOpen] = React.useState(false);

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  if (closeRoom) {
    return (
      <NopostAlert
        mainContent={"이미 완성되었거나, 존재하지 않는 방입니다! 🤗"}
        btnContent={"너나들이 하기"}
        pushUrl={"/"}
      />
    );
  }

  return (
    <Container>
      <Helmet>
        <title>너나들이 | 계획세우기</title>
        <meta property="og:title" content="너나들이 베타테스트 체험 이벤트!" />
        <meta
          property="og:description"
          content="친구와 함께 실시간으로 여행계획을 세우고 공유해보세요!"
        />
        <meta
          property="og:image"
          content="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FuWMdv%2FbtrCxGqdv8X%2FhZa6JjCDY8iJHGd685Lr9K%2Fimg.png"
        />
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
      <MappartR dayNow={dayNow} startDay={startDay} endDay={endDay} />
      <CustomSheet
        rootId="root"
        isOpen={isOpen}
        onClose={close}
        snapPoints={[0.9, 500, 100, 0]}
        disableDrag={true}
      >
        <Sheet.Container>
          <Sheet.Header onClick={close} />
          <Sheet.Content>
            <Schedule daynow={dayNow} />
            <SubmitBtn dateCnt={dateCnt} />
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </CustomSheet>
      <TriggerBtn onClick={open}>
        <div>
          <img src={Logo} />
        </div>
      </TriggerBtn>
      <Footer />
    </Container>
  );
};
const CustomSheet = styled(Sheet)`
  max-width: 375px;
  margin: auto;
  .react-modal-sheet-backdrop {
  }

  .react-modal-sheet-container {
  }
  .react-modal-sheet-header {
  }
  .react-modal-sheet-drag-indicator {
  }
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
  height: 93px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  position: absolute;
  bottom: 0px;
  z-index: 10;
  div {
    position: absolute;
    width: 38px;
    height: 38px;
    background-color: ${({ theme }) => theme.colors.mainGreen};
    border-radius: 50%;
    border: 3px solid white;
    bottom: 70px;
    z-index: 9999;
    cursor: pointer;
    img {
      margin-top: 6px;
      width: 20px;
      height: 20px;
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
  color: ${(props) => (props.idx + 1 === props.daynow ? "black" : null)};
  cursor: pointer;
`;

export default Planning;
