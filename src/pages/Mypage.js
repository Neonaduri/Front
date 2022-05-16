import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Titleline from "../components/elements/Titleline";
import { useDispatch } from "react-redux";
import { userAction } from "../redux/module/user";
import { useHistory } from "react-router";
import Footer from "../components/common/Footer";
import MyInfo from "../components/mypage/MyInfo";
import BookedPostcard from "../components/mypage/BookedPostcard";
import MyReviewCard from "../components/mypage/MyReviewCard";

const Mypage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const iLikedPost = useSelector((state) => state.user.iLikedPost?.postList);
  const myReview = useSelector((state) => state.user.myReview);
  const [cardList, setCardList] = useState(true);

  useEffect(() => {
    dispatch(userAction.getMyLikePostDB());
    dispatch(userAction.getMyReviewDB());
  }, []);
  if (!isLogin) {
    history.replace("/login");
  }

  return (
    <div>
      <Titleline title={"마이페이지"} />
      <MyInfo />
      <Selectdiv>
        <button
          onClick={() => {
            setCardList(true);
          }}
        >
          찜한 여행
        </button>
        <button
          onClick={() => {
            setCardList(false);
          }}
        >
          내 댓글보기
        </button>
      </Selectdiv>

      {cardList ? (
        <div>
          {iLikedPost?.map((post, idx) => {
            return <BookedPostcard post={post} idx={idx} key={idx} />;
          })}
        </div>
      ) : (
        <div>
          {myReview.map((review, idx) => {
            return <MyReviewCard review={review} idx={idx} key={idx} />;
          })}
        </div>
      )}
      <Footer />
    </div>
  );
};

const Selectdiv = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 30px;
  button {
    background-color: ${({ theme }) => theme.colors.mainGreen};
    border: none;
    padding: 5px 10px;
    font-size: 15px;
  }
`;

export default Mypage;
