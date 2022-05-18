import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { userAction } from "../redux/module/user";
import Titleline from "../components/elements/Titleline";
import back from "../static/images/icon/back.png";
import goRight from "../static/images/icon/goRight.png";
import { deleteCommentInMypageDB } from "../redux/module/user";
import Footer from "../components/common/Footer";

const displayedAt = (createdAt) => {
  const milliSeconds = new Date() - createdAt;
  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `방금 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월 전`;
  const years = days / 365;
  return `${Math.floor(years)}년 전`;
};

const MyReview = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const myReview = useSelector((state) => state.user.myReview);

  const deleteBtnClick = (e) => {
    const reviewId = e.target.id;
    dispatch(deleteCommentInMypageDB(reviewId));
  };

  useEffect(() => {
    dispatch(userAction.getMyReviewDB());
  }, []);

  return (
    <Container>
      <HeaderDiv>
        <img
          src={back}
          onClick={() => {
            history.goBack();
          }}
        />
        <Titleline title={"내 댓글 보기"} />
        <div></div>
      </HeaderDiv>
      <BodyDiv>
        {myReview?.map((review, idx) => {
          const writeDate = review.modifiedAt;
          const dateStr = writeDate.substring(0, 16);
          const [date, time] = dateStr.split("T");
          let content;
          if (review.reviewContents.length > 90) {
            content = `${review.reviewContents.substring(0, 90)} ...`;
          } else {
            content = review.reviewContents;
          }
          return (
            <CardContainer key={idx}>
              <CardHeadDiv>
                <small>
                  {date} / {time}
                </small>
                <span onClick={(e) => deleteBtnClick(e)} id={review.reviewId}>
                  삭제
                </span>
              </CardHeadDiv>
              <CardBodyDiv>
                <p>{content}</p>
                {review.reviewImgUrl === null ? null : (
                  <img src={review.reviewImgUrl} />
                )}
              </CardBodyDiv>
              <CardFooterDiv>
                <span
                  onClick={() => {
                    history.push(`/detail/${review.postId}`);
                  }}
                >
                  게시물보기
                </span>
                <img src={goRight} />
              </CardFooterDiv>
            </CardContainer>
          );
        })}
      </BodyDiv>
      <FooterDiv>
        <Footer />
      </FooterDiv>
    </Container>
  );
};
const FooterDiv = styled.div`
  height: 8%;
`;

const BodyDiv = styled.div`
  height: 84%;
  overflow-y: scroll;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const CardFooterDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  span {
    font-size: 12px;
  }
  img {
    width: 12px;
  }
`;

const CardBodyDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0px;
  img {
    width: 96px;
    height: 72px;
    border-radius: 5px;
    object-fit: cover;
  }
  p {
    font-size: 16px;
  }
`;

const CardHeadDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3px;
  small {
    color: ${({ theme }) => theme.colors.text3};
  }
  span {
    background-color: ${({ theme }) => theme.colors.borderColor};
    margin-left: 10px;
    padding: 2px 5px;
    border-radius: 2px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text2};
  }
`;

const CardContainer = styled.div`
  padding: 15px 15px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.borderColor};
`;

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 15px;
  height: 8%;
  img {
    margin-top: 6px;
  }
  div {
    padding-left: 30px;
  }
`;

export default MyReview;
