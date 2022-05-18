import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { clickWishPostDB } from "../../redux/module/post";

import review from "../../static/images/icon/review.png";
import wish from "../../static/images/icon/wish.png";
import clickedWish from "../../static/images/icon/clickedWish.png";
import unClickedWish from "../../static/images/icon/unClickedWish.png";

const Popular = ({
  postTitle,
  likeCnt,
  reviewCnt,
  postImgUrl,
  postId,
  islike,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const clickWishPost = (e) => {
    const postId = e.target.id;
    dispatch(clickWishPostDB(postId));
  };

  return (
    <Wrap>
      <ImagePop src={postImgUrl} />
      <SocialWishDiv onClick={(e) => clickWishPost(e)}>
        {islike ? (
          <img src={clickedWish} id={postId} />
        ) : (
          <img src={unClickedWish} id={postId} />
        )}
      </SocialWishDiv>
      <Box onClick={() => history.push(`/detail/${postId}`)}>
        <Content>{postTitle}</Content>
        <SectionBox>
          <Like>
            <img src={wish} />
            <Cnt>{likeCnt}</Cnt>
          </Like>
          <Like>
            <ImgIcon src={review} />
            <Cnt>{reviewCnt}</Cnt>
          </Like>
        </SectionBox>
      </Box>
    </Wrap>
  );
};

export default Popular;

const SocialWishDiv = styled.div`
  position: absolute;
  right: 10px;
  bottom: 70px;
  img {
    width: 24px;
  }
`;

const ImgIcon = styled.img`
  position: absolute;
  right: 115px;
  width: 11.25px;
  height: 9.92px;
`;

const SectionBox = styled.div`
  display: flex;
  margin-top: 5px;
  position: relative;
`;

const Wrap = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 3px;
  margin-right: 3px;
`;

const Like = styled.div`
  display: flex;
  align-items: center;
  margin-right: 3px;
`;

const Cnt = styled.div`
  margin-left: 5px;
  color: #8d8d8d;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
`;

const Content = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 10px;
  margin-left: 13px;
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text1};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Box = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 0;
  left: -8px;
`;

const ImagePop = styled.img`
  border-radius: 10px;
  width: 158px;
  height: 236px;
  object-fit: cover;
`;
