import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import cancelx from "../../static/images/icon/cancelX.png";

const ModalImg = ({ reviewImgUrl, setImgModal }) => {
  return (
    <Container>
      <Button
        onClick={() => {
          setImgModal(false);
        }}
      >
        <img alt="cancel" src={cancelx} />
      </Button>
      <ImgBox>
        <Img src={reviewImgUrl} alt="reviewimg"></Img>
      </ImgBox>
    </Container>
  );
};

export default ModalImg;

const Container = styled.div`
  background-color: black;
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
`;

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  border: 0;
  color: white;
  font-size: 20px;
  background-color: black;
  img {
    margin: 20px 0px;
    width: 40px;
  }
`;

const Img = styled.img`
  width: 100%;
  display: flex;
  justify-content: center;
`;
