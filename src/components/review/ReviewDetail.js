import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import { addCommentDB, getCommentDB } from "../../redux/module/review";
import Back from "../../static/images/button/back.png";
import ReviewItem from "./ReviewItem";
import Camera from "../../static/images/icon/camera.png";

const ReviewDetail = () => {
  const params = useParams();
  const postId = params.productId;
  const [files, setFiles] = useState();
  const reviewList = useSelector((state) => state.review.reviewList);

  const dispatch = useDispatch();
  const history = useHistory();
  const [reviewValue, setReviewValue] = useState({
    reviewContents: "",
    reviewImgFile: "",
  });

  console.log(postId);

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
    <>
      <ReviewBox>
        <Img
          src={Back}
          onClick={() => {
            history.goBack();
          }}
        ></Img>
        <h2>
          리뷰<span>(120)</span>
        </h2>
      </ReviewBox>

      <Container>
        {reviewList &&
          reviewList.map((item, id) => {
            return <ReviewItem key={id} {...item} />;
          })}
      </Container>

      <ReviewBox>
        <Input
          name="reviewContents"
          type="text"
          placeholder="리뷰를 작성해주세요"
          onChange={onChangeFormValue}
        ></Input>
        <Icon src={Camera}></Icon>
      </ReviewBox>
      <input type="file" accept="image/*" onChange={onImgFile}></input>
      <Button onClick={ReviewBtnClick}>등록</Button>
    </>
  );
};

export default ReviewDetail;

const Input = styled.input`
  width: 273px;
  height: 39px;
  border: 1px solid #cacaca;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 60px;
  height: 39px;
  background: #56be91;
  border-radius: 5px;
  border: 0;
  color: white;
`;

const Icon = styled.img`
  position: relative;
  right: 30px;
  width: 24px;
  height: 24px;
`;

const Container = styled.div`
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  margin-bottom: 90px;
`;

const ReviewBox = styled.div`
  display: flex;
  justify-content: left;

  align-items: center;

  margin-top: 40px;
  margin-left: 30px;

  width: 100%;
  height: 18px;

  display: flex;
  h2 {
    font-weight: 700;
    font-size: 18px;
    line-height: 18px;
    color: #363636;

    span {
      margin-left: 4px;
    }
  }
`;

const Img = styled.img`
  margin-right: 120px;
`;
