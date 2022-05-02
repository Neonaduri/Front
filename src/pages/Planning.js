import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import Schedule from "../components/planning/Schedule";
import { planAction } from "../redux/module/plan";
import MappartR from "../components/planning/MappartR";

const Planning = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const postId = params.postId;
  const dateCnt = useSelector((state) => state.plan.list.dateCnt);
  const [dayNow, setDayNow] = useState(1);

  let dateCntArr = [];
  for (let i = 1; i <= dateCnt; i++) {
    dateCntArr.push(i);
  }

  useEffect(() => {
    dispatch(planAction.getRoomDB(postId));
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
      <MappartR dayNow={dayNow} />
      <Schedule dayNow={dayNow} />
    </div>
  );
};

const DayBtnDiv = styled.div`
  z-index: 2;
  display: flex;
  width: 100%;
  justify-content: space-around;
  position: absolute;
  top: 30px;
  button {
    display: block;
    width: 50px;
    background-color: white;
    border: none;
    border-radius: 10px;
    padding: 3px 5px;
  }
`;
export default Planning;
