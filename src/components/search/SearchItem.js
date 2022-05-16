import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import love from "../../static/images/icon/love.png";
import review from "../../static/images/icon/review.png";

const SearchItem = ({
  location,
  theme,
  postId,
  likeCnt,
  reviewCnt,
  postTitle,
  postImgUrl,
}) => {
  const nickname = useSelector((state) => state.user.list.nickName);
  const history = useHistory();

  return (
    <div onClick={() => history.push(`/detail/${postId}`)}>
      {/* 하나의 리스트 */}
      <div>
        <Wrap>
          <ImagePop src={postImgUrl} />
        </Wrap>

        {/* 카테고리 */}
        <BoxTop>
          <Term>22.05.03 ~ 22.05.30</Term>
          <Cons>
            <Content>{location}</Content>
            <Content>{theme}</Content>
          </Cons>
        </BoxTop>

        <Box>
          <Contain>
            <Con>{postTitle}</Con>
          </Contain>
        </Box>

        {/* 좋아요, 댓글개수 */}
        <SectionBox>
          <Nickname>{nickname}</Nickname>
          <Like>
            <Like>
              <img src={love} />
              <Cnt>{likeCnt}</Cnt>
            </Like>
            <Like>
              <img src={review} />
              <Cnt>{reviewCnt}</Cnt>
            </Like>
          </Like>
        </SectionBox>
        <Bar></Bar>
      </div>
    </div>
  );
};

export default SearchItem;

const Wrap = styled.div`
  display: flex;
  margin-left: 18px;
`;

const Cons = styled.div`
  display: flex;
  padding: 0 10px;
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
  margin-left: 150px;
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
  font-size: 12px;
  line-height: 12px;
  color: ${({ theme }) => theme.colors.text2};
  padding: 0 10px;
`;

const Bar = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  margin-top: 20px;
  margin-left: 20px;
  width: 90%;
`;
