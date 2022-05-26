import React, { useRef, useState } from "react";
import { area, theme } from "../components/elements/ArrValue";
import { DateRange } from "react-date-range";
import { addDays, isToday } from "date-fns";
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
import useInput from "../components/hooks/useInput";
import Button from "../components/elements/Button";

const Calendar = () => {
  const history = useHistory();
  const moment = require("moment");
  const dispatch = useDispatch();
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
  const title = useInput();

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
    const location = locationInBtn;
    const theme = themeInBtn;
    if (dateCnt > 7) {
      alert("날짜는 최대 7일입니다! 🤗");
      return;
    }
    if (title.value.length < 2) {
      alert("여행명을 상세히 입력해주세요! 🤗");
      return;
    }
    if (title.value.length > 30) {
      alert("여행명은 최대 30자까지 가능합니다! 🤗");
      return;
    }
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
        <img src={backicon} onClick={() => history.goBack()} alt="back" />
        <Titleline title={"새로운 계획 등록"} />
      </Titlediv>
      <Container>
        <PostTitlediv>
          <label htmlFor="title">여행명</label>
          <input
            placeholder="여행 계획명을 작성해주세요."
            {...title}
            id="title"
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
              <img src={goRight} alt="menu" />
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
              <img src={goRight} alt="menu" />
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
            <img src={calender} style={{ height: "35px" }} alt="calender" />
            <span>
              {startDate}({today}) ~ {endDate}({endday})
            </span>
            <img src={goRight} style={{ height: "16px" }} alt="go" />
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
                  minDate={new Date()}
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
        <div>
          <Button content={"방만들기"} onClick={createBtnClick} />
        </div>
      </Container>
    </>
  );
};

const Locationselect = styled.div`
  font-size: 20px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  width: 250px;
  text-align: center;
  padding: 5px 0px;
  margin: 5px 0px;
  border-radius: 14px;
  transition: 0.2s;
  &:active {
    background-color: ${({ theme }) => theme.colors.mainGreen};
    color: white;
  }
`;

const Datediv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -30px;
  span {
    &:first-child {
      font-family: "apple1";
    }
  }
  div {
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3px 5px;
    cursor: pointer;
  }
`;

const Themediv = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  label {
    font-family: "apple1";
  }
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 4px;
    border: 1px solid ${({ theme }) => theme.colors.text3};
    border-radius: 8px;
    cursor: pointer;
    img {
      width: 14px;
    }
  }
`;

const Locationdiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  label {
    font-family: "apple1";
  }
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 4px;
    border: 1px solid ${({ theme }) => theme.colors.text3};
    border-radius: 8px;
    cursor: pointer;
    img {
      width: 14px;
    }
  }
`;

const PostTitlediv = styled.div`
  display: flex;
  flex-direction: column;
  label {
    font-family: "apple1";
  }
  input {
    width: 100%;
    margin: auto;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
    height: 34px;
    font-size: 16px;
    &:focus {
      outline: none;
      border-bottom: 1px solid ${({ theme }) => theme.colors.mainGreen};
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
  img {
    width: 22px;
    margin-top: 8px;
  }
`;

const FixdateBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.mainGreen};
  width: 90%;
  height: 30px;
  margin-top: -10px;
  border: none;
  border-radius: 7px;
  color: white;
  cursor: pointer;
`;

const CustomSheet = styled(Sheet)`
  max-width: 375px;
  margin: auto;
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
