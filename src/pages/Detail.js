import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import ScheduleDetail from "../components/detail/ScheduleDetail";
import MapDetail from "../components/detail/MapDetail";
import { planAction } from "../redux/module/plan";
import styled from "styled-components";
import ReviewList from "../components/review/ReviewList";
import addMore from "../static/images/button/addMore.png";
import back from "../static/images/icon/back.png";
import Titleline from "../components/elements/Titleline";
import wish from "../static/images/icon/wish2x.png";
import wishgreen from "../static/images/icon/wishGreen.png";

const Detail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const postId = params.id;
  const detailPlan = useSelector((state) => state.plan.detailPlan);
  const dayCnt = useSelector((state) => state.plan.detailPlan.dateCnt);
  const reviewList = useSelector((state) => state.review.reviewList);
  const totalCnt = useSelector((state) => state.review.totalElements);
  const [dayNow, setDayNow] = useState(1);
  const arr = reviewList.slice(0, 3);

  let dateCntArr = [];
  for (let i = 1; i <= dayCnt; i++) {
    dateCntArr.push(i);
  }

  const clickWishBtn = () => {
    dispatch(planAction.clickWishDetailPostDB(postId));
  };

  useEffect(() => {
    dispatch(planAction.getDetailPlanDB(postId));
  }, []);
  console.log(detailPlan.islike);
  return (
    <Container>
      <HeadDiv>
        <img
          src={back}
          onClick={() => {
            history.goBack();
          }}
        />
        <Titleline title={detailPlan.postTitle} />
        {detailPlan.islike ? (
          <img src={wishgreen} onClick={clickWishBtn} />
        ) : (
          <img src={wish} onClick={clickWishBtn} />
        )}
      </HeadDiv>
      <ImageDiv>
        <img src={detailPlan.postImgUrl} />
      </ImageDiv>
      <ContentDiv>
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
        <div>
          <MapDetail dayNow={dayNow} />
        </div>
        <div>
          <ScheduleDetail dayNow={dayNow} />
        </div>
      </ContentDiv>

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
    </Container>
  );
};

const DayBtnDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  padding: 8px 0px;
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

const ContentDiv = styled.div`
  width: 100%;
  background-color: white;
  height: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  position: absolute;
  top: 215px;
`;

const ImageDiv = styled.div`
  width: 100%;
  img {
    width: 100%;
  }
`;

const HeadDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 18px;
  margin-top: 5px;
  img {
    margin-bottom: -7px;
  }
`;

const Container = styled.div`
  position: relative;
`;

const Line = styled.div`
  width: 100%;
  height: 10px;
  background: ${({ theme }) => theme.colors.borderColor};
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
    color: ${({ theme }) => theme.colors.text1};

    span {
      margin-left: 4px;
    }
  }
`;

export default Detail;
