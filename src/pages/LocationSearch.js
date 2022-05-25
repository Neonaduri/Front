import React, { useEffect, useRef, useState } from "react";
import ButtonArea from "../components/main/ButtonArea";
import Search from "./Search";

import styled from "styled-components";
import { useHistory } from "react-router";
import HeaderDiv from "../components/search/HeaderDiv";
import { useDispatch, useSelector } from "react-redux";
import { getKeywordPostDB, getLocationPostDB } from "../redux/module/post";
import SearchItem from "../components/search/SearchItem";
import InfinityScroll from "../shared/InfinityScroll";
import Footer from "../components/common/Footer";

const LocationSearch = (props) => {
  const dispatch = useDispatch();
  const keyword = useSelector((state) => state.post.keyword);
  const locationList = useSelector((state) => state.post.locationList);
  const isLoading = useSelector((state) => state.post.isLoading);
  let lastPage = useSelector((state) => state.post.paging?.lastpage);
  const nextPage = useSelector((state) => state.post.paging?.start);

  const [serching, setSearching] = useState(false);
  const contentDivRef = useRef();

  const keyWord = "지역별 여행계획표";

  useEffect(() => {
    dispatch(getLocationPostDB(keyword));
  }, [keyword]);
  return (
    <>
      <HeaderDiv keyWord={keyWord} />
      <ButtonArea />

      <ContentDiv ref={contentDivRef}>
        <InfinityScroll
          callNext={() => {
            dispatch(getKeywordPostDB(keyWord, nextPage));
          }}
          is_next={lastPage ? false : true}
          loading={isLoading}
          ref={contentDivRef}
        >
          {locationList?.map((item, idx) => {
            return <SearchItem key={idx} {...item} />;
          })}
        </InfinityScroll>
      </ContentDiv>
      <Footer />
    </>
  );
};

export default LocationSearch;
const ContentDiv = styled.div`
  margin-top: 20px;
  height: 97%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }
`;
