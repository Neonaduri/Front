import React from "react";
import styled from "styled-components";
import PC from "../static/images/PC.png";

const FullScreen = () => {
  return <Fullscreen></Fullscreen>;
};

export default FullScreen;

const Fullscreen = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${PC});
  background-position: contain;
  /* cover => containㅂㅏ꿈(머리잘리는거 방지...) */
  background-size: cover;
  background-repeat: no-repeat;
  margin: auto;
  /* margin-bottom: 30px; */
  display: flex;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 540px) {
    justify-content: center;
  }
  @media (max-width: 1579px) and (min-width: 541px) {
    justify-content: flex-end;
  }
  @media (min-width: 1580px) {
  }
`;
