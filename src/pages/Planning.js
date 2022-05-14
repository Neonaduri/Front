import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import Schedule from "../components/planning/Schedule";
import { planAction } from "../redux/module/plan";
import MappartR from "../components/planning/MappartR";
import SubmitBtn from "../components/planning/SubmitBtn";
import moment from "moment";
import Sheet from "react-modal-sheet";

const Planning = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const postId = params.postId;
  const dateCnt = useSelector((state) => state.plan.list.dateCnt);
  const planInfo = useSelector((state) => state.plan.list);
  const [dayNow, setDayNow] = useState(1);
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  let dateCntArr = [];
  for (let i = 1; i <= dateCnt; i++) {
    dateCntArr.push(i);
  }

  useEffect(() => {
    dispatch(planAction.getRoomDB(postId));
  }, []);

  const startDaynum = moment(planInfo.startDate).day();
  const startDay = days[startDaynum];
  const endDaynum = moment(planInfo.endDate).day();
  const endDay = days[endDaynum];

  const [isOpen, setOpen] = React.useState(false);

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  return (
    <Container>
      <DayBtnDiv>
        {dateCntArr.map((date, idx) => {
          return (
            <button
              key={idx}
              onClick={() => {
                setDayNow(date);
              }}
              idx={idx}
              dayNow={dayNow}
              style={{
                borderBottom: idx + 1 === dayNow ? "3px solid #56BE91" : null,
                color: idx + 1 === dayNow ? "black" : null,
              }}
            >
              DAY {date}
            </button>
          );
        })}
      </DayBtnDiv>
      <MappartR dayNow={dayNow} startDay={startDay} endDay={endDay} />

      <CustomSheet
        rootId="root"
        isOpen={isOpen}
        onClose={close}
        snapPoints={[730, 500, 100, 0]}
        disableDrag={true}
      >
        <Sheet.Container>
          <Sheet.Header onClick={close} />
          <Sheet.Content>
            <Schedule dayNow={dayNow} />
            <SubmitBtn />
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </CustomSheet>
      <TriggerBtn onClick={open}>
        <div></div>
      </TriggerBtn>
    </Container>
  );
};
const CustomSheet = styled(Sheet)`
  .react-modal-sheet-backdrop {
    /* custom styles */
  }
  .react-modal-sheet-container {
    /* custom styles */
  }
  .react-modal-sheet-header {
    /* custom styles */
  }
  .react-modal-sheet-drag-indicator {
    /* custom styles */
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
  height: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  position: absolute;
  bottom: 0px;
  z-index: 10;
  div {
    width: 10%;
    height: 4px;
    border-radius: 2px;
    background-color: #cacaca;
  }
`;

const DayBtnDiv = styled.div`
  z-index: 3;
  display: flex;
  width: 100%;
  justify-content: space-around;
  position: absolute;
  top: 9.5vh;
  button {
    display: block;
    width: 55px;
    background-color: white;
    border: none;
    padding: 3px 5px;
    color: #8d8d8d;
    font-size: 16px;
  }
`;

const Inputdiv = styled.div`
  display: flex;
  flex-direction: column;
  input {
    margin-bottom: 20px;
    width: 200px;
  }
`;
export default Planning;
