import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const MyReviewCard = () => {
  const myReview = useSelector((state) => state.user.myReview);

  return (
    <>
      {myReview.map((review, idx) => {
        return (
          <ReviewCard key={idx}>
            <span>{review.nickName}</span>
            <span>{review.reviewContents}</span>
          </ReviewCard>
        );
      })}
    </>
  );
};

const ReviewCard = styled.div`
  span {
    margin-right: 10px;
  }
`;

export default MyReviewCard;
