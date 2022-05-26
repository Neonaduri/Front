import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

const ModalImg = ({ reviewImgUrl, setImgModal }) => {
  const history = useHistory();
  return (
    <Container>
      <Button
        onClick={() => {
          setImgModal(false);
        }}
      >
        x
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
  left: 0;
  bottom: 0;
  right: 0;
  background-color: black;
  z-index: 9999;
`;

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: 30px; */
`;

const Button = styled.button`
  border: 0;
  color: white;
  font-size: 40px;
  margin-left: 10px;
  font-weight: lighter;
  background-color: black;
`;

const Img = styled.img`
  width: 100%;
  display: flex;
  justify-content: center;
`;
