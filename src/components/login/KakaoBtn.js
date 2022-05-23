import React from "react";
import styled from "styled-components";
import kakaologin from "../../static/images/logo/kakao_login.png";

const KakaoBtn = () => {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
  return (
    <div>
      <h1>
        <a href={KAKAO_AUTH_URL}>
          <Img src={kakaologin}></Img>
        </a>
      </h1>
    </div>
  );
};

const Img = styled.img`
  height: 45px;
  cursor: pointer;
`;

export default KakaoBtn;
