import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import heart from "../../static/images/icon/love.png";

const MyInfo = () => {
  const history = useHistory();
  const userInfo = useSelector((state) => state.user.list);

  return (
    <Myinfodiv>
      <img src={userInfo.profileImg} />
      <span>{userInfo.nickName}</span>
      <small>{userInfo.userName}</small>
      <div>
        <img src={heart} />
        <span>{userInfo.totalLike}</span>
      </div>
      <button
        onClick={() => {
          history.push("/editprofile");
        }}
      >
        수정하기
      </button>
    </Myinfodiv>
  );
};

const Myinfodiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  div {
    display: flex;
    align-items: center;
    width: 30px;
    justify-content: space-between;
    img {
      width: 15px;
      height: 15px;
    }
  }
`;

export default MyInfo;
