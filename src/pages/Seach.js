import React from "react";
import styled from "styled-components";
import search from "../static/images/search.png";

const Seach = (props) => {
  return (
    <>
      <Input placeholder="원하시는 여행지역을 입력해주세요 :)" />
      <I src={search}></I>
    </>
  );
};

export default Seach;

const Input = styled.input`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 40px;
  position: relative;
  width: 319px;
  height: 36px;
  left: calc(50% - 319px / 2);
  top: 0;
  background: #ebebeb;
  border-radius: 10px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  margin: 10px 0px;
  border: none;
  font-size: 15px;
`;

const I = styled.img`
  position: absolute;
  color: gray;
  left: 40px;
  top: 18px;
`;
