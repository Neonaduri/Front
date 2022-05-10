import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import SearchItem from "./SearchItem";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

const SearchList = ({ keyword, getNextPage }) => {
  const searchList = useSelector((state) => state.post.searchList);
  const [observerElementRef] = useIntersectionObserver(getNextPage);

  // console.log(searchList);

  const isObserverElement = useCallback(
    (idx) => {
      return searchList.length > 1 && searchList.length - 2 === idx;
    },
    [searchList, keyword]
  );

  return (
    <>
      <div>
        <Title>{keyword} 관련 키워드</Title>
        {searchList &&
          searchList.map((item, idx) => {
            return (
              <SearchItem
                key={idx}
                {...item}
                ref={isObserverElement(idx) ? observerElementRef : null}
              />
            );
          })}
      </div>
    </>
  );
};

export default SearchList;

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
