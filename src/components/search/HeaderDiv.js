import React from "react";
import back from "../../static/images/icon/back.png";
import styled from "styled-components";
import { useHistory } from "react-router";
import { getKeywordPostDB, keywordDB } from "../../redux/module/post";
import { useDispatch } from "react-redux";

const HeaderDiv = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <HeaderContainer>
      <img
        alt="back"
        src={back}
        onClick={() => {
          history.goBack();
          dispatch(keywordDB(""));
        }}
      ></img>
      <p>{props.keyWord}</p>
    </HeaderContainer>
  );
};

export default HeaderDiv;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;
  p {
    margin: 0 auto;
    font-weight: 600;
    font-size: 18px;
    color: #363636;
    padding-right: 15px;
  }

  img {
    width: 20px;
    cursor: pointer;
  }
`;
