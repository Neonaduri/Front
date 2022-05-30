import React, { useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import imageCompression from "browser-image-compression";
import styled from "styled-components";
import {
  addCommentDB,
  editCommentDB,
  getCommentDB,
  getNextCommentDB,
} from "../../redux/module/review";
import Back from "../../static/images/icon/back.png";
import ReviewItem from "./ReviewItem";
import Camera from "../../static/images/icon/camera.png";
import InfinityScroll from "../../shared/InfinityScroll";
import x from "../../static/images/icon/x.png";
import Spinner from "../../shared/Spinner";
import Nopost from "../common/Nopost";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
const emptyFile = new File([], "", { type: "text/plane" });

const ReviewDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const postId = params.productId;

  const [files, setFiles] = useState();
  const [compressedFiles, setCompressedFiles] = useState();
  const [imageReady, setImageReady] = useState(true);
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

  const middledivRef = useRef();
  const fileRef = useRef();
  const reviewRef = useRef();

  const { reviewList, totalElements, paging, reviewLoading, lastPage } =
    useSelector((state) => state.review);

  const handleEdit = (item) => {
    setReviewItemData(item);
    setIsEdit(true);
  };

  const initReviewItemData = () => {
    setReviewItemData({
      ...reviewItemData,
      nickName: "",
      reviewContents: "",
      reviewImgUrl: "",
      createdAt: "",
      modifiedAt: "",
    });
  };

  const cancelEdit = () => {
    setIsEdit(false);
    initReviewItemData();
    setPreview(null);
  };

  const onChangeFormValue = (e) => {
    const { name, value } = e.target;

    setReviewItemData({
      ...reviewItemData,
      [name]: value,
    });
  };

  //이미지 미리보기
  const onImgChange = async (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files;
      const reader = new FileReader();
      const imgFile = file[0];

      setFiles(file);
      reader.readAsDataURL(imgFile);
      reader.onloadend = () => {
        setPreview(reader.result);
      };
    }
  };

  const handlingDataForm = async (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ia], {
      type: "image/*",
    });
    const file = new File([blob], "image.jpg");
    setCompressedFiles(file);
    setImageReady(true);
  };

  const actionImgCompress = async (fileSrc) => {
    const options = {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 750,
    };
    try {
      const compressedFile = await imageCompression(fileSrc, options);
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        const base64data = reader.result;
        handlingDataForm(base64data);
      };
    } catch (err) {
      console.log(err);
    }
  };

  const getInsertedFormData = (url, imgFile, contents) => {
    const formData = new FormData();
    if (url !== null) formData.append("reviewImgUrl", url);
    formData.append("reviewImgFile", imgFile); //이미지변경
    formData.append("reviewContents", contents);

    return formData;
  };

  //후기등록 로직
  const ReviewBtnClick = () => {
    const { reviewContents } = reviewItemData;
    let formData = {};

    if (!files && reviewContents) {
      formData = getInsertedFormData(null, emptyFile, reviewContents);
    } else {
      formData = getInsertedFormData(null, compressedFiles, reviewContents);
    }

    dispatch(addCommentDB(postId, formData, config));
    initReviewItemData();
    setPreview(null);
    setFiles();
    setCompressedFiles();
  };

  //수정완료버튼
  const editCompleteBtn = () => {
    const { reviewImgUrl, reviewContents } = reviewItemData;
    // let formData = {};

    //이미지없이 텍스트수정
    if (!reviewImgUrl && files) {
      if (reviewContents) {
        const formData = getInsertedFormData(
          "",
          compressedFiles,
          reviewContents
        );
        dispatch(editCommentDB(reviewItemData.reviewId, formData, config));
      }
    } else if (!reviewImgUrl && !files) {
      if (reviewContents) {
        const formData = getInsertedFormData("", emptyFile, reviewContents);
        dispatch(editCommentDB(reviewItemData.reviewId, formData, config));
      }
    } else if (!files) {
      const formData = getInsertedFormData(
        reviewImgUrl,
        emptyFile,
        reviewContents
      );
      dispatch(editCommentDB(reviewItemData.reviewId, formData, config));
    } else {
      console.log("?");
      const formData = getInsertedFormData(
        reviewImgUrl,
        compressedFiles,
        reviewContents
      );
      dispatch(editCommentDB(reviewItemData.reviewId, formData, config));
    }

    initReviewItemData();
    setPreview(null);
    setIsEdit(false);
    setFiles();
  };

  const initReviewItemImage = () => {
    setReviewItemData({
      ...reviewItemData,
      reviewImgUrl: "",
    });
    setPreview(null);
    setFiles();
  };
  const deleteImg = () => {
    fileRef.current.value = "";

    initReviewItemImage();
    setCompressedFiles();
  };

  const deleteEditImg = () => {
    initReviewItemImage();
  };

  useEffect(() => {
    if (files) {
      setImageReady(false);
      actionImgCompress(files[0]);
    }
  }, [files]);

  //리뷰조회
  useEffect(() => {
    dispatch(getCommentDB(postId));
  }, []);

  return (
    <Wrap>
      <ReviewBox>
        <img
          alt="back"
          src={Back}
          onClick={() => {
            history.goBack();
          }}
        ></img>
        <h2>
          댓글<span>({totalElements})</span>
        </h2>
        <div> </div>
      </ReviewBox>
      <Middlediv ref={middledivRef}>
        {reviewList.length !== 0 ? (
          <InfinityScroll
            callNext={() => {
              dispatch(getNextCommentDB(postId, paging.start));
            }}
            is_next={lastPage ? false : true}
            loading={reviewLoading}
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
                      isEdit={isEdit}
                      key={id}
                      {...item}
                    />
                  );
                })}
            </Container>
          </InfinityScroll>
        ) : (
          <Nopost
            btnhide={true}
            content="첫 댓글을 달아주세요!"
            backbtn={false}
            footer={false}
          />
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
                        alt="preview"
                        src={
                          (preview || reviewItemData.reviewImgUrl) &&
                          (preview || reviewItemData.reviewImgUrl)
                        }
                      ></Test>
                      <X
                        alt="x"
                        onClick={deleteEditImg}
                        src={(preview || reviewItemData.reviewImgUrl) && x}
                      ></X>
                    </Preview>
                  ) : (
                    <Preview>
                      <Test src={preview} alt="preview"></Test>
                      <X onClick={deleteImg} src={preview && x} alt="x"></X>
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
                placeholder="댓글을 작성해주세요."
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
                <Icon src={Camera} alt="camera"></Icon>
              </Label>
            </Memo>
          </WriteBox>

          <ButtonDiv>
            {isEdit ? (
              <Button onClick={editCompleteBtn}>수정</Button>
            ) : (
              <>
                {imageReady ? (
                  <Button onClick={ReviewBtnClick}>등록</Button>
                ) : (
                  <NotreadyButton>
                    <Spinner />
                  </NotreadyButton>
                )}
              </>
            )}
          </ButtonDiv>
        </ReviewInputBox>

        <FileName
          ref={fileRef}
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
`;

const Photo = styled.div`
  display: block;
  justify-content: center;
`;

const ButtonDiv = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: column;
  justify-content: flex-end;
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
  width: 90%;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 1px solid #cacaca;
  border-radius: 5px;
  padding: 5px;
`;

const FileName = styled.input`
  visibility: hidden;
`;

const Label = styled.label`
  cursor: pointer;
  font-size: 1em;
`;

const ContainerInput = styled.div`
  width: 100%;
  border-radius: 0px;
  position: fixed;
  background-color: white;
  bottom: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  z-index: 9999;
`;

const Middlediv = styled.div`
  height: 86%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const NotreadyButton = styled.button`
  width: 55px;
  margin-left: 3px;
  height: 35px;
  background: ${({ theme }) => theme.colors.borderColor};
  border-radius: 5px;
  border: 0;
  color: white;
  cursor: pointer;
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
  width: 100%;
  background-color: white;
`;

const ReviewBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
  height: 6%;
  img {
    width: 28px;
    cursor: pointer;
    margin-right: -24px;
  }
  h2 {
    font-family: "apple3";
    font-size: 18px;
    color: ${({ theme }) => theme.colors.text1};
    span {
      font-family: "apple3";
      margin-left: 4px;
    }
  }
`;
