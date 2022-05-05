import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";

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
            홈
          </div>
          <div
            onClick={() => {
              history.push("/search");
            }}
          >
            검색
          </div>
          <div
            onClick={() => {
              history.push("/planning");
            }}
          >
            계획
          </div>
          <div>마이페이지</div>
        </Box>

        <Bar></Bar>
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
  background-color: #ddd;
`;

const Bar = styled.div`
  position: absolute;
  width: 130px;
  height: 5px;
  left: 123px;
  top: 798px;
  background: #000000;
  border-radius: 50px;
`;

const Box = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: #565656;
`;
