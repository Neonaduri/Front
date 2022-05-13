import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getCommentDB } from "../../redux/module/review";

const ReviewList = () => {
  const params = useParams();
  const postId = params.id;
  const reviewList = useSelector((state) => state.review.reviewList);
  const dispatch = useDispatch();

  console.log(postId);

  // 리뷰조회;
  useEffect(() => {
    dispatch(getCommentDB(postId));
  }, []);

  return (
    <>
      <h1>gkdl</h1>
    </>
  );
};

export default ReviewList;
