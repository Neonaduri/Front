import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

const Menuline = () => {
  const history = useHistory();
  return (
    <Menu>
      <button
        onClick={() => {
          history.push("/");
        }}
      >
        홈
      </button>
      <button
        onClick={() => {
          history.push("/search");
        }}
      >
        검색
      </button>
      <button
        onClick={() => {
          history.push("/myplan");
        }}
      >
        계획
      </button>
      <button
        onClick={() => {
          history.push("/mypage");
        }}
      >
        마이페이지
      </button>
    </Menu>
  );
};

const Menu = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #cacaca;
  button {
    background-color: inherit;
    border: none;
    font-size: 15px;
  }
`;

export default Menuline;
