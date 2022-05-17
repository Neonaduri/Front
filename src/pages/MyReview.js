import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { userAction } from "../redux/module/user";
import Titleline from "../components/elements/Titleline";
import back from "../static/images/icon/back.png";
import goRight from "../static/images/icon/goRight.png";
import { deleteCommentInMypageDB } from "../redux/module/user";
import Footer from "../components/common/Footer";

const MyReview = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const myReview = useSelector((state) => state.user.myReview);

  const deleteBtnClick = (e) => {
    const reviewId = e.target.id;
    dispatch(deleteCommentInMypageDB(reviewId));
  };

  useEffect(() => {
    dispatch(userAction.getMyReviewDB());
  }, []);

  return (
    <Container>
      <HeaderDiv>
        <img
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
          return (
            <CardContainer key={idx}>
              <CardHeadDiv>
                <small>{review.modifiedAt}</small>
                <span onClick={(e) => deleteBtnClick(e)} id={review.reviewId}>
                  삭제
                </span>
              </CardHeadDiv>
              <CardBodyDiv>
                <p>{review.reviewContents}</p>
                {review.reviewImgUrl === null ? null : (
                  <img src={review.reviewImgUrl} />
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
                <img src={goRight} />
              </CardFooterDiv>
            </CardContainer>
          );
        })}
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
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const CardFooterDiv = styled.div`
  display: flex;
  align-items: center;
  span {
    font-size: 12px;
  }
  img {
    width: 12px;
  }
`;

const CardBodyDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 75px;
  overflow-y: scroll;
  img {
    width: 96px;
    height: 72px;
    border-radius: 5px;
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
  }
  span {
    background-color: ${({ theme }) => theme.colors.borderColor};
    margin-left: 10px;
    padding: 2px 5px;
    border-radius: 2px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text2};
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
    margin-top: 6px;
  }
  div {
    padding-left: 30px;
  }
`;

export default MyReview;
