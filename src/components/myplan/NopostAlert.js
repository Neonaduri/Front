import React from "react";
import styled from "styled-components";
import Titleline from "../elements/Titleline";
import imgLogin from "../../static/images/icon/loginCharacter.png";
import { useHistory } from "react-router";
import Footer from "../common/Footer";
import Button from "../elements/Button";

const NopostAlert = () => {
  const history = useHistory();

  return (
    <>
      <NopostContainer>
        <div>
          <Titleline title={"계획"} />
        </div>
        <div>
          <img src={imgLogin} />
          <span>등록된 계획표가 없습니다!</span>
          <Button
            content={"계획하러 가기!"}
            onClick={() => {
              history.push("/planning");
            }}
          />
        </div>
      </NopostContainer>
      <Footer />
    </>
  );
};

const NopostContainer = styled.div`
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    margin-top: 20px;
    &:first-child {
      margin-top: 0px;
    }
    &:last-child {
      width: 80%;
    }
    img {
      margin-top: 50px;
      width: 170px;
      margin-bottom: 10px;
    }
    span {
      margin-top: 20px;
      font-size: 20px;
      margin-bottom: 20px;
    }
  }
`;

export default NopostAlert;
