import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { getDatabase, ref, onValue } from "firebase/database";

const SubmitBtn = () => {
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
    console.log(fixedPlan);
    const allPlanKeys = Object.keys(fixedPlan.allPlan);
    const allPlanValues = Object.values(fixedPlan.allPlan);
    let allPlan;
    for (let i = 0; i < allPlanValues.length; i++) {
      const key = parseInt([i]) + 1;
      const value = Object.values(allPlanValues[i]);
      allPlan = { ...allPlan, [key]: value };
    }
    const data = {
      postId: fixedPlan.postId,
      startDate: fixedPlan.startDate,
      endDate: fixedPlan.endDate,
      dateCnt: fixedPlan.dateCnt,
      title: fixedPlan.title,
      location: fixedPlan.location,
      theme: fixedPlan.theme,
      islike: false,
      allPlan: allPlan,
    };
    console.log(data);
  };
  const submitPlanPrivate = () => {};

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
