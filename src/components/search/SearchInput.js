import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { getKeywordPostDB, keywordDB } from "../../redux/module/post";
import back from "../../static/images/icon/back.png";
import search from "../../static/images/icon/search.png";

const SearchInput = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const searchEnter = (e) => {
    if (e.key === "Enter") {
      dispatch(keywordDB(e.target.value));
      dispatch(getKeywordPostDB(e.target.value));
      history.push("/search");
    }
  };

  return (
    <Container>
      <HeaderDiv>
        <Wrap>
          <ImgBack
            alt="back"
            src={back}
            onClick={() => {
              history.goBack();
            }}
          ></ImgBack>
          <Img
            alt="search"
            src={search}
            onClick={() => {
              history.push("/");
            }}
          ></Img>
          <Input
            placeholder="어떤 여행 계획표를 찾으시나요?"
            onKeyPress={(e) => searchEnter(e)}
          />
        </Wrap>
      </HeaderDiv>
    </Container>
  );
};

export default SearchInput;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 300px;
  display: flex;
  margin-right: 28px;
  border: none;
  border-bottom: 1px solid #cacaca;
  padding: 5px 25px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-bottom: 1px solid #41b67e;
  }
`;

const Img = styled.img`
  position: relative;
  left: 20px;
  width: 20px;
`;

const ImgBack = styled.img`
  width: 20px;
  cursor: pointer;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
