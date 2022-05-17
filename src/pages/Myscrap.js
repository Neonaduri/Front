import React, { useEffect } from "react";
import styled from "styled-components";
import back from "../static/images/icon/back.png";
import Titleline from "../components/elements/Titleline";
import { userAction } from "../redux/module/user";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import wish from "../static/images/icon/wish2x.png";
import wishgreen from "../static/images/icon/wishGreen.png";

const Myscrap = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const myWishList = useSelector((state) => state.user.iLikedPost);

  const clickWishBtn = (e) => {
    const postId = e.target.id;
    dispatch(userAction.clickWishMyScrapDB(postId));
  };

  useEffect(() => {
    dispatch(userAction.getMyLikePostDB());
  }, []);

  return (
    <div>
      <HeaderDiv>
        <img
          src={back}
          onClick={() => {
            history.goBack();
          }}
        />
        <Titleline title={"스크랩 보기"} />
        <div></div>
      </HeaderDiv>
      {myWishList?.map((plan, idx) => {
        return (
          <CardContainer key={idx}>
            <ImgDiv>
              <img src={plan.postImgUrl} />
            </ImgDiv>
            <ContentDiv onClick={() => history.push(`/detail/${plan.postId}`)}>
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
            <div>
              {plan.islike ? (
                <img
                  src={wishgreen}
                  onClick={(e) => clickWishBtn(e)}
                  id={plan.postId}
                />
              ) : (
                <img
                  src={wish}
                  onClick={(e) => clickWishBtn(e)}
                  id={plan.postId}
                />
              )}
            </div>
          </CardContainer>
        );
      })}
    </div>
  );
};

const Datediv = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text3};
`;

const TitleDiv = styled.div`
  margin: 5px 0px;
  h3 {
    font-size: 16px;
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
`;

const ImgDiv = styled.div`
  img {
    width: 153px;
    height: 95px;
    border-radius: 5px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 7px 13px;
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
    padding-left: 30px;
  }
`;

export default Myscrap;
