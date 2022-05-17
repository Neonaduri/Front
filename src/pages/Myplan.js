import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import Titleline from "../components/elements/Titleline";
import { planAction } from "../redux/module/plan";
import Footer from "../components/common/Footer";
import hamburger from "../static/images/icon/hamburger.png";
import ModalfixTime from "../components/common/ModalfixTime";
import InfinityScroll from "../shared/InfinityScroll";
import mapSmall from "../static/images/icon/map_small_img.png";
import NopostAlert from "../components/myplan/NopostAlert";

const Myplan = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const myAllPlan = useSelector((state) => state.plan.myPlanList);
  const paging = useSelector((state) => state.plan.paging);
  const lastPage = useSelector((state) => state.plan.paging.lastPage);
  const isLoading = useSelector((state) => state.plan.isLoading);
  const [modalOpen, setModalOpen] = useState(false);
  const [clickedId, setClickedId] = useState();
  const middledivRef = useRef();

  console.log(paging, lastPage, isLoading);

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

  if (!isLogin) {
    history.replace("/login");
  }

  if (myAllPlan.length === 0) {
    return <NopostAlert />;
  }

  return (
    <Container>
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
      <MyplanTextdiv>
        <span>나의 계획표</span>
      </MyplanTextdiv>
      <Middlediv ref={middledivRef} id="container">
        <InfinityScroll
          callNext={() => {
            dispatch(planAction.getMyPlanNextPageDB(paging.start));
          }}
          is_next={lastPage ? false : true}
          loading={isLoading}
          ref={middledivRef}
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
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
`;

const MyplanTextdiv = styled.div`
  background-color: ${({ theme }) => theme.colors.borderColor};
  padding: 10px 15px;
  font-size: 16px;
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
    margin-bottom: 5px;
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
        color: ${({ theme }) => theme.colors.text2};
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
      border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
      padding: 10px 0px;
      margin-top: 3px;
      button {
        padding: 3px 0px;
        background-color: inherit;
        border: none;
        font-size: 16px;
        color: ${({ theme }) => theme.colors.mainGreen};
      }
    }
  }
`;
const UpperCarddiv = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
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
        background-color: ${({ theme }) => theme.colors.borderColor};
        margin-left: 10px;
        padding: 2px 2px;
        border-radius: 2px;
        font-size: 12px;
        color: ${({ theme }) => theme.colors.text2};
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
    background-color: ${({ theme }) => theme.colors.mainGreen};
    border: none;
    border-radius: 8px;
    color: white;
    font-size: 15px;
  }
`;

const PostCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
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
  background-color: ${({ theme }) => theme.colors.borderColor};
`;

export default Myplan;
