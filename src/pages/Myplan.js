import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import Titleline from "../components/elements/Titleline";
import { planAction } from "../redux/module/plan";
import Footer from "../components/common/Footer";
import hamburger from "../static/images/icon/hamburger.png";
import love from "../static/images/icon/love.png";
import talkbox from "../static/images/icon/Union.png";
import ModalfixTime from "../components/common/ModalfixTime";
import InfinityScroll from "../shared/InfinityScroll";

const Myplan = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const myAllPlan = useSelector((state) => state.plan.myPlanList);
  const paging = useSelector((state) => state.plan.paging);
  const lastPage = useSelector((state) => state.plan.paging.lastPage);
  const isLoading = useSelector((state) => state.plan.isLoading);
  const [modalOpen, setModalOpen] = useState(false);
  const [clickedId, setClickedId] = useState();
  const moreBtnClick = (e) => {
    setModalOpen(true);
    setClickedId(e.target.id);
  };

  const deleteBtnClick = (e) => {
    dispatch(planAction.deleteMyPlanDB(clickedId));
    setModalOpen(false);
  };

  useEffect(() => {
    dispatch(planAction.getMyPlanPage1DB());
  }, []);

  const closeModal = () => {
    setModalOpen(false);
  };
  if (!myAllPlan) {
    return (
      <div>
        <span>내가 작성한 계획이 없습니다</span>
      </div>
    );
  }

  return (
    <div>
      <Titleline title={"계획"} />
      <Plusdiv>
        <button
          onClick={() => {
            history.push("/planning");
          }}
        >
          계획하러 가기!
        </button>
      </Plusdiv>
      <Middlediv id="container">
        <h2>나의 계획표</h2>
        <InfinityScroll
          callNext={() => {
            console.log("gi");
            dispatch(planAction.getMyPlanNextPageDB(paging.start));
          }}
          is_next={lastPage ? false : true}
          loading={isLoading}
        >
          {myAllPlan?.map((plan, idx) => {
            return (
              <PostCard key={idx}>
                <UpperCarddiv>
                  <div>
                    <span>{plan.startDate}</span>
                    <span> ~ </span>
                    <span>{plan.endDate}</span>
                  </div>
                  <button onClick={(e) => moreBtnClick(e)}>
                    <img src={hamburger} id={plan.postId} />
                  </button>
                </UpperCarddiv>
                <BottomCarddiv>
                  <div
                    onClick={() => {
                      history.push(`/detail/${plan.postId}`);
                    }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <span>{plan.postTitle}</span>
                    <Socialdiv>
                      <img src={love}></img>
                      <span>{plan.likeCnt}</span>
                      <img src={talkbox}></img>
                      <span>{plan.reviewCnt}</span>
                    </Socialdiv>
                  </div>
                  <div>
                    <button>리뷰쓰기</button>
                  </div>
                </BottomCarddiv>
                <ModalfixTime
                  open={modalOpen}
                  close={closeModal}
                  header={
                    <EditModal>
                      <div>수정하기</div>
                      <div id={plan.postId} onClick={deleteBtnClick}>
                        삭제하기
                      </div>
                    </EditModal>
                  }
                ></ModalfixTime>
              </PostCard>
            );
          })}
        </InfinityScroll>
      </Middlediv>
      <Footer />
    </div>
  );
};
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
    font-size: 18px;
  }
`;

const Socialdiv = styled.div`
  width: 110px;
  height: 15px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-left: 5px;
  span {
    margin-right: 10px;
  }
`;

const BottomCarddiv = styled.div`
  display: flex;
  justify-content: space-between;
  height: 60px;
  align-items: center;
  padding: 0px 10px;
  div {
    &:first-child {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    &:last-child {
      button {
        padding: 5px 15px;
        background-color: inherit;
        border: 1px solid #62ce8b;
        border-radius: 8px;
        font-size: 16px;
      }
    }
  }
`;
const UpperCarddiv = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  align-items: center;
  justify-content: space-between;
  padding: 7px 10px;
  height: 40px;
  button {
    background-color: inherit;
    border: none;
    margin-right: 5px;
  }
`;

const Plusdiv = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 5px solid #cacaca;
  margin: 10px auto;
  button {
    width: 70%;
    height: 50px;
    background-color: #62ce8b;
    border: none;
    border-radius: 25px;
    color: white;
    font-size: 15px;
  }
`;

const PostCard = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  margin: 5px 2px;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.1);
`;

const Middlediv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
  overflow: scroll;
  height: 440px;
`;

export default Myplan;
