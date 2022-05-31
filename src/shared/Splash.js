import React from "react";
import styled from "styled-components";
import splash from "../static/images/bgImage/splash.webp";

const Splash = () => {
  return (
    <Outter>
      <img src={splash} alt="splash"></img>
    </Outter>
  );
};

const Outter = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export default Splash;
