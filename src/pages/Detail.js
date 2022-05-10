import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import MapDetail from "../components/detail/MapDetail";
import { planAction } from "../redux/module/plan";
import styled from "styled-components";
import ScheduleDetail from "../components/detail/ScheduleDetail";

const Detail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const postId = params.postId;
  const dayCnt = useSelector((state) => state.plan.detailPlan.dateCnt);
  const [dayNow, setDayNow] = useState(1);

  let dateCntArr = [];
  for (let i = 1; i <= dayCnt; i++) {
    dateCntArr.push(i);
  }

  useEffect(() => {
    dispatch(planAction.getDetailPlanDB(postId));
  }, []);
  return (
    <div>
      <DayBtnDiv>
        {dateCntArr.map((date, idx) => {
          return (
            <button
              key={idx}
              onClick={() => {
                setDayNow(date);
              }}
            >
              {date}일차
            </button>
          );
        })}
      </DayBtnDiv>

      <MapDetail dayNow={dayNow} />
      <ScheduleDetail dayNow={dayNow} />
    </div>
  );
};

const DayBtnDiv = styled.div`
  z-index: 2;
  display: flex;
  width: 100%;
  justify-content: space-around;
  position: absolute;
  top: 340px;
  button {
    display: block;
    width: 50px;
    background-color: #62ce8b;
    border: none;
    border-radius: 10px;
    padding: 3px 5px;
  }
`;

export default Detail;
