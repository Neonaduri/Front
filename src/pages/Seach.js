import React from "react";
import styled from "styled-components";
import search from "../static/images/icon/search.png";

const Seach = (props) => {
  return (
    <>
      <Inputbox>
        <Input placeholder="어떤 여행 계획표를 찾으시나요?" />
      </Inputbox>

      <I src={search}></I>
    </>
  );
};

export default Seach;

const I = styled.img`
  position: absolute;
  color: gray;
  left: 40px;
  top: 38px;
`;

const Input = styled.input`
  padding: 0 35px;
  font-size: 20px;

  /* &::placeholder {
    outline: none;
    color: #cacaca;
  } */
`;

const Inputbox = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: auto;
  margin-top: 20px;

  input {
    font-size: 17px;
    height: 40px;
    margin-bottom: 20px;
    border: none;
    border-bottom: 2px solid #eeeeee;
    margin-top: 10px;
    transition: 0.3s;
    &:focus {
      outline: none;
      border-bottom: 2px solid #62ce8b;
    }
  }
`;
