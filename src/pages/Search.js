import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Footer from "../components/common/Footer";
import search from "../static/images/icon/search.png";
import { keywordSuggestList } from "../components/elements/ArrValue";
import { useDispatch, useSelector } from "react-redux";
import SearchList from "../components/search/SearchList";
import back from "../static/images/icon/back.png";
import { useHistory } from "react-router";
import { getKeywordPostDB, getSearchPost } from "../redux/module/post";

const Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [keyword, setKeyword] = useState();
  const [pageno, setPageno] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageEnd = useRef();

  const searchList = useSelector((state) => state.post.searchList);

  console.log(searchList);
  console.log(keyword, pageno);

  const getNextPage = useCallback(() => {
    setPageno((prev) => prev + 1);
    setLoading(true);
  }, [keyword, pageno]);

  useEffect(() => {
    dispatch(getKeywordPostDB(keyword, pageno));
    setLoading(false);
  }, [keyword, pageno]);

  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            getNextPage();
          }
        },

        { threshold: 1 }
      );

      observer.observe(pageEnd.current);
    }
  }, [loading]);

  const suggestBtnClick = (e) => {
    console.log(e.target.id);
  };

  const searchEnter = (e) => {
    if (e.key === "Enter") {
      setKeyword(e.target.value);
    }
  };

  console.log(keyword);
  return (
    <Container>
      <div>
        <Input
          placeholder="어떤 여행 계획표를 찾으시나요?"
          onKeyPress={(e) => searchEnter(e)}
        />
        <Img
          src={back}
          onClick={() => {
            history.back();
          }}
        ></Img>
        <I src={search}></I>
      </div>

      {/* 추천키워드 */}
      {/* <Suggest>
        <h4>추천 키워드</h4>
        <div>
          {keywordSuggestList.map((keyword, idx) => {
            return (
              <button key={idx} onClick={suggestBtnClick} id={keyword}>
                {keyword}
              </button>
            );
          })}
        </div>
      </Suggest> */}

      {/* 검색리스트 페이지 */}
      <SearchList keyword={keyword} getNextPage={getNextPage} />

      <Footer />
    </Container>
  );
};

export default Search;

const Suggest = styled.div`
  padding: 25px;
  h4 {
    font-size: 16px;
    font-weight: 500;
    margin-left: 5px;
    line-height: 19px;
    color: #363636;
  }
  div {
    margin-top: 15px;
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
  width: 80%;
  display: flex;
  margin: auto;
  margin-top: 20px;
  border: none;
  border-bottom: 1px solid black;
  padding: 5px 30px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-bottom: 1px solid #62ce8b;
  }
`;

const I = styled.img`
  position: absolute;
  left: 45px;
  top: 6px;
`;

const Img = styled.img`
  position: absolute;
  left: 10px;
  top: 6px;
  width: 20px;
`;

const Container = styled.div`
  position: relative;
`;
