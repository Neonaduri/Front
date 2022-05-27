import React from "react";
import styled from "styled-components";
import back from "../../static/images/icon/back.png";

const Titleline = ({ title, onClick, backBtn = true }) => {
  return (
    <Titlepart>
      {backBtn ? <img src={back} alt="back" onClick={onClick} /> : null}
      <span backBtn={backBtn}>{title}</span>
    </Titlepart>
  );
};

const Titlepart = styled.div`
  padding: 15px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  position: relative;
  span {
    font-family: "apple3";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  img {
    width: 30px;
    cursor: pointer;
  }
`;

export default Titleline;
