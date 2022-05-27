import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import ScheduleDetail from "../components/detail/ScheduleDetail";
import MapDetail from "../components/detail/MapDetail";
import { planAction } from "../redux/module/plan";
import styled from "styled-components";
import back from "../static/images/icon/back.png";
import Titleline from "../components/elements/Titleline";
import wish from "../static/images/icon/wish.png";
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

  return (
    <Container>
      <HeadDiv>
        <img
          alt="back"
          src={back}
          onClick={() => {
            history.goBack();
          }}
        />
        <div>
          <span>{detailPlan.postTitle}</span>
          <Datespan>
            {detailPlan.startDate} ~ {detailPlan.endDate}
          </Datespan>
        </div>
        {detailPlan.islike ? (
          <img src={wishgreen} onClick={clickWishBtn} alt="onwish" />
        ) : (
          <img src={wish} onClick={clickWishBtn} alt="wish" />
        )}
      </HeadDiv>
      <ImageDiv>
        <img src={detailPlan.postImgUrl} alt="postimg" />
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
  cursor: pointer;
`;

const ContentDiv = styled.div`
  width: 100%;
  background-color: white;
  height: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  position: absolute;
  top: 190px;
`;

const ImageDiv = styled.div`
  width: 100%;
  img {
    width: 100%;
  }
`;

const Datespan = styled.span`
  color: ${({ theme }) => theme.colors.text2};
  font-size: 14px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: -20px;
`;

const HeadDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 15px;
  img {
    width: 30px;
    margin-top: 8px;
    cursor: pointer;
    &:last-child {
      width: 37px;
    }
  }
  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      margin: 10px;
      &:first-child {
        font-size: 18px;
        margin-top: 15px;
        margin-bottom: -10px;
        font-family: "apple3";
      }
    }
  }
`;

const Container = styled.div`
  position: relative;
  overflow-y: scroll;
  height: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Detail;
