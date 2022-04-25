import React from "react";
import styled from "styled-components";

const SearchInput = () => {
  return (
    <div>
      <Input type="text" placeholder="검색해주세요" />
    </div>
  );
};

export default SearchInput;

const Input = styled.input`
  width: 700px;
  height: 80px;
  margin-left: 600px;
  background: #ffffff;
  border: 3px solid #a2a2a2;
  border-radius: 72px;
  font-size: 30px;
  padding: 30px;
`;
