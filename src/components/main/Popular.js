import React, { useEffect } from "react";
import styled from "styled-components";

import love from "../../static/images/icon/love.png";
import Union from "../../static/images/icon/Union.png";
import { useSelector } from "react-redux";

const Popular = ({ postTitle, likeCnt, reviewCnt, postImgUrl }) => {
  const bestList = useSelector((state) => state.post.bestList);

  return (
    <Wrap>
      <ImagePop src={postImgUrl} />
      <Box>
        <Content>{postTitle}</Content>
        <SectionBox>
          <Like>
            <img src={love} />
            <Cnt>{likeCnt}</Cnt>
          </Like>

          <Like>
            <img src={Union} />
            <Cnt>{reviewCnt}</Cnt>
          </Like>
        </SectionBox>
      </Box>
    </Wrap>
  );
};

export default Popular;

const SectionBox = styled.div`
  display: flex;
  margin-top: 5px;
`;

const Wrap = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 3px;
  margin-right: 3px;
  /* gap: 3; */
`;

const Like = styled.div`
  margin-left: 4px;
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
`;

const Content = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 15px;
  margin-left: 10px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #363636;
  font-family: "Apple SD Gothic Neo";
`;

const Box = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 1px 3px 3px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 0;
`;

const ImagePop = styled.img`
  border-radius: 10px;
  width: 100%;
  height: 236px;
  object-fit: cover;
`;
