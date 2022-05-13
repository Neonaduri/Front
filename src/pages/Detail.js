import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import MapDetail from "../components/detail/MapDetail";
import { planAction } from "../redux/module/plan";
import styled from "styled-components";
import ScheduleDetail from "../components/detail/ScheduleDetail";
import ReviewList from "../components/review/ReviewList";
import Footer from "../components/common/Footer";
import addMore from "../static/images/button/addMore.png";

const Detail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const postId = params.id;
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
    <>
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
      {/* 리뷰페이지입니다 */}
      <ReviewBox>
        <h2>
          리뷰<span>(120)</span>
        </h2>
        <img
          src={addMore}
          onClick={() => {
            history.push(`${postId}/write`);
          }}
        ></img>
      </ReviewBox>
      <ReviewList />
      <Footer />
    </>
  );
};

const DayBtnDiv = styled.div`
  z-index: 2;
  display: flex;
  width: 100%;
  justify-content: space-around;
  position: absolute;
  button {
    display: block;
    width: 50px;
    background-color: #41b67e;
    border: none;
    border-radius: 10px;
    padding: 3px 5px;
  }
`;

const ReviewBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 14px;
  margin-top: 20px;
  width: 100%;
  height: 18px;

  display: flex;
  h2 {
    font-weight: 700;
    font-size: 18px;
    line-height: 18px;
    color: #363636;

    span {
      margin-left: 4px;
    }
  }
`;

export default Detail;
