import React from "react";
import styled from "styled-components";
import love from "../../static/images/icon/love.png";
import Union from "../../static/images/icon/Union.png";

const Location = ({ postTitle, likeCnt, reviewCnt, postImgUrl }) => {
  return (
    <>
      <div style={{ display: "flex", position: "relative" }}>
        <Wrap>
          <ImagePop src={postImgUrl} />
          <div>
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
          </div>
        </Wrap>
      </div>
    </>
  );
};

export default Location;

const ImagePop = styled.img`
  border-radius: 10px;
  width: 162px;
  height: 103px;
  object-fit: cover;
`;

const Wrap = styled.div`
  margin-left: 4px;
  margin-top: 20px;
`;

const Content = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 15px;
  margin-left: 5px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #363636;
  font-family: "Apple SD Gothic Neo";
`;

const Like = styled.div`
  margin-left: 10px;
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

const SectionBox = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 5px;
`;
