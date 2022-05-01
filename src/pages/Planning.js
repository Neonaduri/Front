import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import Mappart from "../components/planning/Mappart";
import Schedule from "../components/planning/Schedule";
import { planAction } from "../redux/module/plan";
import MappartR from "../components/planning/MappartR";

const Planning = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const postId = params.postId;

  useEffect(() => {
    dispatch(planAction.getRoomDB(postId));
  }, []);

  return (
    <div>
      <MappartR />
      <Schedule />
    </div>
  );
};

const DayBtnDiv = styled.div`
  z-index: 2;
  position: absolute;
  width: 90%;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  button {
    border: none;
    width: 45px;
    height: 28px;
    background-color: green;
    border-radius: 20px;
  }
`;
export default Planning;
