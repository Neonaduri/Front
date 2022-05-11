import React, { useRef, useState } from "react";
import { area, theme } from "../components/elements/ArrValue";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import { ko } from "date-fns/esm/locale";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useDispatch, useSelector } from "react-redux";
import { planAction } from "../redux/module/plan";
import { useHistory } from "react-router";
import goRight from "../static/images/icon/goRight.png";
import calender from "../static/images/icon/calender.png";
import Sheet from "react-modal-sheet";
import styled from "styled-components";
import Titleline from "../components/elements/Titleline";
import backicon from "../static/images/icon/back.png";

const Calendar = () => {
  const history = useHistory();
  const moment = require("moment");
  const dispatch = useDispatch();
  const titleRef = useRef();
  const areaRef = useRef();
  const themeRef = useRef();
  const userInfo = useSelector((state) => state.user.list);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  const startDateRef = state[0].startDate;
  const startDate = moment(startDateRef).format("YYYY-MM-DD");
  const endDateRef = state[0].endDate;
  const endDate = moment(endDateRef).format("YYYY-MM-DD");
  const dateCnt =
    (endDateRef.getTime() - startDateRef.getTime()) / (1000 * 3600 * 24) + 1;
  const [isOpen, setOpen] = React.useState(false);
  const open = () => setOpen(true);
  const close = () => setOpen(false);

  const createBtnClick = () => {
    const title = titleRef.current.value;
    const location = areaRef.current.value;
    const theme = themeRef.current.value;

    dispatch(
      planAction.createRoomDB(
        title,
        location,
        theme,
        startDate,
        endDate,
        dateCnt
      )
    );
  };

  const daynum = moment(startDateRef).day();
  const today = days[daynum];
  const nextday = days[daynum + 1];

  const token = localStorage.getItem("token");
  if (!token) {
    history.push("/login");
  }
  return (
    <>
      <Titlediv>
        <img src={backicon} onClick={() => history.goBack()} />
        <Titleline title={"새로운 계획 등록"} />
      </Titlediv>
      <Container>
        <PostTitlediv>
          <label htmlFor="title">여행명</label>
          <input
            id="title"
            ref={titleRef}
            placeholder="여행 계획명을 작성해주세요."
          ></input>
        </PostTitlediv>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "30px",
          }}
        >
          <Locationdiv>
            <label htmlFor="area">지역</label>
            <select id="area" ref={areaRef}>
              {area.map((v, i) => {
                return <option key={i}>{v}</option>;
              })}
            </select>
          </Locationdiv>
          <Themediv>
            <label htmlFor="theme">테마</label>
            <select id="theme" ref={themeRef}>
              {theme.map((v, i) => {
                return <option key={i}>{v}</option>;
              })}
            </select>
          </Themediv>
        </div>

        <Datediv>
          <span>날짜선택</span>
          <div onClick={open}>
            <img src={calender} style={{ height: "35px" }} />
            <span>
              {startDate}({today}) ~ {endDate}({nextday})
            </span>
            <img src={goRight} style={{ height: "18px" }} />
          </div>
          <CustomSheet
            rootId="root"
            isOpen={isOpen}
            onClose={close}
            snapPoints={[600, 400, 100, 0]}
          >
            <Sheet.Container>
              <Sheet.Header />
              <Sheet.Content>
                <DateRange
                  locale={ko}
                  editableDateInputs={true}
                  onChange={(item) => setState([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={state}
                  months={2}
                  direction="vertical"
                  rangeColors={["#62ce8b"]}
                  showDateDisplay={false}
                  color={"#333333"}
                />
                <FixdateBtn onClick={close}>날짜 확정</FixdateBtn>
              </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop />
          </CustomSheet>
        </Datediv>
        <Buttondiv>
          <button onClick={createBtnClick}>방만들기</button>
        </Buttondiv>
      </Container>
    </>
  );
};

const Buttondiv = styled.div`
  button {
    width: 100%;
    background-color: #62ce8b;
    border: none;
    border-radius: 5px;
    padding: 10px 0px;
    color: white;
    font-size: 16px;
    margin-top: -20px;
  }
`;

const Datediv = styled.div`
  display: flex;
  flex-direction: column;
  div {
    border: 1px solid #cacaca;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3px 5px;
  }
`;

const Themediv = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  select {
    width: 100%;
    font-size: 16px;
    border: 1px solid #cacaca;
    border-radius: 7px;
    padding: 5px 3px;
  }
`;

const Locationdiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  select {
    width: 100%;
    font-size: 16px;
    border: 1px solid #cacaca;
    border-radius: 5px;
    padding: 5px 3px;
  }
`;

const PostTitlediv = styled.div`
  display: flex;
  flex-direction: column;
  input {
    width: 100%;
    margin: auto;
    border: none;
    border-bottom: 1px solid #cacaca;
    height: 34px;
    font-size: 16px;
    &:focus {
      outline: none;
      border-bottom: 1px solid #62ce8b;
    }
  }
`;

const Container = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
  div {
    margin-bottom: 40px;
  }
`;

const Titlediv = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 10px;
  div {
    margin: auto;
    padding-left: 10px;
  }
`;

const FixdateBtn = styled.button`
  background-color: #62ce8b;
  width: 90%;
  height: 30px;
  margin-top: -10px;
  border: none;
  border-radius: 7px;
  color: white;
`;

const CustomSheet = styled(Sheet)`
  .react-modal-sheet-backdrop {
  }
  .react-modal-sheet-container {
    /* custom styles */
  }
  .react-modal-sheet-header {
  }
  .react-modal-sheet-drag-indicator {
    /* custom styles */
  }
  .react-modal-sheet-content {
    margin: auto;
    margin-top: -15px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export default Calendar;
