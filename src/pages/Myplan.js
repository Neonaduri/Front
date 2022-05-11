import React, { useEffect, useState, useRef } from "react";
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
import mapSmall from "../static/images/icon/map_small_img.png";
import imgLogin from "../static/images/icon/loginCharacter.png";

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

  const deleteBtnClick = () => {
    dispatch(planAction.deleteMyPlanDB(clickedId));
    setModalOpen(false);
  };

  useEffect(() => {
    dispatch(planAction.getMyPlanPage1DB());
  }, []);
  const closeModal = () => {
    setModalOpen(false);
  };

  if (myAllPlan.length === 0) {
    return (
      <>
        <NopostContainer>
          <div style={{ marginTop: "-20px" }}>
            <Titleline title={"계획"} />
          </div>
          <div>
            <img src={imgLogin} />
            <span>등록된 계획표가 없습니다!</span>
            <button
              onClick={() => {
                history.push("/planning");
              }}
            >
              계획하러 가기!
            </button>
          </div>
        </NopostContainer>
        <Footer />
      </>
    );
  }

  return (
    <div style={{ height: "100%" }}>
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
      <div style={{ backgroundColor: "#f5f5f5", padding: " 10px 15px" }}>
        <span style={{ fontSize: "16px" }}>나의 계획표</span>
      </div>
      <Middlediv id="container">
        <InfinityScroll
          callNext={() => {
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
                    <span>{plan.postTitle}</span>
                    <span>{plan.theme}</span>
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
                  >
                    <div>
                      <img src={mapSmall} />
                      <span>{plan.location}</span>
                    </div>
                    <small>
                      {plan.startDate}~{plan.endDate}
                    </small>
                  </div>
                  <div>
                    <button>여행 후기 남기기</button>
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

const NopostContainer = styled.div`
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    margin-top: 20px;
    img {
      margin-top: 50px;
      width: 170px;
      margin-bottom: 10px;
    }
    span {
      margin-top: 20px;
      font-size: 20px;
      margin-bottom: 20px;
    }
    button {
      background-color: #62ce8b;
      border: none;
      padding: 15px 30px;
      margin-top: 20px;
      border-radius: 10px;
      font-size: 18px;
      color: white;
    }
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
    font-size: 18px;
  }
`;

const BottomCarddiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
  padding: 0px 10px;
  div {
    &:first-child {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      small {
        color: #8d8d8d;
      }
      div {
        width: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        img {
          padding-top: 2px;
          width: 18px;
        }
      }
    }
    &:last-child {
      display: flex;
      justify-content: center;
      border-top: 1px solid #f5f5f5;
      padding: 10px 0px;
      button {
        padding: 5px 0px;
        background-color: inherit;
        border: none;
        font-size: 16px;
        color: #62ce8b;
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
    color: black;
    img {
      height: 17px;
      color: black;
    }
  }
  div {
    display: flex;
    align-items: center;
    span {
      &:first-child {
        font-size: 20px;
      }
      &:nth-child(2) {
        background-color: #eeeeee;
        margin-left: 10px;
        padding: 2px 2px;
        border-radius: 2px;
        font-size: 12px;
        color: #8d8d8d;
      }
    }
  }
`;

const Plusdiv = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  button {
    width: 70%;
    height: 50px;
    background-color: #62ce8b;
    border: none;
    border-radius: 8px;
    color: white;
    font-size: 15px;
  }
`;

const PostCard = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin: 5px 2px;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const Middlediv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
  height: 60%;
  overflow: scroll;
  background-color: #f5f5f5;
`;

export default Myplan;
