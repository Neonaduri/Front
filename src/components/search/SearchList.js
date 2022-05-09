import React from "react";
import styled from "styled-components";
import love from "../../static/images/icon/love.png";
import Union from "../../static/images/icon/Union.png";

const SearchList = () => {
  return (
    <>
      <Title>강릉 여행 계획표</Title>

      {/* 하나의 리스트 */}
      <div>
        <Wrap>
          <ImagePop src="https://cdn.traveltimes.co.kr/news/photo/202110/113374_11730_5213.jpg" />
        </Wrap>

        {/* 카테고리 */}
        <Box>
          <Content>강릉</Content>
          <Content>맛집</Content>
        </Box>

        <Box>
          <Contain>
            <Con>방콕에서 힐링~!</Con>
            <Term>22.05.03 ~ 22.05.30</Term>
          </Contain>
        </Box>

        {/* 좋아요, 댓글개수 */}
        <SectionBox>
          <Nickname>호캉스투어</Nickname>
          <Like>
            <Like>
              <img src={love} />
              <Cnt>2,431</Cnt>
            </Like>
            <Like>
              <img src={Union} />
              <Cnt>25</Cnt>
            </Like>
          </Like>
        </SectionBox>
        <Bar></Bar>
      </div>

      <div>
        <Wrap>
          <ImagePop src="https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/oeE/image/qr9sTCdke-KEFZ55c32Vrzciu8I.jpg" />
        </Wrap>

        {/* 카테고리 */}
        <Box>
          <Content>강릉</Content>
          <Content>맛집</Content>
        </Box>

        <Box>
          <Contain>
            <Con>방콕에서 힐링~!</Con>
            <Term>22.05.03 ~ 22.05.30</Term>
          </Contain>
        </Box>

        {/* 좋아요, 댓글개수 */}
        <SectionBox>
          <Nickname>호캉스투어</Nickname>
          <Like>
            <Like>
              <img src={love} />
              <Cnt>2,431</Cnt>
            </Like>
            <Like>
              <img src={Union} />
              <Cnt>25</Cnt>
            </Like>
          </Like>
        </SectionBox>
        <Bar></Bar>
      </div>

      <div>
        <Wrap>
          <ImagePop src="https://content.skyscnr.com/m/25baf14923606aee/original/GettyImages-497513346.jpg?resize=1800px:1800px&quality=100" />
        </Wrap>

        {/* 카테고리 */}
        <Box>
          <Content>강릉</Content>
          <Content>맛집</Content>
        </Box>

        <Box>
          <Contain>
            <Con>방콕에서 힐링~!</Con>
            <Term>22.05.03 ~ 22.05.30</Term>
          </Contain>
        </Box>

        {/* 좋아요, 댓글개수 */}
        <SectionBox>
          <Nickname>호캉스투어</Nickname>
          <Like>
            <Like>
              <img src={love} />
              <Cnt>2,431</Cnt>
            </Like>
            <Like>
              <img src={Union} />
              <Cnt>25</Cnt>
            </Like>
          </Like>
        </SectionBox>
        <Bar></Bar>
      </div>

      <div>
        <Wrap>
          <ImagePop src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBogDgMl3Kl5mZqkhocTFQ48-XULT_fpdi7Q&usqp=CAU" />
        </Wrap>

        {/* 카테고리 */}
        <Box>
          <Content>강릉</Content>
          <Content>맛집</Content>
        </Box>

        <Box>
          <Contain>
            <Con>방콕에서 힐링~!</Con>
            <Term>22.05.03 ~ 22.05.30</Term>
          </Contain>
        </Box>

        {/* 좋아요, 댓글개수 */}
        <SectionBox>
          <Nickname>호캉스투어</Nickname>
          <Like>
            <Like>
              <img src={love} />
              <Cnt>2,431</Cnt>
            </Like>
            <Like>
              <img src={Union} />
              <Cnt>25</Cnt>
            </Like>
          </Like>
        </SectionBox>
        <Bar></Bar>
      </div>
    </>
  );
};

export default SearchList;

const Wrap = styled.div`
  display: flex;
  margin-left: 18px;
`;

const Wrapper = styled.div`
  position: relative;
  left: 0;
`;

const Title = styled.div`
  position: relative;
  width: 119px;
  height: 22px;
  left: 16px;
  font-family: "Apple SD Gothic Neo";
  font-style: normal;
  font-weight: 600;
  top: 20px;
  font-size: 18px;
  line-height: 22px;
  color: #363636;
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
