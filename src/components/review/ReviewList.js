import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import { addCommentDB, getCommentDB } from "../../redux/module/review";
import ReviewItem from "./ReviewItem";

const ReviewList = () => {
  const params = useParams();
  const postId = params.id;
  const [files, setFiles] = useState();
  const reviewList = useSelector((state) => state.review.reviewList);

  const dispatch = useDispatch();
  const [reviewValue, setReviewValue] = useState({
    reviewContents: "",
    reviewImgFile: "",
  });

  //리뷰조회
  useEffect(() => {
    dispatch(getCommentDB(postId));
  }, []);

  const onImgFile = (e) => {
    const file = e.target.files;
    setFiles(file);
  };

  const onChangeFormValue = (e) => {
    const { name, value } = e.target;

    setReviewValue({
      ...reviewValue,
      [name]: value,
    });
    // console.log(reviewValue);
  };

  const ReviewBtnClick = () => {
    const formdata = new FormData();
    formdata.append("reviewImgFile", files[0]);
    formdata.append("reviewContents", reviewValue.reviewContents);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    // for (let key of formdata.keys()) {
    //   console.log(key);
    // }
    // for (let value of formdata.values()) {
    //   console.log(value);
    // } => 폼데이터 형식확인
    dispatch(addCommentDB(postId, formdata, config));
  };

  return (
    <div>
      <ReviewBox>
        <Input
          name="reviewContents"
          type="text"
          placeholder="리뷰를 작성해주세요 :)"
          onChange={onChangeFormValue}
        ></Input>
        <input type="file" accept="image/*" onChange={onImgFile}></input>
        <button onClick={ReviewBtnClick}>리뷰등록</button>
      </ReviewBox>

      <Container>
        {reviewList &&
          reviewList.map((item, id) => {
            return <ReviewItem key={id} {...item} />;
          })}
      </Container>
    </div>
  );
};

export default ReviewList;

const ReviewBox = styled.div`
  justify-content: center;
  align-items: center;
  margin-left: 40px;
  background-color: #f4f4f4;
  border-radius: 10px;
  padding: 10px;
  margin-top: 20px;
  width: 80%;
`;

const Input = styled.input`
  border: none;
  padding: 15px;
  width: 100%;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Container = styled.div`
  background-color: #f4f4f4;
  border-radius: 10px;
  /* padding: 10px; */
  margin-top: 20px;
  width: 80%;
  margin-left: 40px;
  margin-bottom: 90px; ;
`;
