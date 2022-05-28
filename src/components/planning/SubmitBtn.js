import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { planAction } from "../../redux/module/plan";

const SubmitBtn = ({ dateCnt }) => {
  const dispatch = useDispatch();
  const postId = useParams().postId;
  const db = getDatabase();
  const loginUser = useSelector((state) => state.user.list);
  const roomOwner = useSelector((state) => state.plan.list.user);
  const [fixedPlan, setFixedPlan] = useState();

  useEffect(() => {
    const fixedPlanRef = ref(db, `${postId}`);
    const value = onValue(fixedPlanRef, (snapshot) => {
      let fixedPlan = snapshot.val();
      if (fixedPlan !== null) {
        setFixedPlan(fixedPlan);
      } else {
        return;
      }
    });
    return () => value();
  }, []);

  const submitPlanPublic = () => {
    let nullObj = {};
    for (let i = 1; i <= dateCnt; i++) {
      nullObj[`day${i}`] = {};
    }
    const finalObj = Object.assign(nullObj, fixedPlan.allPlan);

    if (fixedPlan.allPlan === undefined) {
      alert("저장된 플랜이 없습니다.");
      return;
    } else if (fixedPlan.allPlan !== undefined) {
      const allPlanValues = Object.values(finalObj);

      let allPlan = [];
      for (let i = 0; i < allPlanValues.length; i++) {
        const value = Object.values(allPlanValues[i]);
        allPlan.push({ places: value });
      }

      const data = {
        postUUID: fixedPlan.postId,
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
      dispatch(planAction.completePlanDB(data));

      const clearPlanRef = ref(db, `${postId}`);
      remove(clearPlanRef);
    }
  };
  const submitPlanPrivate = () => {
    let nullObj = {};
    for (let i = 1; i <= dateCnt; i++) {
      nullObj[`day${i}`] = {};
    }
    const finalObj = Object.assign(nullObj, fixedPlan.allPlan);

    if (fixedPlan.allPlan === undefined) {
      alert("저장된 플랜이 없습니다.");
      return;
    } else if (fixedPlan.allPlan !== undefined) {
      const allPlanValues = Object.values(finalObj);

      let allPlan = [];
      for (let i = 0; i < allPlanValues.length; i++) {
        const value = Object.values(allPlanValues[i]);
        allPlan.push({ places: value });
      }

      const data = {
        postUUID: fixedPlan.postId,
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

      const clearPlanRef = ref(db, `${postId}`);
      remove(clearPlanRef);
    }
  };

  if (roomOwner.userName !== loginUser.userName) {
    return (
      <Container>
        <span>계획 저장은 방장만 가능합니다.</span>
      </Container>
    );
  }
  return (
    <Container>
      <button onClick={submitPlanPrivate}>나만보기</button>
      <button onClick={submitPlanPublic}>자랑하기</button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  padding-bottom: 15px;
  padding-top: 5px;
  button {
    width: 40%;
    padding: 5px 0px;
    &:first-child {
      border: 1px solid ${({ theme }) => theme.colors.text3};
      border-radius: 5px;
      background-color: white;
      color: ${({ theme }) => theme.colors.text2};
      padding: 10px 0px;
      font-size: 16px;
    }
    &:last-child {
      border-radius: 5px;
      background-color: ${({ theme }) => theme.colors.mainGreen};
      color: white;
      padding: 10px 0px;
      font-size: 16px;
      border: none;
    }
  }
`;

export default SubmitBtn;
