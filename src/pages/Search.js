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
import { actionCreators } from "../redux/module/post";
import SearchItem from "../components/search/SearchItem";

const Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [keyword, setKeyword] = useState();
  const [pageno, setPageno] = useState(1);
  const [target, setTarget] = useState(null);
  const [loading, setLoading] = useState(false);
  const pageEnd = useSelector((state) => state.post.islastPage);
  const totalPage = useSelector((state) => state);

  console.log(totalPage);

  const searchList = useSelector((state) => state.post.searchList);

  const callback = async ([entry], observer) => {
    if (entry.isIntersecting && !loading) {
      observer.unobserve(entry.target);
      setLoading(true);
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });

      if (totalPage > pageno) {
        setPageno(pageno + 1);
      }

      setLoading(false);
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(callback, { threshold: 1 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  useEffect(() => {
    dispatch(getKeywordPostDB(keyword, pageno));
    console.log(pageno);
  }, [keyword, pageno]);

  // const suggestBtnClick = (e) => {
  //   console.log(e.target.id);
  // };

  const searchEnter = (e) => {
    if (e.key === "Enter") {
      setKeyword(e.target.value);
      setPageno(1);
      dispatch(actionCreators.islastPage(false));
    }
  };

  console.log(keyword, pageno);
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
      <div>
        <Title>{keyword} 관련 키워드</Title>
        {searchList &&
          searchList.map((item, idx) => {
            return <SearchItem key={idx} {...item} />;
          })}
      </div>
      {totalPage + 1 > pageno ? <div ref={setTarget}> </div> : null}
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
  padding-bottom: 90px;
`;

const Title = styled.div`
  position: relative;
  width: 119px;
  height: 22px;
  left: 16px;
  font-family: "Apple SD Gothic Neo";
  font-style: normal;
  font-weight: 600;
  top: 20px;
  font-size: 18px;
  line-height: 22px;
  color: #363636;
`;
