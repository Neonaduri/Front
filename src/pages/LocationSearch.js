import React, { useEffect, useRef, useState } from "react";
import ButtonArea from "../components/main/ButtonArea";

import styled from "styled-components";
import HeaderDiv from "../components/search/HeaderDiv";
import { useDispatch, useSelector } from "react-redux";
import { getKeywordPostDB, getLocationPostDB } from "../redux/module/post";
import SearchItem from "../components/search/SearchItem";
import InfinityScroll from "../shared/InfinityScroll";
import Footer from "../components/common/Footer";
import { useHistory } from "react-router";
import Titleline from "../components/elements/Titleline";
import NotFoundSearchList from "../shared/NotFoundSearchList";

const LocationSearch = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("서울");
  const locationList = useSelector((state) => state.post.searchList);
  const searchList = useSelector((state) => state.post.searchList);
  const isLoading = useSelector((state) => state.post.isLoading);
  let lastPage = useSelector((state) => state.post.paging?.lastpage);
  const nextPage = useSelector((state) => state.post.paging?.start);
  const keyWord = useSelector((state) => state.post.keyword);
  const contentDivRef = useRef();
  const [sortby, setSortby] = useState("postId");

  const changeSortby = (e) => {
    const value = e.target.value;
    setSortby(value);
    dispatch(getLocationPostDB(keyWord, value));
  };

  return (
    <Container>
      <Wrap>
        <Headerdiv>
          <Titleline
            title="지역별 여행계획표"
            onClick={() => {
              history.push("/");
            }}
          />
        </Headerdiv>
        <ButtonArea sortby={sortby} />
        <FilterDiv>
          <select onChange={changeSortby}>
            <option value="postId">최신순</option>
            <option value="viewCnt">조회순</option>
            <option value="likeCnt">스크랩순</option>
          </select>
        </FilterDiv>
        {searchList.length === 0 ? (
          <NotFoundSearchList />
        ) : (
          <ContentDiv ref={contentDivRef}>
            <InfinityScroll
              callNext={() => {
                dispatch(getLocationPostDB(keyword, sortby, nextPage));
              }}
              is_next={lastPage ? false : true}
              loading={isLoading}
              ref={contentDivRef}
            >
              {searchList?.map((item, idx) => {
                return <SearchItem key={idx} {...item} />;
              })}
            </InfinityScroll>
          </ContentDiv>
        )}
      </Wrap>
      <Footer />
    </Container>
  );
};

export default LocationSearch;

const FilterDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 0px 16px;
  margin-bottom: -7px;
  select {
    font-size: 14px;
    border: none;
  }
`;

const Container = styled.div`
  height: 100%;
`;

const Headerdiv = styled.div`
  height: 6%;
  margin-bottom: 5px;
`;
const ContentDiv = styled.div`
  margin-top: 20px;
  height: 90%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }
`;

const Wrap = styled.div`
  padding-bottom: 90px;
  height: 100%;
`;
