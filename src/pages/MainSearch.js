import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanDetailPlan } from "../redux/module/plan";
import styled from "styled-components";
import Footer from "../components/common/Footer";
import SearchInput from "../components/search/SearchInput";
import Search from "./Search";
import { getKeywordPostDB } from "../redux/module/post";

const MainSearch = () => {
  const dispatch = useDispatch();
  const keyWord = useSelector((state) => state.post.keyword);

  const [sortby, setSortby] = useState("postId");

  useEffect(() => {
    dispatch(cleanDetailPlan());
  }, []);
  const onChangeSort = (e) => {
    const clickedSort = e.target.value;
    setSortby(clickedSort);
    dispatch(getKeywordPostDB(keyWord, clickedSort));
  };

  return (
    <Container>
      <Inputdiv>
        <SearchInput sortby={sortby} />
      </Inputdiv>
      <Titlediv>
        <Title>{keyWord} 여행계획표 </Title>
        <select onChange={onChangeSort}>
          <option value="postId">최신순</option>
          <option value="viewCnt">조회순</option>
          <option value="likeCnt">스크랩순</option>
        </select>
      </Titlediv>

      <Wrap>
        <Search sortby={sortby} />
      </Wrap>
      <Footer />
    </Container>
  );
};

export default MainSearch;

const Titlediv = styled.div`
  width: 100%;
  height: 3%;
  padding: 25px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  select {
    border: none;
    font-size: 14px;
    background-color: white;
    padding: 5px 0px;
    outline: none;
    color: black;
    option {
      background: white;
      color: black;
    }
  }
`;

const Container = styled.div`
  height: 100%;
`;
const Inputdiv = styled.div`
  height: 7%;
`;

const Title = styled.div`
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
