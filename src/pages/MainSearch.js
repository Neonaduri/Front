import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Footer from "../components/common/Footer";
import SearchInput from "../components/search/SearchInput";
import Search from "./Search";

const MainSearch = () => {
  const keyWord = useSelector((state) => state.post.keyword);
  return (
    <>
      <SearchInput />
      <Title>{keyWord} 여행계획표 </Title>
      <Wrap>
        <Search />
      </Wrap>
      <Footer />
    </>
  );
};

export default MainSearch;

const Title = styled.div`
  width: 100%;
  margin-left: 15px;
  margin: 10px 15px;
  margin-top: 25px;
  font-family: "Apple SD Gothic Neo";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text1};
`;

const Wrap = styled.div`
  height: 100%;
`;
