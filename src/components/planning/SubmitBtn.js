import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import { getDatabase, ref, onValue } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { planAction } from "../../redux/module/plan";
import Modalroompass from "../common/Modalroompass";

const SubmitBtn = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const postId = useParams().postId;
  const db = getDatabase();
  const isLogin = useSelector((state) => state.user.isLogin);
  const [fixedPlan, setFixedPlan] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fixedPlanRef = ref(db, `${postId}`);
    onValue(fixedPlanRef, (snapshot) => {
      let fixedPlan = snapshot.val();
      if (fixedPlan !== null) {
        setFixedPlan(fixedPlan);
      } else {
        return;
      }
    });
  }, []);

  const submitPlanPublic = () => {
    if (fixedPlan.allPlan === undefined) {
      alert("저장된 플랜이 없습니다.");
      return;
    } else if (fixedPlan.allPlan !== undefined) {
      const allPlanValues = Object.values(fixedPlan.allPlan);

      let allPlan = [];
      for (let i = 0; i < allPlanValues.length; i++) {
        const value = Object.values(allPlanValues[i]);
        allPlan.push({ places: value });
      }
      const data = {
        postId: fixedPlan.postId,
        startDate: fixedPlan.startDate,
        endDate: fixedPlan.endDate,
        dateCnt: fixedPlan.dateCnt,
        postTitle: fixedPlan.title,
        location: fixedPlan.location,
        theme: fixedPlan.theme,
        islike: false,
        ispublic: true,
        days: allPlan,
      };
      // console.log(data);
      dispatch(planAction.completePlanDB(data));
    }
  };
  const submitPlanPrivate = () => {
    if (fixedPlan.allPlan === undefined) {
      alert("저장된 플랜이 없습니다.");
      return;
    } else if (fixedPlan.allPlan !== undefined) {
      const allPlanValues = Object.values(fixedPlan.allPlan);

      let allPlan = [];
      for (let i = 0; i < allPlanValues.length; i++) {
        const value = Object.values(allPlanValues[i]);
        allPlan.push({ places: value });
      }
      const data = {
        postId: fixedPlan.postId,
        startDate: fixedPlan.startDate,
        endDate: fixedPlan.endDate,
        dateCnt: fixedPlan.dateCnt,
        postTitle: fixedPlan.title,
        location: fixedPlan.location,
        theme: fixedPlan.theme,
        islike: false,
        ispublic: false,
        days: allPlan,
      };

      dispatch(planAction.completePlanDB(data));
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const copyLink = () => {
    const url = window.location.href + "/join";
    navigator.clipboard.writeText(url);
    setModalOpen(false);
  };
  const copyLinkBtnClick = () => {
    setModalOpen(true);
  };

  if (!isLogin) {
    return null;
  }

  return (
    <Container>
      <button onClick={copyLinkBtnClick}>초대URL 복사하기</button>
      <button onClick={submitPlanPrivate}>나만보기</button>
      <button onClick={submitPlanPublic}>자랑하기</button>
      <Modalroompass
        open={modalOpen}
        close={closeModal}
        header={
          <ModalContent>
            <input
              defaultValue={window.location.href + "/join"}
              disabled={true}
            ></input>
            <ModalBtn onClick={copyLink}>URL 복사하기</ModalBtn>
            <ModalBtn
              onClick={() => {
                setModalOpen(false);
              }}
            >
              닫기
            </ModalBtn>
          </ModalContent>
        }
      ></Modalroompass>
    </Container>
  );
};

const ModalBtn = styled.button`
  background-color: #62ce8b;
  border-radius: 10px;
  color: white;
  display: block;
  height: 40px;
  margin-bottom: 10px;
`;
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  input {
    width: 90%;
    margin-bottom: 20px;
    font-size: 15px;
    padding: 5px;
    border-radius: 15px;
    border: 1px solid black;
    background-color: inherit;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  button {
    width: 30%;
    padding: 5px 0px;
  }
`;

export default SubmitBtn;
