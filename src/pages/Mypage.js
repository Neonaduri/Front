import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Titleline from "../components/elements/Titleline";
import { useDispatch } from "react-redux";
import { userAction } from "../redux/module/user";
import { useHistory } from "react-router";
import Footer from "../components/common/Footer";
import MypageBtn from "../components/mypage/MypageBtn";
import NotLoginUser from "../shared/NotLoginUser";

const Mypage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state?.user?.isLogin);
  const loginUser = useSelector((state) => state.user.list);

  const logoutClick = () => {
    dispatch(userAction.logOutDB());
  };

  if (!isLogin) {
    return <NotLoginUser />;
  }

  return (
    <Container>
      <HeaderDiv>
        <Titleline
          title={"마이페이지"}
          onClick={() => {
            history.goBack();
          }}
        />
      </HeaderDiv>
      <UserinfoDiv>
        <div>
          <img src={loginUser.profileImg} alt="profile" />
        </div>
        <div>
          <h3>{loginUser.nickName}</h3>
          <span>{loginUser.userName}</span>
        </div>
      </UserinfoDiv>
      <PageBtnDiv>
        <MypageBtn
          content={"프로필 편집"}
          onClick={() => {
            history.push("/mypage/edit");
          }}
        />
        <MypageBtn
          content={"비밀번호 변경"}
          onClick={() => {
            history.push("/mypage/password");
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
        <Line />
        <MypageBtn
          content={"계정 삭제"}
          onClick={() => {
            history.push("/mypage/edit/withdrawal");
          }}
        />
        <MypageBtn
          content={"로그아웃"}
          onClick={logoutClick}
          textcolor={"red"}
          btn={"hide"}
        />
      </PageBtnDiv>

      <Footer />
    </Container>
  );
};

const Line = styled.div`
  width: 100%;
  height: 10px;
`;

const Container = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.text4};
`;

const PageBtnDiv = styled.div`
  border-top: 10px solid ${({ theme }) => theme.colors.text4};
  height: 21%;
`;

const UserinfoDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 15px;
  height: 15%;
  background-color: white;
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
  background-color: white;
`;

export default Mypage;
