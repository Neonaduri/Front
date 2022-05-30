import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import ReviewList from "../../components/review/ReviewList";
import { getCommentDB } from "../../redux/module/review";
import goRight from "../../static/images/icon/goRight.png";

const ScheduleDetail = ({ dayNow }) => {
  const history = useHistory();
  const planByDay = useSelector((state) => state.plan?.detailPlan.days);
  const userByDay = useSelector((state) => state.plan?.detailPlan.user);
  const loginUser = useSelector((state) => state.user.list);
  const reviewList = useSelector((state) => state.review.reviewList);
  const totalCnt = useSelector((state) => state.review.totalElements);
  const params = useParams();
  const postId = params.id;
  const arr = reviewList.slice(0, 3);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentDB(postId));
  }, []);

  if (!planByDay) {
    return null;
  }

  const dayPlanPlaces = planByDay[dayNow - 1]?.places;
  if (dayPlanPlaces.length === 0) {
    return (
      <NoPlanContainer>
        <span>이 날은 푹 쉬는날🤗</span>
        <span>확정된 일정이 없습니다.</span>
      </NoPlanContainer>
    );
  }

  return (
    <Container>
      {dayPlanPlaces.map((p, idx) => {
        const planTimeStr = String(p.planTime);
        let hour;
        let minute;
        if (planTimeStr.length === 3) {
          minute = planTimeStr.slice(-2);
          hour = planTimeStr.substring(0, 1);
        } else if (planTimeStr.length === 4) {
          minute = planTimeStr.slice(-2);
          hour = planTimeStr.substring(0, 2);
        } else if (planTimeStr.length === 2) {
          hour = "00";
          minute = planTimeStr;
        } else if (planTimeStr.length === 1) {
          hour = "00";
          minute = "00";
        }

        return (
          <PlaceCard key={idx}>
            <Timediv>
              <div>
                {idx + 1}
                {dayPlanPlaces.length !== idx + 1 ? (
                  <NumColumnBar></NumColumnBar>
                ) : null}
              </div>
              <FixedTime>
                {hour}:{minute}
              </FixedTime>
            </Timediv>
            <Contentdiv>
              <div>
                <h4>{p.placeName}</h4>
                <a href={p.placeInfoUrl} target="_blank">
                  정보보기
                </a>
              </div>
              <span>{p.roadAddress}</span>
              <span>{p.category}</span>

              {userByDay && userByDay.userName === loginUser.userName ? (
                <textarea
                  id={idx}
                  value={p.placeMemo}
                  disabled={true}
                ></textarea>
              ) : null}
            </Contentdiv>
          </PlaceCard>
        );
      })}
      <ReviewBox
        onClick={() => {
          history.push(`${postId}/write`);
        }}
      >
        <h2>댓글({totalCnt})</h2>
        <img src={goRight} alt="go"></img>
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

const ReviewPage = styled.div``;

const ReviewBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 15px;
  width: 100%;
  height: 18px;
  border-top: 10px solid ${({ theme }) => theme.colors.borderColor};
  cursor: pointer;
  h2 {
    font-weight: 700;
    font-size: 18px;
    line-height: 18px;
    color: ${({ theme }) => theme.colors.text1};
    cursor: pointer;
  }
  img {
    width: 28px;
    cursor: pointer;
  }
`;

const NoPlanContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NumColumnBar = styled.span`
  width: 2px;
  height: 110px;
  background-color: ${({ theme }) => theme.colors.borderColor};
  position: absolute;
  top: 20px;
`;

const Contentdiv = styled.div`
  width: 78%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  margin-left: 10px;
  position: relative;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      height: 20px;
      margin-top: 4px;
      margin-right: 10px;
    }
    h4 {
      font-size: 16px;
      margin-top: 4px;
    }
    a {
      font-size: 12px;
      color: black;
      padding-right: 10px;
    }
  }
  textarea {
    margin-top: 15px;
    width: 95%;
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.text3};
    border-radius: 5px;
    font-size: 14px;
    resize: none;
  }
  span {
    color: ${({ theme }) => theme.colors.text2};
    font-size: 12px;
    margin-top: 3px;
  }
`;

const FixedTime = styled.span`
  font-size: 14px;
  margin-left: 3px;
`;

const PlaceCard = styled.div`
  margin-bottom: 1px;
  display: flex;
  padding: 0px 5px;
`;

const Container = styled.div`
  margin-top: 10px;
`;

const Timediv = styled.div`
  width: 22%;
  display: flex;
  padding-left: 15px;
  padding-top: 5px;
  div {
    background-color: #ff6442;
    width: 20px;
    height: 20px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-left: -10px;
    margin-right: 5px;
    position: relative;
  }
`;
export default ScheduleDetail;
