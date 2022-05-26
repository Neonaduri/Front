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
      <ImagePop
        alt="postimg"
        src={postImgUrl}
        onClick={() => history.push(`/detail/${postId}`)}
      />
      <SocialWishDiv onClick={(e) => clickWishPost(e)}>
        {islike ? (
          <img src={clickedWish} id={postId} alt="wish" />
        ) : (
          <img src={unClickedWish} id={postId} alt="wish" />
        )}
      </SocialWishDiv>
      <Box>
        <Content onClick={() => history.push(`/detail/${postId}`)}>
          {postTitle}
        </Content>
        <SectionBox>
          <Like>
            <ImgIconWish src={wish} alt="icon" />
            <Cnt>{likeCnt}</Cnt>
          </Like>
          <LikeReview>
            <ImgIcon src={review} alt="icon" />
            <Cnt>{reviewCnt}</Cnt>
          </LikeReview>
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
  cursor: pointer;
  img {
    width: 24px;
  }
`;

const ImgIcon = styled.img`
  width: 16px;
`;

const ImgIconWish = styled.img`
  margin-left: 5px;
  width: 16px;
`;

const SectionBox = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 5px;
`;

const Wrap = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 3px;
  margin-right: 3px;
`;

const Like = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LikeReview = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-left: 5px; */
`;

const Cnt = styled.div`
  margin-left: 3px;
  color: #8d8d8d;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
`;

const Content = styled.div`
  cursor: pointer;
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
  cursor: pointer;
  border-radius: 10px;
  width: 158px;
  height: 236px;
  object-fit: cover;
`;
