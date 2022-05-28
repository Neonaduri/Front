import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { getKeywordPostDB, keywordDB } from "../../redux/module/post";
import { keywordSuggestList } from "../elements/ArrValue";

const RecommandKeyword = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [pageno, setPageno] = useState(1);

  const suggestBtnClick = (e) => {
    dispatch(getKeywordPostDB(e.target.value, pageno));
    dispatch(keywordDB(e.target.value));

    history.push("/search");
  };
  return (
    <div>
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
    </div>
  );
};

export default RecommandKeyword;

const Suggest = styled.div`
  padding: 25px 15px;
  height: 100px;
  h4 {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: #363636;
    padding-bottom: 10px;
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

const Div = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  flex-wrap: wrap;
  button {
    cursor: pointer;
    font-size: 12px;
  }
`;
