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
      <ImagePop src={postImgUrl} alt="locaImg" />
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

const Content = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin-left: 8px;
  font-size: 12px;
  line-height: 17px;
  color: ${({ theme }) => theme.colors.text1};
  overflow: hidden;
  width: 60%;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ContentDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  span {
    padding: 0px 3px;
    background-color: ${({ theme }) => theme.colors.borderColor};
    color: ${({ theme }) => theme.colors.text2};
    font-size: 10px;
    text-align: center;
    border-radius: 2px;
    margin-top: 5px;
  }
`;

const SocialText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text2};
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

const Like = styled.div`
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
  margin-top: 0px;
`;
