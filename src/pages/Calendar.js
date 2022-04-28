import React, { useState } from "react";
import { area, theme } from "../components/elements/ArrValue";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import { ko } from "date-fns/esm/locale";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
const Calendar = () => {
  const moment = require("moment");
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);
  const startDateRef = state[0].startDate;
  const startDate = moment(startDateRef).format("YYYY-MM-DD");
  const endDateRef = state[0].endDate;
  const endDate = moment(endDateRef).format("YYYY-MM-DD");
  const dayCount =
    (endDateRef.getTime() - startDateRef.getTime()) / (1000 * 3600 * 24) + 1;
  console.log(startDate, endDate, dayCount);
  return (
    <div>
      <div>
        <div>
          <label>여행제목</label>
          <input></input>
        </div>
        <div>
          <label>지역</label>
          <select>
            {area.map((v, i) => {
              return <option key={i}>{v}</option>;
            })}
          </select>
        </div>
        <div>
          <label>테마</label>
          <select>
            {theme.map((v, i) => {
              return <option key={i}>{v}</option>;
            })}
          </select>
        </div>
        <div>
          <span>날짜 선택</span>
          <DateRange
            locale={ko}
            editableDateInputs={true}
            onChange={(item) => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={state}
            months={2}
            direction="vertical"
            rangeColors={["#88e1a5"]}
            showDateDisplay={false}
            color={"#333333"}
          />
        </div>
      </div>
      <div>
        <button>방만들기</button>
      </div>
    </div>
  );
};

export default Calendar;
