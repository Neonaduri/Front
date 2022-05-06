import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import home from "../../static/images/icon/home.png";
import mypage from "../../static/images/icon/mypage.png";
import searchIcon from "../../static/images/icon/searchIcon.png";
import plan from "../../static/images/icon/plan.png";

const Footer = (props) => {
  const history = useHistory();
  return (
    <>
      <Total>
        <Box>
          <div
            onClick={() => {
              history.push("/");
            }}
          >
            <Logo src={home}></Logo>
          </div>
          <div
            onClick={() => {
              history.push("/search");
            }}
          >
            <Logo src={searchIcon}></Logo>
          </div>
          <div
            onClick={() => {
              history.push("/myplan");
            }}
          >
            <Logo src={plan}></Logo>
          </div>
          <div
            onClick={() => {
              history.push("/mypage");
            }}
          >
            <Logo src={mypage}></Logo>
          </div>

          <Bar></Bar>
        </Box>
      </Total>
    </>
  );
};

export default Footer;

const Total = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  width: 100%;
  background-color: white;
`;

const Bar = styled.div`
  position: absolute;
  width: 130px;
  height: 5px;
  left: 123px;
  top: 598px;
  background: #000000;
  border-radius: 50px;
`;

const Box = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
`;

const Logo = styled.img`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 50px;
`;
