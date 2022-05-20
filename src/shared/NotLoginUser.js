import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import imgLogin from "../static/images/icon/loginCharacter.png";

const NotLoginUser = () => {
  const history = useHistory();
  return (
    <div>
      <NopostContainer>
        <div>
          <img src={imgLogin} />
          <span>회원전용 페이지입니다.</span>
          <button
            onClick={() => {
              history.replace("/login");
            }}
          >
            로그인 하러가기!
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
    }
  }
`;
export default NotLoginUser;
