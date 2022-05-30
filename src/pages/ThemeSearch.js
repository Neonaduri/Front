import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { cleanDetailPlan } from "../redux/module/plan";
import styled from "styled-components";
import Footer from "../components/common/Footer";
import Titleline from "../components/elements/Titleline";
import Search from "./Search";
import InfinityScroll from "../shared/InfinityScroll";
import NotFoundSearchList from "../shared/NotFoundSearchList";
import { getThemePostDB } from "../redux/module/post";
import SearchItem from "../components/search/SearchItem";

const ThemeSearch = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const keyWord = useSelector((state) => state.post.keyword);
  const searchList = useSelector((state) => state.post.searchList);
  const isLoading = useSelector((state) => state.post.isLoading);
  let lastPage = useSelector((state) => state.post.paging?.lastpage);
  const nextPage = useSelector((state) => state.post.paging?.start);
  const contentDivRef = useRef();

  useEffect(() => {
    dispatch(cleanDetailPlan());
  }, []);

  return (
    <Container>
      <Headerdiv>
        <Titleline
          title={keyWord}
          onClick={() => {
            history.push("/");
          }}
        />
      </Headerdiv>
      <Wrap>
        {searchList.length === 0 ? (
          <NotFoundSearchList />
        ) : (
          <ContentDiv ref={contentDivRef}>
            <InfinityScroll
              callNext={() => {
                dispatch(getThemePostDB(keyWord, nextPage));
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

export default ThemeSearch;

const Headerdiv = styled.div`
  height: 6%;
`;

const Wrap = styled.div`
  height: 100%;
`;

const Container = styled.div`
  height: 100%;
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
