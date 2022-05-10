import React from "react";
import { useDispatch } from "react-redux";
import Googlebtn from "../../static/images/logo/google_login.png";
import styled from "styled-components";

const GoogleBtn = ({ onSocial }) => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENTID;
  const callBack = process.env.REACT_APP_GOOGLE_CALLBACK;
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
