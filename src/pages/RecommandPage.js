import React from "react";
import styled from "styled-components";
import Footer from "../components/common/Footer";
import RecommandKeyword from "../components/search/RecommandKeyword";
import SearchInput from "../components/search/SearchInput";

const RecommandPage = () => {
  return (
    <div>
      <Div>
        <SearchInput />
        <RecommandKeyword />
      </Div>
      <Footer />
    </div>
  );
};

export default RecommandPage;

const Div = styled.div``;
