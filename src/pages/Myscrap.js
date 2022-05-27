import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import back from "../static/images/icon/back.png";
import Titleline from "../components/elements/Titleline";
import { userAction } from "../redux/module/user";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import wish from "../static/images/icon/wish.png";
import wishgreen from "../static/images/icon/wishGreen.png";
import Footer from "../components/common/Footer";
import InfinityScroll from "../shared/InfinityScroll";
import Nopost from "../components/common/Nopost";

const Myscrap = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const myWishList = useSelector((state) => state.user.iLikedPost);
  const paging = useSelector((state) => state.user.paging);
  const lastPage = paging.lastPage;
  const isLoading = useSelector((state) => state.user.isLoading);
  const BodydivRef = useRef();

  const clickWishBtn = (e) => {
    const postId = e.target.id;
    dispatch(userAction.clickWishMyScrapDB(postId));
  };

  useEffect(() => {
    dispatch(userAction.getMyLikePostDB());
  }, []);

  if (myWishList?.length === 0) {
    return <Nopost title="스크랩 보기" content="스크랩한 여행이 없습니다." />;
  }

  return (
    <Container>
      <div>
        <Titleline
          title={"스크랩 보기"}
          onClick={() => {
            history.goBack();
          }}
        />
      </div>
      <Bodydiv ref={BodydivRef}>
        {myWishList?.length !== 0 ? (
          <InfinityScroll
            callNext={() => {
              dispatch(userAction.getMyLikePostDB(paging.start));
            }}
            is_next={lastPage ? false : true}
            loading={isLoading}
            ref={BodydivRef}
          >
            {myWishList?.map((plan, idx) => {
              return (
                <CardContainer key={idx}>
                  <ImgDiv>
                    <img src={plan.postImgUrl} alt="post" />
                  </ImgDiv>
                  <ContentDiv
                    onClick={() => history.push(`/detail/${plan.postId}`)}
                  >
                    <SmallBtndiv>
                      <span>{plan.location}</span>
                      <span>{plan.theme}</span>
                    </SmallBtndiv>
                    <TitleDiv>
                      <h3>{plan.postTitle}</h3>
                    </TitleDiv>
                    <Datediv>
                      {plan.startDate} ~ {plan.endDate}
                    </Datediv>
                  </ContentDiv>
                  <Wishdiv>
                    {plan.islike ? (
                      <img
                        alt="onwish"
                        src={wishgreen}
                        onClick={(e) => clickWishBtn(e)}
                        id={plan.postId}
                      />
                    ) : (
                      <img
                        alt="wish"
                        src={wish}
                        onClick={(e) => clickWishBtn(e)}
                        id={plan.postId}
                      />
                    )}
                  </Wishdiv>
                </CardContainer>
              );
            })}
          </InfinityScroll>
        ) : null}
      </Bodydiv>
      <Footer />
    </Container>
  );
};

const Wishdiv = styled.div`
  img {
    width: 40px;
  }
`;

const Bodydiv = styled.div`
  height: 85%;
  overflow: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }
`;
const Container = styled.div`
  height: 97%;
  margin-bottom: 20px;
`;

const Datediv = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text3};
  font-family: "apple1";
`;

const TitleDiv = styled.div`
  margin: 10px 0px;
  h3 {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.text1};
  }
`;

const SmallBtndiv = styled.div`
  span {
    background-color: ${({ theme }) => theme.colors.borderColor};
    padding: 2px 2px;
    border-radius: 2px;
    font-size: 11px;
    margin-right: 5px;
    color: ${({ theme }) => theme.colors.text2};
  }
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  width: 153px;
  margin-left: 3px;
`;

const ImgDiv = styled.div`
  img {
    width: 150px;
    height: 95px;
    border-radius: 5px;
    object-fit: cover;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 13px;
`;

export default Myscrap;
