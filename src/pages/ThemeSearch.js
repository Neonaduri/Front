import React from "react";
import { useSelector } from "react-redux";
import HeaderDiv from "../components/search/HeaderDiv";
import Search from "./Search";

const ThemeSearch = (props) => {
  const keyWord = useSelector((state) => state.post.keyword);
  return (
    <div>
      <HeaderDiv keyWord={keyWord} />

      <Search />
    </div>
  );
};

export default ThemeSearch;
