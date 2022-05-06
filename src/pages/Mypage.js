import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Titleline from "../components/elements/Titleline";
import { FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { userAction } from "../redux/module/user";
import { useHistory } from "react-router";
import Footer from "../components/common/Footer";

const Mypage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.list);
  const iLikedPost = useSelector((state) => state.user.iLikedPost?.postList);
  const myReview = useSelector((state) => state.user.myReview);
  const [cardList, setCardList] = useState(true);

  useEffect(() => {
    dispatch(userAction.getMyLikePostDB());
    dispatch(userAction.getMyReviewDB());
  }, []);

  return (
    <div>
      <Titleline title={"마이페이지"} />
      <Myinfodiv>
        <img src={userInfo.profileImg} />
        <span>{userInfo.nickName}</span>
        <span>{userInfo?.username}</span>
        <div>
          <FaHeart style={{ color: "red", marginRight: "5px" }} />
          <span>{userInfo.totalLike}</span>
        </div>
        <button
          onClick={() => {
            history.push("/editprofile");
          }}
        >
          수정하기
        </button>
      </Myinfodiv>
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
            return (
              <PostCard key={idx}>
                <div>
                  <img src={post.postImg}></img>
                </div>
                <div>
                  <span>{post.title}</span>
                  <span>
                    {post.startDate}~{post.endDate}
                  </span>
                  <span>{post.location}</span>
                </div>
              </PostCard>
            );
          })}
        </div>
      ) : (
        <div>
          {myReview.map((review, idx) => {
            return (
              <ReviewCard key={idx}>
                <span>{review.nickName}</span>
                <span>{review.reviewComment}</span>
              </ReviewCard>
            );
          })}
        </div>
      )}
    </div>
  );
};
const ReviewCard = styled.div`
  span {
    margin-right: 10px;
  }
`;

const PostCard = styled.div`
  margin-bottom: 5px;
  display: flex;
  img {
    width: 210px;
    height: 120px;
    border-radius: 10px;
    filter: brightness(40%);
  }
  div {
    &:last-child {
      position: absolute;
      height: 120px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      span {
        color: white;
      }
    }
  }
`;

const Selectdiv = styled.div`
  border-top: 1px solid #cacaca;
  border-bottom: 1px solid #cacaca;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 30px;
  button {
    background-color: #cacaca;
    border: none;
    padding: 5px 10px;
    font-size: 15px;
  }
`;

const Myinfodiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  div {
    display: flex;
  }
`;

export default Mypage;
