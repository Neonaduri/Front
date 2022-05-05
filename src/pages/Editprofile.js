import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Editprofile = () => {
  const userInfo = useSelector((state) => state.user.list);
  return (
    <Container>
      <img src={userInfo.profileImg} />
      <input defaultValue={userInfo.nickName}></input>
    </Container>
  );
};

const Container = styled.div`
  img {
    width: 70px;
    height: 70px;
  }
`;

export default Editprofile;
