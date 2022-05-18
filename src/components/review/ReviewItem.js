import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import { deleteCommentDB } from "../../redux/module/review";
import ModalImg from "./ModalImg";

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
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const postId = params.productId;
  const profilUrl = useSelector((state) => state.user.list.profileImg);
  const [editing, setEditing] = useState(false);
  const [imgModal, setImgModal] = useState(false);

  const onClick = () => {
    setImgModal(true);
  };

  //삭제버튼
  const deleteBtn = () => {
    dispatch(deleteCommentDB(reviewId));
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
    console.log(typeof reviewImgUrl);
  };

  return (
    <>
      <Card>
        <UpperContents>
          <Profile>
            <ProfileImg
              src={profileImgUrl}
              onClick={() => {
                history.push("/mypage");
              }}
            ></ProfileImg>
            <p>{nickName}</p>
          </Profile>

          {editing ? (
            <div>
              <Button onClick={cancleBtn}>취소하기</Button>
            </div>
          ) : (
            <Btns>
              <Button onClick={deleteBtn}>삭제</Button>
              <Button onClick={getEditBtn}>수정</Button>
            </Btns>
          )}
        </UpperContents>

        {reviewImgUrl ? (
          <Image onClick={onClick}>
            <ImagePop src={reviewImgUrl}></ImagePop>
          </Image>
        ) : (
          ""
        )}

        <Content>
          <p>{reviewContents}</p>
        </Content>
      </Card>

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

const Card = styled.div`
  margin: 20px 0;
`;

const Btns = styled.div``;

const ProfileImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50px;
  margin: 10px 0;
  margin-right: 10px;
  background-color: tomato;
  background-size: cover;
`;

const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UpperContents = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
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
  height: 241px;
  object-fit: cover;
  padding: 10px;
`;

const Image = styled.div`
  object-fit: cover;
  width: 100%;
  height: 241px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #585858;
`;
