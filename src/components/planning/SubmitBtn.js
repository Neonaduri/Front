import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { getDatabase, ref, onValue } from "firebase/database";
import { useDispatch } from "react-redux";
import { planAction } from "../../redux/module/plan";

const SubmitBtn = () => {
  const dispatch = useDispatch();
  const postId = useParams().postId;
  const db = getDatabase();
  const [fixedPlan, setFixedPlan] = useState();

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
      console.log(data);
      // dispatch(planAction.completePlanDB(data));
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
      console.log(data);
      // dispatch(planAction.completePlanDB(data));
    }
  };

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
  button {
    width: 30%;
    padding: 5px 0px;
  }
`;

export default SubmitBtn;
