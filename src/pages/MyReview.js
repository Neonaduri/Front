import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { userAction } from "../redux/module/user";
import Titleline from "../components/elements/Titleline";
import back from "../static/images/icon/back.png";
import goRight from "../static/images/icon/goRight.png";
import { deleteCommentInMypageDB } from "../redux/module/user";
import Footer from "../components/common/Footer";
import ModalfixTime from "../components/common/ModalfixTime";
import NopostReview from "../components/mypage/NopostReview";

const MyReview = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const myReview = useSelector((state) => state.user.myReview);
  const [modalOpen, setModalOpen] = useState(false);
  const [delTargetId, setDelTargetId] = useState();
  const closeModal = () => {
    setModalOpen(false);
  };

  const displayedAt = (createdAt) => {
    const milliSeconds = new Date() - createdAt;
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  };

  const deleteBtnClick = (e) => {
    dispatch(deleteCommentInMypageDB(delTargetId));
    setModalOpen(false);
  };

  useEffect(() => {
    dispatch(userAction.getMyReviewDB());
  }, []);

  if (myReview?.length === 0) {
    return <NopostReview />;
  }
  return (
    <Container>
      <HeaderDiv>
        <img
          alt="back"
          src={back}
          onClick={() => {
            history.goBack();
          }}
        />
        <Titleline title={"내 댓글 보기"} />
        <div></div>
      </HeaderDiv>
      <BodyDiv>
        {myReview?.map((review, idx) => {
          const date = new Date(review.modifiedAt);
          const dateMillisecond = date.getTime() + 3600000 * 9;
          let content;
          if (review.reviewContents.length > 90) {
            content = `${review.reviewContents.substring(0, 90)} ...`;
          } else {
            content = review.reviewContents;
          }
          return (
            <CardContainer key={idx}>
              <CardHeadDiv>
                <small>{displayedAt(dateMillisecond)}</small>
                <span
                  onClick={() => {
                    setModalOpen(true);
                    setDelTargetId(review.reviewId);
                  }}
                  id={review.reviewId}
                >
                  삭제
                </span>
              </CardHeadDiv>
              <CardBodyDiv>
                <p>{content}</p>
                {review.reviewImgUrl === null ||
                review.reviewImgUrl === "" ? null : (
                  <img
                    alt="review"
                    src={review.reviewImgUrl}
                    onClick={() => {
                      history.push(`/detail/${review.postId}`);
                    }}
                  />
                )}
              </CardBodyDiv>
              <CardFooterDiv>
                <span
                  onClick={() => {
                    history.push(`/detail/${review.postId}`);
                  }}
                >
                  게시물보기
                </span>
                <img src={goRight} alt="go" />
              </CardFooterDiv>
            </CardContainer>
          );
        })}
        <ModalfixTime
          open={modalOpen}
          close={closeModal}
          header={
            <EditModal>
              <div>정말 삭제하시겠습니까?</div>
              <button onClick={deleteBtnClick}>삭제하기</button>
            </EditModal>
          }
        ></ModalfixTime>
      </BodyDiv>
      <FooterDiv>
        <Footer />
      </FooterDiv>
    </Container>
  );
};

const FooterDiv = styled.div`
  height: 8%;
`;

const BodyDiv = styled.div`
  height: 84%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  color: #363636;
  &::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const CardFooterDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  span {
    font-size: 12px;
    cursor: pointer;
  }
  img {
    width: 12px;
    cursor: pointer;
  }
`;

const CardBodyDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0px;
  img {
    width: 96px;
    height: 72px;
    border-radius: 5px;
    object-fit: cover;
    cursor: pointer;
  }
  p {
    font-size: 16px;
  }
`;

const CardHeadDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3px;
  small {
    color: ${({ theme }) => theme.colors.text3};
    font-family: "apple1";
  }
  span {
    background-color: ${({ theme }) => theme.colors.borderColor};
    margin-left: 10px;
    padding: 2px 5px;
    border-radius: 2px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text2};
    font-family: "apple1";
    cursor: pointer;
  }
`;

const CardContainer = styled.div`
  padding: 15px 15px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.borderColor};
`;

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 15px;
  height: 8%;
  img {
    width: 22px;
    margin-top: 8px;
    cursor: pointer;
  }
  div {
    padding-left: 30px;
  }
`;

const EditModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    font-size: 20px;
    margin-bottom: 15px;
    cursor: pointer;
  }
  button {
    background-color: ${({ theme }) => theme.colors.mainRed};
    color: white;
    padding: 10px 45px;
    border-radius: 10px;
    font-size: 18px;
    margin-bottom: -20px;
  }
`;

export default MyReview;
