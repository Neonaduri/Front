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
import downbtn from "../static/images/icon/downbtn.png";

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
  const [locationInBtn, setLocationInBtn] = useState("서울");
  const [themeInBtn, setThemeInBtn] = useState("액티비티");

  const startDateRef = state[0].startDate;
  const startDate = moment(startDateRef).format("YYYY-MM-DD");
  const endDateRef = state[0].endDate;
  const endDate = moment(endDateRef).format("YYYY-MM-DD");
  const dateCnt =
    (endDateRef.getTime() - startDateRef.getTime()) / (1000 * 3600 * 24) + 1;
  const [isOpen, setOpen] = React.useState(false);
  const [isOpenLoca, setOpenLoca] = React.useState(false);
  const [isOpenTheme, setOpenTheme] = React.useState(false);
  const open = () => setOpen(true);
  const openLoca = () => {
    setOpenLoca(true);
    setOpenTheme(false);
  };
  const openTheme = () => {
    setOpenTheme(true);
    setOpenLoca(false);
  };
  const close = () => setOpen(false);
  const closeLoca = () => setOpenLoca(false);
  const closeTheme = () => setOpenTheme(false);

  const createBtnClick = () => {
    const title = titleRef.current.value;
    const location = locationInBtn;
    const theme = themeInBtn;
    if (dateCnt > 7) {
      alert("날짜는 최대 7일입니다! 🤗");
      return;
    }
    if (title.length < 2) {
      alert("여행명을 상세히 입력해주세요! 🤗");
      return;
    }
    // sessionStorage.setItem("roomNick", userInfo.nickName);
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

  const clickLocationSelect = (e) => {
    const fixedLocation = e.target.innerText;
    setLocationInBtn(fixedLocation);
    closeLoca();
  };
  const clickThemeSelect = (e) => {
    const fixedTheme = e.target.innerText;
    setThemeInBtn(fixedTheme);
    closeTheme();
  };

  const todaynum = moment(startDateRef).day();
  const today = days[todaynum];
  const enddaynum = moment(endDateRef).day();
  const endday = days[enddaynum];

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
            <div onClick={openLoca}>
              <span>{locationInBtn}</span>
              <img src={downbtn} />
            </div>
            <CustomSheet
              rootId="root"
              isOpen={isOpenLoca}
              onClose={closeLoca}
              initialSnap={1}
              snapPoints={[600, 500, 100, 0]}
            >
              <Sheet.Container>
                <Sheet.Header onClick={() => setOpenLoca(false)} />
                <Sheet.Content>
                  {area.map((v, i) => {
                    return (
                      <Locationselect
                        key={i}
                        onClick={(e) => clickLocationSelect(e)}
                      >
                        {v}
                      </Locationselect>
                    );
                  })}
                </Sheet.Content>
              </Sheet.Container>
              <Sheet.Backdrop />
            </CustomSheet>
          </Locationdiv>
          <Themediv>
            <label htmlFor="theme">테마</label>
            <div onClick={openTheme}>
              <span>{themeInBtn}</span>
              <img src={downbtn} />
            </div>
            <CustomSheet
              rootId="root"
              isOpen={isOpenTheme}
              onClose={closeTheme}
              initialSnap={1}
              snapPoints={[500, 400, 100, 0]}
            >
              <Sheet.Container>
                <Sheet.Header onClick={() => setOpenTheme(false)} />
                <Sheet.Content>
                  {theme.map((v, i) => {
                    return (
                      <Locationselect
                        key={i}
                        onClick={(e) => clickThemeSelect(e)}
                      >
                        {v}
                      </Locationselect>
                    );
                  })}
                </Sheet.Content>
              </Sheet.Container>
              <Sheet.Backdrop />
            </CustomSheet>
          </Themediv>
        </div>

        <Datediv>
          <span>날짜선택</span>
          <div onClick={open}>
            <img src={calender} style={{ height: "35px" }} />
            <span>
              {startDate}({today}) ~ {endDate}({endday})
            </span>
            <img src={goRight} style={{ height: "18px" }} />
          </div>
          <CustomSheet
            rootId="root"
            isOpen={isOpen}
            onClose={close}
            snapPoints={[400, 400, 100, 0]}
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
                  months={1}
                  direction="vertical"
                  rangeColors={["#41B67E"]}
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

const Locationselect = styled.div`
  font-size: 20px;
  border: 1px solid #cacaca;
  width: 250px;
  text-align: center;
  padding: 5px 0px;
  margin: 5px 0px;
  border-radius: 14px;
  transition: 0.2s;
  &:active {
    background-color: #41b67e;
    color: white;
  }
`;

const Buttondiv = styled.div`
  button {
    width: 100%;
    background-color: #41b67e;
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
  margin-top: -30px;
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
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 4px;
    border: 1px solid #cacaca;
    border-radius: 8px;
    img {
      width: 12px;
    }
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
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 4px;
    border: 1px solid #cacaca;
    border-radius: 8px;
    img {
      width: 12px;
    }
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
      border-bottom: 1px solid #41b67e;
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
  background-color: #41b67e;
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
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export default Calendar;
