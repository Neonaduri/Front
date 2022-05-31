import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import imgLogin from "../static/images/icon/loginCharacter.png";

const NotFound = () => {
  const history = useHistory();
  return (
    <div>
      <NopostContainer>
        <div>
          <img src={imgLogin} alt="character" />
          <span>현재 페이지는 없는 페이지입니다!</span>
          {/* <span>서비스 점검중입니다! 잠시만 기다려주세요:)</span> */}
          <button
            onClick={() => {
              history.replace("/");
            }}
          >
            홈으로 가기!
          </button>
        </div>
      </NopostContainer>
    </div>
  );
};

const NopostContainer = styled.div`
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    margin-top: 100px;
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
      background-color: #41b67e;
      border: none;
      padding: 15px 30px;
      margin-top: 20px;
      border-radius: 10px;
      font-size: 18px;
      color: white;
      cursor: pointer;
    }
  }
`;

export default NotFound;
