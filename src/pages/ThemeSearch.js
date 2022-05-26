import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Footer from "../components/common/Footer";
import HeaderDiv from "../components/search/HeaderDiv";
import Search from "./Search";
import Footer from "../components/common/Footer";

const ThemeSearch = (props) => {
  const keyWord = useSelector((state) => state.post.keyword);

  return (
    <Container>
      <Wrap>
        <HeaderDiv keyWord={keyWord} />
        <Search />
      </Wrap>
      <Footer />
    </Container>
  );
};

export default ThemeSearch;

const Wrap = styled.div`
  height: 100%;
`;

const Container = styled.div`
  height: 110%;
`;
