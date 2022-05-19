import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import { getCommentDB } from "../../redux/module/review";

const ReviewList = ({ nickName, reviewContents, reviewImgUrl, totalCnt }) => {
  const params = useParams();
  const postId = params.id;
  const dispatch = useDispatch();

  // console.log(totalCnt);
  // 리뷰조회;
  useEffect(() => {
    dispatch(getCommentDB(postId));
  }, []);

  //상세페이지 아래에 있는 리뷰페이지
  return (
    <Container>
      <Nickname>{nickName}</Nickname>
      <Box>
        {reviewImgUrl ? <Img src={reviewImgUrl}></Img> : null}
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

const Nickname = styled.div`
  font-family: "Apple SD Gothic Neo";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #363636;
  margin-bottom: 10px;
  margin-left: 10px;
`;

const Box = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

const Text = styled.div`
  width: 206px;
  object-fit: cover;
  border-radius: 5px;
  margin-left: 10px;
  color: #363636;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-family: "Apple SD Gothic Neo";
`;
