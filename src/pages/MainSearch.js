import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanDetailPlan } from "../redux/module/plan";
import styled from "styled-components";
import Footer from "../components/common/Footer";
import SearchInput from "../components/search/SearchInput";
import Search from "./Search";

const MainSearch = () => {
  const dispatch = useDispatch();
  const keyWord = useSelector((state) => state.post.keyword);

  useEffect(() => {
    dispatch(cleanDetailPlan());
  }, []);

  return (
    <Container>
      <Inputdiv>
        <SearchInput />
      </Inputdiv>
      <Title>{keyWord} 여행계획표 </Title>
      <Wrap>
        <Search />
      </Wrap>
      <Footer />
    </Container>
  );
};

export default MainSearch;

const Container = styled.div`
  height: 100%;
`;
const Inputdiv = styled.div`
  height: 7%;
`;

const Title = styled.div`
  width: 100%;
  height: 3%;
  margin-left: 15px;
  margin: 10px 15px;
  margin-top: 25px;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text1};
`;

const Wrap = styled.div`
  height: 80%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }
`;
