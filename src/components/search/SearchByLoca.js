import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import NotFound from "../../shared/NotFound";
import SearchItem from "./SearchItem";
import Footer from "../common/Footer";
import { area } from "../elements/ArrValue";
import ButtonArea from "../main/ButtonArea";
import { useDispatch, useSelector } from "react-redux";
import Titleline from "../elements/Titleline";
import back from "../../static/images/icon/back.png";
import { useHistory } from "react-router";

const SearchByLoca = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const searchList = useSelector((state) => state.post.locationList);
  const paging = useSelector((state) => state.post.paging);
  const lastPage = useSelector((state) => state.post.paging.lastPage);
  const isLoading = useSelector((state) => state.post.isLoading);
  const targetdivRef = useRef();

  useEffect(() => {
    const initval = "서울";
    dispatch();
  }, []);

  return (
    <Container>
      <HeaderDiv>
        <img
          src={back}
          onClick={() => {
            history.goBack();
          }}
        />
        <Titleline title={"지역별 여행 계획표"} />
        <div></div>
      </HeaderDiv>
      {/* 추천키워드 */}
      <Btndiv>
        <ButtonArea />
      </Btndiv>

      {/* 검색리스트 페이지 */}
      {searchList.length === 0 ? (
        <NotFound />
      ) : (
        <Scrolldiv ref={targetdivRef} id="container">
          {/* <InfiScrollSearch
            callNext={() => {
              dispatch(getLocationPostNextDB(paging.start));
            }}
            is_next={lastPage ? false : true}
            loading={isLoading}
            // ref={targetdivRef}
          > */}
          {searchList &&
            searchList.map((item, idx) => {
              return <SearchItem key={idx} {...item} />;
            })}
          {/* </InfiScrollSearch> */}
        </Scrolldiv>
      )}

      <Footer />
    </Container>
  );
};

const Scrolldiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 85%;
  width: 375px;
  overflow: scroll;
`;
const Btndiv = styled.div`
  height: 5%;
  width: 375px;
`;

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 15px;
  height: 10%;
  div {
    margin-right: 12px;
  }
  img {
    margin-top: 5px;
  }
`;

const Container = styled.div`
  position: relative;
  padding-bottom: 90px;
  height: 100%;
  width: 375px;
`;

export default SearchByLoca;
