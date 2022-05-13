import React, { useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import { addCommentDB, getCommentDB } from "../../redux/module/review";
import Back from "../../static/images/button/back.png";
import ReviewItem from "./ReviewItem";
import Camera from "../../static/images/icon/camera.png";
import underBar from "../../static/images/underBar.png";

const ReviewDetail = () => {
  const params = useParams();
  const postId = params.productId;
  const [files, setFiles] = useState();
  const reviewList = useSelector((state) => state.review.reviewList);
  const totalCnt = useSelector((state) => state.review.totalElements);
  const reviewRef = useRef();
  const [preview, setPreview] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();
  const [reviewValue, setReviewValue] = useState({
    reviewContents: "",
    reviewImgFile: "",
  });

  //이미지 미리보기
  const onImgChange = (e) => {
    const file = e.target.files;
    setFiles(file);

    const reader = new FileReader();
    const imgFile = file[0];
    reader.readAsDataURL(imgFile);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  // const encodeFileToBase64 = (fileBlob) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(fileBlob);
  //   return new Promise((resolve) => {
  //     reader.onload = () => {
  //       setPreview(reader.result);
  //       resolve();
  //     };
  //   });
  // };

  console.log(preview);
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
    //이미지, 텍스트 모두있는경우
    if (files === undefined) {
      const formdata = new FormData();
      formdata.append(
        "reviewImgFile",
        new File([], "", { type: "text/plane" })
      );
      formdata.append("reviewContents", reviewValue.reviewContents);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      dispatch(addCommentDB(postId, formdata, config));
    } else {
      const formdata = new FormData();
      formdata.append("reviewImgFile", files[0]);
      formdata.append("reviewContents", reviewValue.reviewContents);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      dispatch(addCommentDB(postId, formdata, config));
    }
    // for (let key of formdata.keys()) {
    //   console.log(key);
    // }
    // for (let value of formdata.values()) {
    //   console.log(value);
    // }
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
          리뷰<span>({totalCnt})</span>
        </h2>
      </ReviewBox>

      <Container>
        {reviewList &&
          reviewList.map((item, id) => {
            return <ReviewItem key={id} {...item} />;
          })}
      </Container>

      <Wrap>
        <ContainerInput>
          <ReviewInputBox>
            <WriteBox>
              {preview && <Test src={preview}></Test>}
              <TextareaAutosize
                autoFocus
                name="reviewContents"
                type="text"
                placeholder="리뷰를 작성해주세요"
                onChange={onChangeFormValue}
                ref={reviewRef}
                style={{
                  width: "273px",
                  padding: "10px",
                  resize: "none",
                  overflow: "hidden",
                  outline: "none",
                  border: 0,
                }}
              ></TextareaAutosize>
              <Label htmlFor="chooseFile">
                <Icon src={Camera}></Icon>
              </Label>
            </WriteBox>
            <Button onClick={ReviewBtnClick}>등록</Button>
          </ReviewInputBox>
          <form method="post" encType="multipart/form-data"></form>
          <FileName
            type="file"
            id="chooseFile"
            accept="image/*"
            onChange={onImgChange}
          ></FileName>
        </ContainerInput>
      </Wrap>
    </>
  );
};

export default ReviewDetail;

const ReviewInputBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  /* background-color: white; */
  align-items: center;
  height: 18px;
  margin-top: 30px;
  padding: 10px;
`;

const Wrap = styled.div`
  position: fixed;
`;

const Test = styled.img`
  display: flex;
  width: 40px;
  height: 64px;
  object-fit: cover;
`;

const WriteBox = styled.div`
  background-color: white;
  border: 1px solid #cacaca;
  border-radius: 5px;
  margin-right: 70px;
  margin-bottom: 20px;
`;

// const Bar = styled.img`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-left: 120px;
// `;

const FileName = styled.input`
  visibility: hidden;
`;

const Label = styled.label`
  cursor: pointer;
  font-size: 1em;
`;

const ContainerInput = styled.div`
  width: 100%;
  height: 83px;
  background: #ffffff;
  /* border-top: 1px solid #cacaca; */
  border-radius: 0px;
  position: fixed;
  background-color: white;
  bottom: 0;
`;

const Button = styled.button`
  width: 60px;
  height: 39px;
  bottom: 35px;
  right: 40px;
  background: #56be91;
  border-radius: 5px;
  position: fixed;
  border: 0;
  color: white;
`;

const Icon = styled.img`
  position: absolute;
  right: 110px;
  bottom: 8px;
  width: 24px;
  height: 24px;
`;

const Container = styled.div`
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  margin-bottom: 190px;
`;

const ReviewBox = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  height: 18px;
  margin-top: 20px;
  padding: 20px;
  margin-left: 10px;
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
