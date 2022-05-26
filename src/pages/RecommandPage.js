import React from "react";
import Footer from "../components/common/Footer";
import RecommandKeyword from "../components/search/RecommandKeyword";
import SearchInput from "../components/search/SearchInput";

const RecommandPage = () => {
  return (
    <div>
      <SearchInput />
      <RecommandKeyword />
      <Footer />
    </div>
  );
};

export default RecommandPage;
