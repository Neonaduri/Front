import React from "react";
import styled from "styled-components";
import splash from "../static/images/bgImage/splash.png";

const Splash = () => {
  return (
    <Outter>
      <img src={splash}></img>
    </Outter>
  );
};

const Outter = styled.div`
  background-color: #41b67e;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export default Splash;
