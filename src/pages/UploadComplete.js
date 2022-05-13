import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import imgLogin from "../static/images/icon/loginCharacter.png";
import Footer from "../components/common/Footer";

const UploadComplete = () => {
  const history = useHistory();
  return (
    <>
      <NopostContainer>
        <div>
          <img src={imgLogin} />
          <span>여행이 성공적으로 등록되었습니다!</span>
          <button
            onClick={() => {
              history.replace("/");
            }}
          >
            홈으로 가기!
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
export default UploadComplete;
