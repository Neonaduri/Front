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
  getNextCommentDB,
} from "../../redux/module/review";
import Back from "../../static/images/button/back.png";
import ReviewItem from "./ReviewItem";
import Camera from "../../static/images/icon/camera.png";
import InfinityScroll from "../../shared/InfinityScroll";
import x from "../../static/images/icon/x.png";

const ReviewDetail = () => {
  const params = useParams();
  const postId = params.productId;
  const [files, setFiles] = useState();
  const reviewList = useSelector((state) => state.review.reviewList);
  const totalCnt = useSelector((state) => state.review.totalElements);
  const paging = useSelector((state) => state.review.paging);
  const isLoading = useSelector((state) => state.review.isLoading);
  const lastPage = useSelector((state) => state.review.paging.lastPage);
  const reviewRef = useRef();
  const [isEdit, setIsEdit] = useState(false);
  const [preview, setPreview] = useState(null);
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
  const middledivRef = useRef();

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

  const onChangeFormValue = (e) => {
    const { name, value } = e.target;

    setReviewItemData({
      ...reviewItemData,
      [name]: value,
    });
  };

  //후기등록 로직
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
    //이미지없이 텍스트수정
    if (reviewItemData.reviewImgUrl === null) {
      const formdata = new FormData();
      formdata.append("reviewImgUrl", "");
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
    } else if (files === undefined) {
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
    } else if (reviewItemData.reviewImgUrl === "" && files === undefined) {
      const formdata = new FormData();
      formdata.append("reviewImgUrl", ""); //기존이미지
      formdata.append(
        "reviewImgFile",
        new File([], "", { type: "text/plane" })
      );
      formdata.append("reviewContents", reviewItemData.reviewContents);
      //리뷰텍스트

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

  const deleteImg = () => {
    setPreview("");
    setFiles(undefined);
  };

  const deleteEditImg = () => {
    setReviewItemData({
      ...reviewItemData,
      reviewImgUrl: "",
    });
    setFiles(undefined);
  };

  return (
    <Wrap>
      <ReviewBox>
        <img
          src={Back}
          onClick={() => {
            history.goBack();
          }}
        ></img>
        <h2>
          리뷰<span>({totalCnt})</span>
        </h2>
        <div> </div>
      </ReviewBox>
      <Middlediv ref={middledivRef}>
        {reviewList.length !== 0 && (
          <InfinityScroll
            callNext={() => {
              dispatch(getNextCommentDB(postId, paging.start));
            }}
            is_next={lastPage ? false : true}
            loading={isLoading}
            ref={middledivRef}
          >
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
          </InfinityScroll>
        )}
      </Middlediv>

      <ContainerInput>
        <ReviewInputBox>
          <WriteBox>
            <Photo>
              {(files || reviewItemData.reviewImgUrl) && (
                <div>
                  {isEdit ? (
                    <Preview>
                      <Test
                        src={
                          (preview || reviewItemData.reviewImgUrl) &&
                          (preview || reviewItemData.reviewImgUrl)
                        }
                      ></Test>
                      <X
                        onClick={deleteEditImg}
                        src={(preview || reviewItemData.reviewImgUrl) && x}
                      ></X>
                    </Preview>
                  ) : (
                    <Preview>
                      <Test src={preview}></Test>
                      <X onClick={deleteImg} src={preview && x}></X>
                    </Preview>
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
                  width: "260px",
                  height: "35px",
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

          <ButtonDiv>
            {isEdit ? (
              <Button onClick={editCompleteBtn}>수정</Button>
            ) : (
              <Button onClick={ReviewBtnClick}>등록</Button>
            )}
          </ButtonDiv>
        </ReviewInputBox>

        <FileName
          type="file"
          id="chooseFile"
          accept="image/*"
          onChange={onImgChange}
        ></FileName>
      </ContainerInput>
    </Wrap>
  );
};

export default ReviewDetail;

const Wrap = styled.div`
  height: 100%;
`;

const ReviewInputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 18px; */
`;

const Photo = styled.div`
  display: block;
  justify-content: center;
  /* padding: 10px; */
`;

const ButtonDiv = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: column;
  justify-content: flex-end;
  /* background-color: tomato; */
  padding: 5px;
  z-index: 999;
`;

const X = styled.img`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 12px;
  bottom: 2px;
  cursor: pointer;
  width: ${(props) => (props.src ? "19px" : "")};
  height: ${(props) => (props.src ? "19px" : "")};
`;

const Preview = styled.div`
  display: flex;
`;

const Memo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Test = styled.img`
  display: flex;
  width: ${(props) => (props.src ? "64px" : "")};
  height: ${(props) => (props.src ? "75px" : "")};
  object-fit: cover;
  border-radius: 3px;
`;

const WriteBox = styled.div`
  /* display: flex; */
  width: 90%;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 1px solid #cacaca;
  border-radius: 5px;
  /* margin-right: 5px; */
  padding: 5px;
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
  background: #ffffff;
  border-radius: 0px;
  position: fixed;
  background-color: white;
  bottom: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

const Middlediv = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  /* padding: 20px 0px; */
  overflow: scroll;
  /* margin-bottom: 50px; */
`;

const Button = styled.button`
  width: 55px;
  margin-left: 3px;
  height: 35px;
  background: #56be91;
  border-radius: 5px;
  border: 0;
  color: white;
  cursor: pointer;
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
  /* margin-top: 20px; */
  width: 100%;
  /* margin-bottom: 50px; */
  background-color: white;
  /* background-color: tomato; */
`;

const ReviewBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 5px 20px;
  margin-top: 20px;
  /* position: fixed; */
  /* height: 7%; */
  /* z-index: 99; */
  img {
    cursor: pointer;
  }
  h2 {
    font-weight: 700;
    font-size: 18px;
    /* line-height: 18px; */
    color: ${({ theme }) => theme.colors.text1};
    span {
      margin-left: 4px;
    }
  }
`;
