import React, { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { clickWishSearchPostDB } from "../../redux/module/post";
import styled from "styled-components";
import wish from "../../static/images/icon/wish.png";
import review from "../../static/images/icon/review.png";
import clickedWish from "../../static/images/icon/clickedWish.png";
import unClickedWish from "../../static/images/icon/unClickedWish.png";

const SearchItem = ({
  location,
  theme,
  islike,
  postId,
  likeCnt,
  reviewCnt,
  postTitle,
  postImgUrl,
  startDate,
  endDate,
  user,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const newStartDate = startDate?.substr(2);
  const newEndDate = endDate?.substr(2);
  const clickWishPost = (e) => {
    const postId = e.target.id;
    dispatch(clickWishSearchPostDB(postId));
  };

  return (
    <Container>
      <LeftDiv>
        <PostImg src={postImgUrl} />
        <div onClick={(e) => clickWishPost(e)}>
          {islike ? (
            <img src={clickedWish} id={postId} />
          ) : (
            <img src={unClickedWish} id={postId} />
          )}
        </div>
      </LeftDiv>
      <RightDiv>
        <RightHeaderDiv onClick={() => history.push(`/detail/${postId}`)}>
          <p>
            {newStartDate} ~ {newEndDate}
          </p>
          <div>
            <span>{location}</span>
            <span>{theme}</span>
          </div>
        </RightHeaderDiv>

        <RigthMiddlediv onClick={() => history.push(`/detail/${postId}`)}>
          <h3>{postTitle}</h3>
        </RigthMiddlediv>

        <RightBottomdiv>
          <span>{user?.nickName}</span>
          <div>
            <img src={wish} />
            <small>{likeCnt}</small>

            <img src={review} />
            <small>{reviewCnt}</small>
          </div>
        </RightBottomdiv>
      </RightDiv>
    </Container>
  );
};

const RightBottomdiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text2};
  }
  div {
    display: flex;
    align-items: center;
    img {
      margin-left: 10px;
      margin-right: 4px;
    }
  }
`;

const RigthMiddlediv = styled.div`
  height: 53px;

  h3 {
    font-size: 16px;
    margin: 5px 0px;
  }
`;

const RightHeaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text3};
  }
  span {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.text2};
    background-color: ${({ theme }) => theme.colors.borderColor};
    padding: 2px 4px;
    border-radius: 5px;
    margin: 0px 3px;
  }
`;

const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 5px;
  margin-top: -3px;
  width: 240px;
`;

const PostImg = styled.img`
  width: 128px;
  height: 95px;
  border-radius: 5px;
`;
const LeftDiv = styled.div`
  position: relative;
  width: 130px;
  div {
    position: absolute;
    left: 97px;
    bottom: 8px;
    img {
      width: 22px;
    }
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

export default SearchItem;
