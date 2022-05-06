import React, { useState } from "react";
import styled from "styled-components";
import Footer from "../components/common/Footer";
import search from "../static/images/icon/search.png";
import { keywordSuggestList } from "../components/elements/ArrValue";
import { useDispatch } from "react-redux";

const Search = (props) => {
  const dispatch = useDispatch();

  const suggestBtnClick = (e) => {
    console.log(e.target.id);
  };
  return (
    <Container>
      <div>
        <Input placeholder="어떤 여행 계획표를 찾으시나요?" />
        <I src={search}></I>
      </div>
      <Suggest>
        <h4>추천키워드</h4>
        <div>
          {keywordSuggestList.map((keyword, idx) => {
            return (
              <button key={idx} onClick={suggestBtnClick} id={keyword}>
                {keyword}
              </button>
            );
          })}
        </div>
      </Suggest>
      <Footer />
    </Container>
  );
};

export default Search;

const Suggest = styled.div`
  padding: 10px 20px;
  h4 {
    font-size: 16px;
    font-weight: 500;
    margin-left: 5px;
  }
  div {
    margin-top: 10px;
    width: 100%;
  }
  button {
    background-color: inherit;
    border-radius: 20px;
    border: 1px solid black;
    padding: 5px 10px;
    margin-right: 8px;
    margin-bottom: 5px;
  }
`;

const Input = styled.input`
  width: 80%;
  display: flex;
  margin: auto;
  margin-top: 20px;
  border: none;
  border-bottom: 1px solid black;
  padding: 5px 25px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-bottom: 1px solid #62ce8b;
  }
`;

const I = styled.img`
  position: absolute;
  left: 45px;
  top: 6px;
`;
const Container = styled.div`
  position: relative;
`;
