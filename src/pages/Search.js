import React, { useState } from "react";
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

const Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [pageno, setPageno] = useState(1);
  const [serching, setSearching] = useState(false);
  const searchList = useSelector((state) => state.post.searchList);
  const keyWord = useSelector((state) => state.post.keyword);

  const suggestBtnClick = (e) => {
    console.log(e.target.id);
  };

  const searchEnter = (e) => {
    if (e.key === "Enter") {
      setPageno(1);
      dispatch(getKeywordPostDB(e.target.value, pageno));
      dispatch(keywordDB(e.target.value));
      setSearching(true);
    }
  };

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
            history.push("/");
          }}
        ></Img>
        <I src={search}></I>
      </div>
      {/* 추천키워드 */}
      <Suggest>
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
      </Suggest>
      {/* 검색리스트 페이지 */}
      {searchList.length === 0 && serching === true ? (
        <NotFound />
      ) : (
        <div>
          <Title>{keyWord} </Title>
          {searchList &&
            searchList.map((item, idx) => {
              return <SearchItem key={idx} {...item} />;
            })}
        </div>
      )}
      {/* <div>
        <Title>{keyWord} </Title>
        {searchList &&
          searchList.map((item, idx) => {
            return <SearchItem key={idx} {...item} />;
          })}
      </div> */}

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
    border-bottom: 1px solid #41b67e;
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
