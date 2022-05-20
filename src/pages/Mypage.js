import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Titleline from "../components/elements/Titleline";
import { useDispatch } from "react-redux";
import { userAction } from "../redux/module/user";
import { useHistory } from "react-router";
import Footer from "../components/common/Footer";
import BookedPostcard from "../components/mypage/BookedPostcard";
import MyReviewCard from "../components/mypage/MyReviewCard";
import alarm from "../static/images/icon/alarm.png";
import MypageBtn from "../components/mypage/MypageBtn";
import NotLoginUser from "../shared/NotLoginUser";

const Mypage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state?.user?.isLogin);
  const loginUser = useSelector((state) => state.user.list);
  const [cardList, setCardList] = useState(true);

  const logoutClick = () => {
    localStorage.removeItem("token");
    history.replace("/login");
  };
  console.log(!isLogin);

  if (!isLogin) {
    return <NotLoginUser />;
  }

  return (
    <Container>
      <HeaderDiv>
        <div></div>
        <Titleline title={"마이페이지"} />
        <img />
        {/* <img src={alarm} /> */}
      </HeaderDiv>
      <UserinfoDiv>
        <div>
          <img src={loginUser.profileImg} />
        </div>
        <div>
          <h3>{loginUser.nickName}</h3>
          <span>{loginUser.userName}</span>
        </div>
      </UserinfoDiv>
      <PageBtnDiv>
        <MypageBtn
          content={"내 계정 관리"}
          onClick={() => {
            history.push("/mypage/edit");
          }}
        />
        <MypageBtn
          content={"스크랩 보기"}
          onClick={() => {
            history.push("/mypage/scrap");
          }}
        />
        <MypageBtn
          content={"내 댓글 보기"}
          onClick={() => {
            history.push("/mypage/review");
          }}
        />
      </PageBtnDiv>
      <RestDiv>
        <span onClick={logoutClick}>로그아웃</span>
      </RestDiv>
      <Footer />
    </Container>
  );
};
const Container = styled.div`
  height: 92%;
`;

const RestDiv = styled.div`
  width: 100vw;
  height: 50vh;
  background-color: ${({ theme }) => theme.colors.text4};
  padding: 10px 0px;
  span {
    color: ${({ theme }) => theme.colors.mainRed};
    padding: 0px 10px;
    cursor: pointer;
  }
`;

const PageBtnDiv = styled.div`
  border-top: 10px solid ${({ theme }) => theme.colors.borderColor};
`;

const UserinfoDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  margin-top: 20px;
  div {
    &:first-child {
      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        margin-right: 15px;
        object-fit: cover;
      }
    }
    &:last-child {
      h3 {
        font-size: 16px;
      }
      span {
        font-size: 14px;
        color: ${({ theme }) => theme.colors.text2};
        font-family: "apple1";
      }
    }
  }
`;

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 15px;
  img {
    margin-top: 6px;
  }
  div {
    padding-left: 20px;
  }
`;

export default Mypage;
