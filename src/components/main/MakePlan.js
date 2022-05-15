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
                    <IconBox>
                      <Icon src={item.src}></Icon>
                    </IconBox>
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
                      dispatch(keywordDB(keyword));
                    }}
                  >
                    <IconBox>
                      <Icon src={item.src}></Icon>
                    </IconBox>
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
  margin-top: 10px;
`;

const Icon = styled.img`
  width: 65%;
  cursor: pointer;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  cursor: pointer;
  border: 1px solid #ececec;
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
`;

const ImgTitle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 14px;
  font-size: small;
  color: #363636;
  margin-right: 35px;
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
  padding: 30px 0;
  margin-bottom: 10px;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 40px;
`;

const Title = styled.div`
  font-family: "Apple SD Gothic Neo";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  margin-left: 26px;
  color: #363636;
`;
