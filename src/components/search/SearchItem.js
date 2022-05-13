import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import love from "../../static/images/icon/love.png";
import Union from "../../static/images/icon/Union.png";

const SearchItem = forwardRef(
  ({ location, theme, postId, likeCnt, reviewCnt, postTitle, postImgUrl }) => {
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
          <Box>
            <Content>{location}</Content>
            <Content>{theme}</Content>
          </Box>

          <Box>
            <Contain>
              <Con>{postTitle}</Con>
              <Term>22.05.03 ~ 22.05.30</Term>
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
                <img src={Union} />
                <Cnt>{reviewCnt}</Cnt>
              </Like>
            </Like>
          </SectionBox>
          <Bar></Bar>
        </div>
      </div>
    );
  }
);

export default SearchItem;

const Wrap = styled.div`
  display: flex;
  margin-left: 18px;
`;

const Wrapper = styled.div`
  position: relative;
  left: 0;
`;

const Nickname = styled.div`
  font-family: "Apple SD Gothic Neo";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #363636;
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
  color: #8d8d8d;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
`;

const ImagePop = styled.img`
  position: absolute;
  border-radius: 5px;
  width: 128px;
  height: 115px;
  object-fit: cover;
  margin-top: 30px;
  margin-right: 20px;
`;

const Box = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 15px;
  margin-left: 150px;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  margin-left: 5px;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 17px;
  color: #8d8d8d;
  font-family: "Apple SD Gothic Neo";
  background: #eeeeee;
  border-radius: 2px;
  padding: 0 5px;
`;

const SectionBox = styled.div`
  position: relative;
  left: 70px;
  top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 90px;
`;

const Con = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #363636;
`;

const Contain = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #363636;
  margin-left: 10px;
`;

const Term = styled.span`
  font-weight: 500;
  font-size: 14px;
  color: #8d8d8d;
  margin-top: 2px;
`;

const Bar = styled.div`
  border: 1px solid #eeeeee;
  margin-top: 20px;
  margin-left: 20px;
  width: 90%;
`;
