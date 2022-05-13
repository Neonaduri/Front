import React, { useState } from "react";
import Grid from "../elements/Grid";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { getThemePostDB, keywordDB } from "../../redux/module/post";
import { theme1, theme2 } from "../elements/ArrValue";

const MakePlan = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Div>
        <Title>여행테마</Title>
        <Container>
          <Grid flex>
            <Wrap>
              {theme1.map((item, idx) => {
                return (
                  <ImgContainer
                    key={idx}
                    onClick={() => {
                      const keyword = item.value;
                      dispatch(getThemePostDB(keyword));
                      dispatch(keywordDB(keyword));
                    }}
                  >
                    <Icon src={item.src} />
                    <ImgTitle>{item.value}</ImgTitle>
                  </ImgContainer>
                );
              })}
            </Wrap>
          </Grid>

          <Grid flex>
            <Wrap>
              {theme2.map((item, idx) => {
                return (
                  <ImgContainer
                    key={idx}
                    onClick={() => {
                      const keyword = item.value;
                      dispatch(getThemePostDB(keyword));
                    }}
                  >
                    <Icon src={item.src} />
                    <ImgTitle>{item.value}</ImgTitle>
                  </ImgContainer>
                );
              })}
            </Wrap>
          </Grid>
        </Container>
      </Div>
    </>
  );
};

export default MakePlan;

const Container = styled.div`
  margin-top: 35px;
`;

const Icon = styled.img`
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
`;

const ImgTitle = styled.span`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 70px;
  left: 26px;
  font-size: small;
  color: #363636;
`;

const Tit3 = styled.span`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 70px;
  left: 23px;
  font-size: small;
  color: #363636;
`;

const Tit4 = styled.span`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 70px;
  left: 18px;
  font-size: small;
  color: #363636;
`;

const ImgContainer = styled.div`
  width: 80px;
  position: relative;
  margin: 2px;
`;

const Div = styled.div`
  position: relative;
  background-color: #ffffff;
  border-radius: 30px 30px 0px 0px;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.05);
  padding: 40px 0;
  margin-bottom: 10px;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  color: #585858;
  padding-left: 25px;
  font-weight: 500;
`;
