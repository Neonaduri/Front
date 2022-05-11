import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteCommentDB } from "../../redux/module/review";

const ReviewItem = ({ reviewImgUrl, reviewContents, nickName, reviewId }) => {
  // const reviewId = useSelector((state) => state.review.reviewList.reviewId);

  const dispatch = useDispatch();
  const deleteBtn = () => {
    dispatch(deleteCommentDB(reviewId));
  };
  return (
    <>
      <Card>
        <ImagePop src={reviewImgUrl} />
        <Content>
          <div>
            <p>{nickName}</p>
            <p>{reviewContents}</p>
          </div>
          <button onClick={deleteBtn}>삭제</button>
          <button>수정</button>
        </Content>
      </Card>
    </>
  );
};

export default ReviewItem;

const Card = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  background-color: #f4f4f4;
  border-radius: 10px;
  padding: 10px;
  /* margin-top: 30px; */
`;

const ImagePop = styled.img`
  border-radius: 10px;
  width: 92px;
  height: 74px;
  object-fit: cover;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #585858;
`;
