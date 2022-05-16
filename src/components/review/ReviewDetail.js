import React, { useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import {
  addCommentDB,
  editCommentDB,
  getCommentDB,
} from "../../redux/module/review";
import Back from "../../static/images/button/back.png";
import ReviewItem from "./ReviewItem";
import Camera from "../../static/images/icon/camera.png";

const ReviewDetail = () => {
  const params = useParams();
  const postId = params.productId;
  const [files, setFiles] = useState();
  const reviewList = useSelector((state) => state.review.reviewList);
  const totalCnt = useSelector((state) => state.review.totalElements);
  const reviewRef = useRef();
  const [isEdit, setIsEdit] = useState(false);
  const [preview, setPreview] = useState("");
  const [reviewItemData, setReviewItemData] = useState({
    reviewId: null,
    nickName: "",
    reviewContents: "",
    reviewImgUrl: "",
    createdAt: "",
    modifiedAt: "",
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const handleEdit = (item) => {
    setReviewItemData(item);
    setIsEdit(true);
  };

  const cancelEdit = () => {
    setIsEdit(false);
  };

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

    setReviewItemData({
      ...reviewItemData,
      [name]: value,
    });
  };

  const ReviewBtnClick = () => {
    if (files === undefined) {
      const formdata = new FormData();
      formdata.append(
        "reviewImgFile",
        new File([], "", { type: "text/plane" })
      );
      formdata.append("reviewContents", reviewItemData.reviewContents);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      dispatch(addCommentDB(postId, formdata, config));
    } else {
      const formdata = new FormData();
      formdata.append("reviewImgFile", files[0]);
      formdata.append("reviewContents", reviewItemData.reviewContents);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      dispatch(addCommentDB(postId, formdata, config));
    }
  };

  //수정완료버튼
  const editCompleteBtn = () => {
    if (files === undefined) {
      const formdata = new FormData();
      formdata.append("reviewImgUrl", reviewItemData.reviewImgUrl);
      formdata.append(
        "reviewImgFile",
        new File([], "", { type: "text/plane" })
      );
      formdata.append("reviewContents", reviewItemData.reviewContents);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      dispatch(editCommentDB(reviewItemData.reviewId, formdata, config));
    } else {
      const formdata = new FormData();
      formdata.append("reviewImgUrl", reviewItemData.reviewImgUrl); //기존이미지
      formdata.append("reviewImgFile", files[0]); //이미지변경
      formdata.append("reviewContents", reviewItemData.reviewContents);
      //리뷰텍스트

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      dispatch(editCommentDB(reviewItemData.reviewId, formdata, config));
    }
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
            return (
              <ReviewItem
                setReviewItemData={setReviewItemData}
                cancelEdit={cancelEdit}
                handleEdit={handleEdit}
                key={id}
                {...item}
              />
            );
          })}
      </Container>

      <Wrap>
        <ContainerInput>
          <ReviewInputBox>
            <WriteBox>
              <Photo>
                {(files || reviewItemData.reviewImgUrl) && (
                  <div>
                    {isEdit ? (
                      <Test src={reviewItemData.reviewImgUrl}></Test>
                    ) : (
                      <Test src={preview}></Test>
                    )}
                  </div>
                )}
              </Photo>

              <Memo>
                <TextareaAutosize
                  autoFocus
                  name="reviewContents"
                  type="text"
                  placeholder="리뷰를 작성해주세요"
                  onChange={onChangeFormValue}
                  value={reviewItemData.reviewContents}
                  ref={reviewRef}
                  style={{
                    display: "flex",
                    width: "270px",
                    height: "35px",
                    padding: "8px",
                    resize: "none",
                    overflow: "hidden",
                    outline: "none",
                    border: 0,
                    margin: "0 0 0 3px",
                  }}
                ></TextareaAutosize>
                <Label htmlFor="chooseFile">
                  <Icon src={Camera}></Icon>
                </Label>
              </Memo>
            </WriteBox>
            {isEdit ? (
              <Button onClick={editCompleteBtn}>수정</Button>
            ) : (
              <Button onClick={ReviewBtnClick}>등록</Button>
            )}
          </ReviewInputBox>
          <form method="post" encType="multipart/form-data"></form>
          <FileName
            type="file"
            id="chooseFile"
            accept="image/*"
            onChange={onImgChange}
            onClick={onImgFile}
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
  align-items: center;
  height: 18px;
  /* margin-top: 30px; */
  padding: 10px;
`;

const Photo = styled.div`
  display: block;
  justify-content: center;
`;

const Memo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrap = styled.div`
  position: fixed;
`;

const Test = styled.img`
  display: flex;
  width: 55px;
  height: 60px;
  object-fit: cover;
`;

const WriteBox = styled.div`
  /* display: flex; */
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 1px solid #cacaca;
  border-radius: 5px;
  margin-right: 5px;
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
  background: #56be91;
  border-radius: 5px;
  border: 0;
  color: white;
`;

const Icon = styled.img`
  display: flex;
  justify-content: right;
  align-items: center;
  width: 24px;
  height: 24px;
  margin-right: 3px;
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
