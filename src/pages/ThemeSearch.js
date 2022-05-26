import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import HeaderDiv from "../components/search/HeaderDiv";
import Search from "./Search";

const ThemeSearch = (props) => {
  const keyWord = useSelector((state) => state.post.keyword);
  console.log(keyWord);
  return (
    <Container>
      <Wrap>
        <HeaderDiv keyWord={keyWord} />

        <Search />
      </Wrap>
    </Container>
  );
};

export default ThemeSearch;

const Wrap = styled.div`
  padding-bottom: 10px;
  height: 100%;
`;

const Container = styled.div`
  height: 100%;
`;
