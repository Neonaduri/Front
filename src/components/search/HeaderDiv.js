import React from "react";
import back from "../../static/images/icon/back.png";
import styled from "styled-components";
import { useHistory } from "react-router";

const HeaderDiv = (props) => {
  const history = useHistory();

  return (
    <HeaderContainer>
      <img
        src={back}
        onClick={() => {
          history.push("/");
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
