import React from "react";
import styled from "styled-components";

const MyReviewCard = ({ review, idx }) => {
  return (
    <ReviewCard key={idx}>
      <span>{review.nickName}</span>
      <span>{review.reviewComment}</span>
    </ReviewCard>
  );
};

const ReviewCard = styled.div`
  span {
    margin-right: 10px;
  }
`;

export default MyReviewCard;
