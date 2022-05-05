import React from "react";
import styled from "styled-components";
import kakaologin from "../../static/images/kakao_login_large_narrow.png";

const KakaoBtn = () => {
  const REST_API_KEY = "2e4e71fc3d3078adc996df889a6eb71a";
  const REDIRECT_URI = "http://localhost:3000/user/kakao/callback";
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
  height: 50px;
`;

export default KakaoBtn;
