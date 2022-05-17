import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

const Location = ({
  postTitle,
  likeCnt,
  reviewCnt,
  postImgUrl,
  postId,
  theme,
}) => {
  const history = useHistory();
  return (
    <Wrap onClick={() => history.push(`/detail/${postId}`)}>
      <ImagePop src={postImgUrl} />
      <div>
        <ContentDiv>
          <Content>{postTitle}</Content>
          <span>{theme}</span>
        </ContentDiv>
        <SectionBox>
          <Like>
            <SocialText>스크랩</SocialText>
            <Cnt>{likeCnt}</Cnt>
          </Like>

          <Like>
            <SocialText>댓글</SocialText>
            <Cnt>{reviewCnt}</Cnt>
          </Like>
        </SectionBox>
      </div>
    </Wrap>
  );
};

export default Location;

const ContentDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    width: 25%;
    background-color: ${({ theme }) => theme.colors.borderColor};
    color: ${({ theme }) => theme.colors.text2};
    font-size: 10px;
    text-align: center;
    border-radius: 3px;
    margin-top: 5px;
  }
`;

const SocialText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text3};
`;

const ImagePop = styled.img`
  border-radius: 10px;
  width: 100%;
  height: 103px;
  object-fit: cover;
`;

const Wrap = styled.div`
  display: "flex";
  position: "relative";
`;

const Content = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 75%;
  margin-top: 5px;
  margin-left: 6px;
  font-size: 15px;
  line-height: 17px;
  color: ${({ theme }) => theme.colors.text1};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Like = styled.div`
  /* margin-left: 10px; */
  display: flex;
  justify-content: left;
  align-items: center;
`;

const Cnt = styled.div`
  margin-left: 5px;
  color: #8d8d8d;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  color: ${({ theme }) => theme.colors.text3};
`;

const SectionBox = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 5px;
`;
