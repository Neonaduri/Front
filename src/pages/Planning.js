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
import Footer from "../components/common/Footer";
import Logo from "../static/images/logo/Logo.png";

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
        snapPoints={[730, 500, 100, 0]}
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
  height: 12%;
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
    bottom: 60px;
    z-index: 9999;
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
  top: 9.3vh;
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
`;

export default Planning;
