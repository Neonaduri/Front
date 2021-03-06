import React, { useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getKeywordPostDB } from "../redux/module/post";
import SearchItem from "../components/search/SearchItem";
import InfinityScroll from "../shared/InfinityScroll";
import NotFoundSearchList from "../shared/NotFoundSearchList";

const Search = ({ sortby }) => {
  const dispatch = useDispatch();
  const searchList = useSelector((state) => state.post.searchList);
  const keyWord = useSelector((state) => state.post.keyword);
  const contentDivRef = useRef();
  const isLoading = useSelector((state) => state.post.isLoading);
  const nextPage = useSelector((state) => state.post.paging?.start);
  let lastPage = useSelector((state) => state.post.paging?.lastpage);

  if (lastPage === undefined) {
    lastPage = true;
  }

  return (
    <Container>
      {searchList.length === 0 ? (
        <NotFoundSearchList />
      ) : (
        <ContentDiv ref={contentDivRef}>
          <InfinityScroll
            callNext={() => {
              dispatch(getKeywordPostDB(keyWord, sortby, nextPage));
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
