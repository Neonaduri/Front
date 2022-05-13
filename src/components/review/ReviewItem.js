import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import {
  deleteCommentDB,
  getCommentDB,
  getOneCommentDB,
} from "../../redux/module/review";

const ReviewItem = ({ reviewImgUrl, reviewContents, nickName, reviewId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);

  //삭제버튼
  const deleteBtn = () => {
    dispatch(deleteCommentDB(reviewId));
  };

  //수정 취소버튼
  const cancleBtn = () => {
    setEditing(false);
  };

  //
  const getEditBtn = () => {
    dispatch(getOneCommentDB(reviewId));
    setEditing(true);

    // dispatch(editCommentDB(reviewId));
  };
  return (
    <>
      <Card>
        <UpperContents>
          <Profile>
            <ProfileImg src="https://img1.daumcdn.net/thumb/C500x500/?fname=http://t1.daumcdn.net/brunch/service/guest/image/huOSCsK5PxRuyoA0e_v7g_4PryM.jpg"></ProfileImg>
            <p>{nickName}</p>
          </Profile>

          {editing ? (
            <div>
              <Button onClick={deleteBtn}>수정완료</Button>
              <Button onClick={cancleBtn}>취소하기</Button>
            </div>
          ) : (
            <Btns>
              <Button onClick={deleteBtn}>삭제하기</Button>
              <Button onClick={getEditBtn}>수정하기</Button>
            </Btns>
          )}
        </UpperContents>

        <ImagePop src={reviewImgUrl}></ImagePop>

        <Content>
          <div>
            {editing ? (
              <Textarea defaultValue={reviewContents}></Textarea>
            ) : (
              // <p>
              //   Lorem ipsum dolor sit amet, consecteturadipiscing elit. Commodo
              //   ut volutpat risus non.Ipsum arcu venenatis pharetra nisi
              //   dignissim laoreet auctor massa, diam. In elit montes, felis
              //   sagittis, ipsum volutpat elementum.
              // </p>
              <p>{reviewContents}</p>
            )}

            {/* 조건주기 */}
          </div>
        </Content>
      </Card>
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
  object-fit: cover;
  padding: 10px;
`;

const Textarea = styled.textarea`
  resize: none;
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
