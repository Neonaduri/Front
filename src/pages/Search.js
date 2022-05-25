import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Footer from "../components/common/Footer";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getKeywordPostDB, keywordDB } from "../redux/module/post";
import SearchItem from "../components/search/SearchItem";
import NotFound from "../shared/NotFound";
import InfinityScroll from "../shared/InfinityScroll";
import SearchInput from "../components/search/SearchInput";

const Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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
  }, []);

  if (lastPage === undefined) {
    lastPage = true;
  }

  return (
    <Container>
      {searchList.length === 0 && serching === true ? (
        <NotFound />
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

      <Footer />
    </Container>
  );
};

export default Search;

const ContentDiv = styled.div`
  /* margin-top: 20px; */
  height: 80%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }
`;

// const HeaderDiv = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 20px;
// `;

// const Input = styled.input`
//   width: 280px;
//   display: flex;
//   margin: auto;
//   border: none;
//   border-bottom: 1px solid black;
//   padding: 5px;
//   font-size: 16px;
//   &:focus {
//     outline: none;
//     border-bottom: 1px solid #41b67e;
//   }
// `;

// const I = styled.img`
//   margin: 0 auto;
//   margin-left: 10px;
// `;

// const Img = styled.img`
//   left: 15px;
//   top: 25px;
//   width: 20px;
// `;

const Container = styled.div`
  /* padding-bottom: 90px; */
  height: 97%;
`;

const Title = styled.div`
  width: 100%;
  height: 30px;
  margin-left: 15px;
  font-family: "Apple SD Gothic Neo";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text1};
`;

// const Wrap = styled.div`
//   display: flex;
//   justify-content: left;
//   align-items: center;
// `;

// const Icon = styled.div`
//   margin-right: 10px;
// `;
