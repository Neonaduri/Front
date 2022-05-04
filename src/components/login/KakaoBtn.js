import React from "react";

const KakaoBtn = () => {
  const REST_API_KEY = "2e4e71fc3d3078adc996df889a6eb71a";
  const REDIRECT_URI = "http://localhost:3000/user/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
  return (
    <div>
      <h1>
        <a href={KAKAO_AUTH_URL}>kakao로그인</a>
      </h1>
    </div>
  );
};

export default KakaoBtn;
