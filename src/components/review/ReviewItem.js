import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import { deleteCommentDB } from "../../redux/module/review";
import ModalImg from "./ModalImg";
import ModalfixTime from "../common/ModalfixTime";

const ReviewItem = ({
  profileImgUrl,
  reviewImgUrl,
  reviewContents,
  nickName,
  reviewId,
  handleEdit,
  handleEditCancel,
  preview,
  cancelEdit,
  modifiedAt,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const postId = params.productId;
  const profilUrl = useSelector((state) => state.user.list.profileImg);
  const loginUserNick = useSelector((state) => state.user.list.nickName);
  const [editing, setEditing] = useState(false);
  const [imgModal, setImgModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };

  const onClick = () => {
    setImgModal(true);
  };

  //삭제버튼
  const deleteBtn = () => {
    dispatch(deleteCommentDB(reviewId));
    setModalOpen(false);
  };

  //수정 취소버튼
  const cancleBtn = () => {
    setEditing(false);
    cancelEdit(false);
  };

  //수정버튼
  const getEditBtn = () => {
    setEditing(true);
    handleEdit({
      reviewImgUrl,
      reviewContents,
      nickName,
      reviewId,
      preview,
    });
  };

  function displayedAt(createdAt) {
    const milliSeconds = new Date() - createdAt;
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  }

  const date = new Date(modifiedAt);
  const dateMillisecond = date.getTime() + 3600000 * 9;

  useEffect(() => {
    setEditing(false);
  }, [modifiedAt, reviewContents, preview]);

  return (
    <>
      <Card>
        <UpperContents>
          <Profile>
            <ProfileImg src={profileImgUrl} alt="profile"></ProfileImg>
            <div>
              <p>{nickName}</p>
              <small>{displayedAt(dateMillisecond)}</small>
            </div>
          </Profile>
          {nickName === loginUserNick ? (
            <>
              {editing ? (
                <div>
                  <Button onClick={cancleBtn}>취소하기</Button>
                </div>
              ) : (
                <Btns>
                  <Button
                    onClick={() => {
                      setModalOpen(true);
                    }}
                  >
                    삭제
                  </Button>
                  <Button onClick={getEditBtn}>수정</Button>
                </Btns>
              )}
            </>
          ) : null}
        </UpperContents>

        {reviewImgUrl ? (
          <Image onClick={onClick}>
            <ImagePop src={reviewImgUrl} alt="review"></ImagePop>
          </Image>
        ) : (
          ""
        )}

        <Content>
          <p>{reviewContents}</p>
        </Content>
      </Card>
      <ModalfixTime
        open={modalOpen}
        close={closeModal}
        onSubmitClick={deleteBtn}
        btnstyle="del"
        header={
          <EditModal>
            <div>정말 삭제하시겠습니까?</div>
          </EditModal>
        }
      ></ModalfixTime>

      {imgModal && (
        <ModalImg
          reviewImgUrl={reviewImgUrl}
          postId={postId}
          setImgModal={setImgModal}
        />
      )}
    </>
  );
};

export default ReviewItem;

const EditModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    font-size: 20px;
    margin-bottom: 15px;
    cursor: pointer;
  }
  button {
    background-color: ${({ theme }) => theme.colors.mainRed};
    color: white;
    padding: 10px 45px;
    border-radius: 10px;
    font-size: 18px;
    margin-bottom: -20px;
  }
`;

const Card = styled.div`
  margin: 20px 0;
  background-color: white;
`;

const Btns = styled.div``;

const ProfileImg = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 50px;
  margin-top: 10px;
  margin-right: 10px;
  background-size: cover;
  object-fit: cover;
`;

const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    margin-top: 4px;
    display: flex;
    flex-direction: column;
    small {
      font-size: 12px;
      color: ${({ theme }) => theme.colors.text3};
    }
  }
`;

const UpperContents = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const Button = styled.button`
  align-items: flex-start;
  padding: 4px 7px;
  background: #ececec;
  border-radius: 2px;
  border: 0;
  color: #8d8d8d;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  margin-left: 5px;
`;

const ImagePop = styled.img`
  border-radius: 15px;
  width: 100%;
  padding: 10px;
  height: 200px;
  object-fit: cover;
`;

const Image = styled.div`
  object-fit: cover;
  width: 91%;
  height: 200px;
  margin: auto;
`;

const Content = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text1};
  width: 90%;
  padding: 0px 10px;
  margin: auto;
  p {
    margin-top: 5px;
  }
`;
