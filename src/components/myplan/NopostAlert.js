import React from "react";
import styled from "styled-components";
import Titleline from "../elements/Titleline";
import imgLogin from "../../static/images/icon/loginCharacter.png";
import { useHistory } from "react-router";
import Footer from "../common/Footer";

const NopostAlert = () => {
  const history = useHistory();

  return (
    <>
      <NopostContainer>
        <div style={{ marginTop: "-20px" }}>
          <Titleline title={"계획"} />
        </div>
        <div>
          <img src={imgLogin} />
          <span>등록된 계획표가 없습니다!</span>
          <button
            onClick={() => {
              history.push("/planning");
            }}
          >
            계획하러 가기!
          </button>
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
    button {
      background-color: ${({ theme }) => theme.colors.mainGreen};
      border: none;
      padding: 15px 30px;
      margin-top: 20px;
      border-radius: 10px;
      font-size: 18px;
      color: white;
    }
  }
`;

export default NopostAlert;
