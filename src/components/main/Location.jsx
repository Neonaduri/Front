import React from "react";
import styled from "styled-components";
import Grid from "../elements/Grid";

const Location = () => {
  return (
    <>
      <Title>지역별</Title>

      <Container>
        <Grid width="1920px" flex>
          <Wrap>
            <Section>
              <Button>
                <Area>서울</Area>
              </Button>
              <Button>
                <Area>부산</Area>
              </Button>
              <Button>
                <Area>여수</Area>
              </Button>
              <Button>
                <Area>강릉</Area>
              </Button>
              <Button>
                <Area>전주</Area>
              </Button>
            </Section>
            <Section>
              <ButtonDown>
                <Area>경주</Area>
              </ButtonDown>
              <ButtonDown>
                <Area>제주</Area>
              </ButtonDown>
              <ButtonDown>
                <Area>경주</Area>
              </ButtonDown>
              <ButtonDown>
                <Area>전체</Area>
              </ButtonDown>
            </Section>
          </Wrap>
        </Grid>
      </Container>
    </>
  );
};

export default Location;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Wrap = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const Title = styled.h2`
  margin-top: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #585858;
`;

const Button = styled.button`
  width: 183px;
  height: 50px;
  left: 869px;
  top: 2175px;
  background: #ffffff;
  border: 3px solid #a1a1a1;
  box-sizing: border-box;
  border-radius: 50px;
  margin: 25px;
  cursor: pointer;
`;

const ButtonDown = styled.button`
  width: 183px;
  height: 50px;
  left: 869px;
  top: 2175px;
  background: #ffffff;
  border: 3px solid #a1a1a1;
  box-sizing: border-box;
  border-radius: 50px;
  margin: 25px;
  margin-left: 60px;
  cursor: pointer;
`;

const Section = styled.p`
  margin: 30px;
`;

const Area = styled.div`
  font-size: 20px;
  font-weight: 350;
`;
