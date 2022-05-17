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
  const newStartDate = startDate.substr(2);
  const newEndDate = endDate.substr(2);
  const clickWishPost = (e) => {
    const postId = e.target.id;
    dispatch(clickWishSearchPostDB(postId));
  };

  return (
    <Container>
      <Wrap>
        <ImagePop src={postImgUrl} />
        <SocialWishDiv onClick={(e) => clickWishPost(e)}>
          {islike ? (
            <img src={clickedWish} id={postId} />
          ) : (
            <img src={unClickedWish} id={postId} />
          )}
        </SocialWishDiv>
      </Wrap>

      {/* 카테고리 */}
      <BoxTop onClick={() => history.push(`/detail/${postId}`)}>
        <Term>
          {newStartDate} ~ {newEndDate}
        </Term>
        <Cons>
          <Content>{location}</Content>
          <Content>{theme}</Content>
        </Cons>
      </BoxTop>

      <Box onClick={() => history.push(`/detail/${postId}`)}>
        <Contain>
          <Con>{postTitle}</Con>
        </Contain>
      </Box>

      {/* 좋아요, 댓글개수 */}
      <SectionBox>
        <Nickname>{user.nickName}</Nickname>
        <Like>
          <Like>
            <img src={wish} />
            <Cnt>{likeCnt}</Cnt>
          </Like>
          <Like>
            <img src={review} />
            <Cnt>{reviewCnt}</Cnt>
          </Like>
        </Like>
      </SectionBox>
      <Bar></Bar>
    </Container>
  );
};

export default SearchItem;

const Container = styled.div`
  width: 375px;
`;

const SocialWishDiv = styled.div`
  position: absolute;
  top: 98px;
  left: 103px;
  width: 17px;
  z-index: 10;
  img {
    width: 17px;
  }
`;

const Wrap = styled.div`
  display: flex;
  margin-left: 16px;
  position: relative;
`;

const Cons = styled.div`
  display: flex;
  /* justify-content: right; */
  /* padding: 0 5px; */
  margin-right: 5px;
`;

const Nickname = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: ${({ theme }) => theme.colors.text2};
  display: flex;
  justify-content: left;
  align-items: center;
`;

const Like = styled.div`
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Cnt = styled.div`
  margin-left: 5px;
  color: ${({ theme }) => theme.colors.text2};
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
`;

const ImagePop = styled.img`
  position: absolute;
  border-radius: 5px;
  width: 128px;
  height: 95px;
  object-fit: cover;
  margin-top: 30px;
  margin-right: 20px;
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 150px;
  margin-top: 5px;
`;

const BoxTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 35px;
  margin-left: 145px;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 17px;
  color: ${({ theme }) => theme.colors.text2};
  background: ${({ theme }) => theme.colors.borderColor};
  border-radius: 2px;
  padding: 0 5px;
`;

const SectionBox = styled.div`
  position: relative;
  left: 70px;
  top: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 90px;
`;

const Con = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text1};
`;

const Contain = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const Term = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  color: ${({ theme }) => theme.colors.text2};
  padding: 0 0 0 10px;
`;

const Bar = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  margin-top: 20px;
  margin-left: 20px;
  width: 90%;
`;
