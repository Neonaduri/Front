import React from "react";
import back from "../../static/images/icon/back.png";
import styled from "styled-components";
import { useHistory } from "react-router";

const HeaderDiv = (props) => {
  const history = useHistory();

  return (
    <HeaderContainer>
      <img
        alt="back"
        src={back}
        onClick={() => {
          history.goBack();
        }}
      ></img>
      <p>{props.keyWord}</p>
    </HeaderContainer>
  );
};

export default HeaderDiv;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 25px 10px;
  p {
    margin: 0 auto;
    font-weight: 600;
    font-size: 18px;
    color: #363636;
  }

  img {
    width: 20px;
    cursor: pointer;
  }
`;
