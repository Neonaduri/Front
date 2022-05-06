import React from "react";
import styled from "styled-components";
import Logo from "../static/images/Logo.png";

const Splash = () => {
  return (
    <Outter>
      <img src={Logo}></img>
    </Outter>
  );
};

const Outter = styled.div`
  background-color: #62ce8b;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 70px;
  }
`;

export default Splash;
