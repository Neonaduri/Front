import React, { useState } from "react";
import Grid from "../elements/Grid";
import styled from "styled-components";
import { useHistory } from "react-router";
import healing from "../../static/images/icon/healing.png";
import fire from "../../static/images/icon/fire.png";
import pet from "../../static/images/icon/pet.png";
import food from "../../static/images/icon/food.png";
import hotel from "../../static/images/icon/hotel.png";
import activity from "../../static/images/icon/activity.png";
import etc from "../../static/images/icon/etc.png";
import { useDispatch } from "react-redux";
import { getThemePostDB } from "../../redux/module/post";

const MakePlan = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  let theme = "힐링";

  const onClick = () => {
    // const theme = e.target.value;
    dispatch(getThemePostDB(theme));
  };

  return (
    <>
      <Div>
        <Title>여행테마</Title>
        <Container>
          <Grid flex>
            <Wrap>
              <Img onClick={onClick}>
                <Icon src={healing} />
                <Tit>힐링</Tit>
              </Img>

              <Img>
                <Icon src={pet} />
                <Tit4 onClick={onClick} value="힐링">
                  애견동반
                </Tit4>
              </Img>

              <Img>
                <Icon src={food} />
                <Tit>맛집</Tit>
              </Img>

              <Img>
                <Icon src={hotel} />
                <Tit3>호캉스</Tit3>
              </Img>
            </Wrap>
          </Grid>
          <Grid flex>
            <Wrap>
              <Img>
                <Icon src={activity} />
                <Tit4>액티비티</Tit4>
              </Img>

              <Img>
                <Icon src={fire} />
                <Tit>캠핑</Tit>
              </Img>

              <Img>
                <Icon src={etc} />
                <Tit>기타</Tit>
              </Img>
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

const Tit = styled.span`
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

const Img = styled.div`
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
