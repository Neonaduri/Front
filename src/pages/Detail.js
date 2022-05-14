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
  const reviewList = useSelector((state) => state.review.reviewList);
  const totalCnt = useSelector((state) => state.review.totalElements);

  const [dayNow, setDayNow] = useState(1);
  const arr = reviewList.slice(0, 3);
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

      <Line></Line>

      {/* 리뷰페이지입니다 */}
      <ReviewBox>
        <h2>
          리뷰<span>({totalCnt})</span>
        </h2>
        <img
          src={addMore}
          onClick={() => {
            history.push(`${postId}/write`);
          }}
        ></img>
      </ReviewBox>

      <ReviewPage>
        {arr &&
          arr.map((item, id) => {
            return <ReviewList key={id} {...item} totalCnt={totalCnt} />;
          })}
      </ReviewPage>
    </>
  );
};

const DayBtnDiv = styled.div`
  z-index: 2;
  display: flex;
  width: 100%;
  justify-content: space-around;
  top: 340px;
  button {
    display: block;
    width: 50px;
    background-color: #41b67e;
    border: none;
    border-radius: 10px;
    padding: 3px 5px;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 10px;
  background: #f5f5f5;
  margin: 20px 0;
`;

const ReviewPage = styled.div`
  justify-content: center;
  align-items: center;
`;

const ReviewBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 26px;
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
