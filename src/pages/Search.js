import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Footer from "../components/common/Footer";
import search from "../static/images/icon/search.png";
import { keywordSuggestList } from "../components/elements/ArrValue";
import { useDispatch, useSelector } from "react-redux";
import back from "../static/images/icon/back.png";
import { useHistory } from "react-router";
import { getKeywordPostDB, keywordDB } from "../redux/module/post";
import SearchItem from "../components/search/SearchItem";
import NotFound from "../shared/NotFound";
import InfinityScroll from "../shared/InfinityScroll";
import InstallPWA from "../shared/InstallPWA";

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

  const suggestBtnClick = (e) => {
    dispatch(keywordDB(e.target.value));
    dispatch(getKeywordPostDB(e.target.value, pageno));
  };

  const searchEnter = (e) => {
    if (e.key === "Enter") {
      dispatch(getKeywordPostDB(e.target.value));
      dispatch(keywordDB(e.target.value));
      setSearching(true);
    }
  };
  const searchMobileComplete = (e) => {
    dispatch(getKeywordPostDB(e.target.value));
    dispatch(keywordDB(e.target.value));
    setSearching(true);
  };

  useEffect(() => {
    dispatch(getKeywordPostDB(keyWord, pageno));
  }, []);

  if (lastPage === undefined) {
    lastPage = true;
  }
  return (
    <Container>
      <HeaderDiv>
        <Wrap>
          <Img
            src={back}
            onClick={() => {
              history.push("/");
            }}
          ></Img>
          <Icon>
            <I src={search}></I>
          </Icon>
          <Input
            placeholder="어떤 여행 계획표를 찾으시나요?"
            onKeyPress={(e) => searchEnter(e)}
          />
        </Wrap>
      </HeaderDiv>
      {/* 추천키워드 */}
      <Suggest>
        <h4>추천 키워드</h4>
        <Div>
          {keywordSuggestList.map((keyword, idx) => {
            return (
              <button key={idx} onClick={suggestBtnClick} value={keyword}>
                {keyword}
              </button>
            );
          })}
        </Div>
      </Suggest>
      <Title>{keyWord} 여행계획표 </Title>
      {/* 검색리스트 페이지 */}
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
            {searchList &&
              searchList?.map((item, idx) => {
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
  height: 80%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    cursor: pointer;
    font-size: 12px;
  }
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Suggest = styled.div`
  padding: 25px 15px;
  height: 14%;
  h4 {
    font-size: 14px;
    font-weight: 500;
    margin-left: 5px;
    /* line-height: 19px; */
    color: #363636;
  }
  div {
    margin-top: 7px;
    width: 100%;
  }
  button {
    background-color: inherit;
    border-radius: 20px;
    border: 1px solid #cacaca;
    padding: 5px 10px;
    margin-right: 8px;
    margin-bottom: 5px;
    font-weight: 350;
    font-family: "Apple SD Gothic Neo";
    color: #363636;
  }
`;

const Input = styled.input`
  width: 280px;
  display: flex;
  margin: auto;
  /* margin-top: 20px; */
  border: none;
  border-bottom: 1px solid black;
  padding: 5px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-bottom: 1px solid #41b67e;
  }
`;

const I = styled.img`
  /* position: absolute; */
  /* left: 45px;
  top: 6px; */
  margin: 0 auto;
  margin-left: 10px;
`;

const Img = styled.img`
  /* position: absolute; */
  left: 15px;
  top: 25px;
  width: 20px;
`;

const Container = styled.div`
  /* position: relative; */
  padding-bottom: 90px;
  /* height: 97%; */
`;

const Title = styled.div`
  width: 100%;
  height: 4%;
  margin-left: 15px;
  font-family: "Apple SD Gothic Neo";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  /* line-height: 22px; */
  color: ${({ theme }) => theme.colors.text1};
  /* margin-top: 40px; */
  /* margin-left: 20px;  */
`;

const Wrap = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

const Icon = styled.div`
  margin-right: 10px;
`;
