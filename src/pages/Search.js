import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Footer from "../components/common/Footer";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getKeywordPostDB, keywordDB } from "../redux/module/post";
import SearchItem from "../components/search/SearchItem";
import InfinityScroll from "../shared/InfinityScroll";
import NotFoundSearchList from "../shared/NotFoundSearchList";
import SearchInput from "../components/search/SearchInput";

const Search = () => {
  const dispatch = useDispatch();
  const [pageno, setPageno] = useState(1);
  const [serching, setSearching] = useState(false);
  const searchList = useSelector((state) => state.post.searchList);
  const keyWord = useSelector((state) => state.post.keyword);
  const contentDivRef = useRef();
  const isLoading = useSelector((state) => state.post.isLoading);
  const nextPage = useSelector((state) => state.post.paging?.start);
  let lastPage = useSelector((state) => state.post.paging?.lastpage);

  useEffect(() => {
    dispatch(getKeywordPostDB(keyWord, pageno));
  }, [keyWord]);

  if (lastPage === undefined) {
    lastPage = true;
  }

  return (
    <Container>
      {searchList.length === 0 && serching === true ? (
        <NotFoundSearchList />
      ) : (
        <ContentDiv ref={contentDivRef}>
          <InfinityScroll
            callNext={() => {
              dispatch(getKeywordPostDB(keyWord, nextPage));
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
    </Container>
  );
};

export default Search;

const ContentDiv = styled.div`
  padding-bottom: 60px;
  height: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }
`;

const Container = styled.div`
  height: 100%;
`;
