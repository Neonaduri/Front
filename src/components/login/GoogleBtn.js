import React from "react";
import { useDispatch } from "react-redux";
import Googlebtn from "../../static/images/logo/btn_google_signin_dark_pressed_web@2x.png";
import styled from "styled-components";

const GoogleBtn = ({ onSocial }) => {
  const clientId =
    "68742741278-1598oqkkoch3q3g0oaudc2lahovbsc64.apps.googleusercontent.com";
  const callBack = "http://localhost:3000/user/google/callback";
  return (
    <div>
      <Img
        src={Googlebtn}
        onClick={() => {
          window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${callBack}&response_type=code&scope=email%20profile%20openid&access_type=offline`;
        }}
      ></Img>
    </div>
  );
};
const Img = styled.img`
  height: 50px;
`;
export default GoogleBtn;
