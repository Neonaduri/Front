import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import Titleline from "../components/elements/Titleline";
import { planAction } from "../redux/module/plan";

import { FaPlus } from "react-icons/fa";
import Footer from "../components/common/Footer";

const Myplan = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const myAllPlan = useSelector((state) => state.plan.list.postList);

  useEffect(() => {
    dispatch(planAction.getMyPlanDB());
  }, []);
  return (
    <div>
      <Titleline title={"내가 계획한 여행"} />
      <Plusdiv
        onClick={() => {
          history.push("/planning");
        }}
      >
        <FaPlus style={{ fontSize: "35px", color: "white" }} />
      </Plusdiv>
      <Middlediv>
        {myAllPlan?.map((plan, idx) => {
          return (
            <PostCard key={idx}>
              <div>
                <img src={plan.postImg}></img>
              </div>
              <div>
                <span>{plan.title}</span>
                <span>
                  {plan.startDate}~{plan.endDate}
                </span>
                <span>{plan.location}</span>
              </div>
            </PostCard>
          );
        })}
      </Middlediv>
    </div>
  );
};
const Plusdiv = styled.div`
  width: 90%;
  height: 100px;
  background-color: #8d8d8d;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin: 20px auto;
`;

const PostCard = styled.div`
  margin-bottom: 5px;
  display: flex;
  img {
    width: 210px;
    height: 120px;
    border-radius: 10px;
    filter: brightness(40%);
  }
  div {
    &:last-child {
      position: absolute;
      height: 120px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      span {
        color: white;
      }
    }
  }
`;

const Middlediv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
`;

export default Myplan;
