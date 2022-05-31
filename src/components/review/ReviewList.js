import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import { getCommentDB } from "../../redux/module/review";

const ReviewList = ({
  nickName,
  reviewContents,
  reviewImgUrl,
  totalCnt,
  modifiedAt,
  profileImgUrl,
}) => {
  const params = useParams();
  const postId = params.id;
  const dispatch = useDispatch();

  // 리뷰조회;
  useEffect(() => {
    dispatch(getCommentDB(postId));
  }, []);

  function displayedAt(createdAt) {
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
  }

  const date = new Date(modifiedAt);
  const dateMillisecond = date.getTime() + 3600000 * 9;

  //상세페이지 아래에 있는 리뷰페이지
  return (
    <Container>
      <SocialDiv>
        <img alt="프로필" src={profileImgUrl}></img>
        <span>{nickName}</span>
        <small>{displayedAt(dateMillisecond)}</small>
      </SocialDiv>
      <Box>
        {reviewImgUrl ? <Img src={reviewImgUrl} alt="review"></Img> : null}
        <Text>{reviewContents}</Text>
      </Box>
    </Container>
  );
};

export default ReviewList;

const Container = styled.div`
  padding: 20px 3px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  width: 100%;
`;

const Img = styled.img`
  width: 127px;
  height: 90px;
  object-fit: cover;
  border-radius: 5px;
  margin: 0 10px;
`;

const SocialDiv = styled.div`
  margin-bottom: 10px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
  span {
    margin: 0px 5px;
  }
  small {
    color: ${({ theme }) => theme.colors.text3};
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

const Text = styled.div`
  width: 206px;
  margin-left: 10px;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: normal;
  overflow: hidden;
`;
