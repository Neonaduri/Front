import React from "react";
import styled from "styled-components";
import Grid from "../elements/Grid";
import Image from "../elements/Image";

const Popular = () => {
  return (
    <>
      <Title>인기여행</Title>
      <Container>
        <Grid width="420px" flex>
          <br></br>
          <Wrap>
            <Image
              shape="rectangle"
              src="https://i.pinimg.com/originals/45/89/7a/45897a93490d628d6402cc6cdb75f45a.gif"
              size="50"
            />
            <Image
              shape="rectangle"
              src="https://i.pinimg.com/originals/45/89/7a/45897a93490d628d6402cc6cdb75f45a.gif"
              size="50"
            />
            <Image
              shape="rectangle"
              src="https://i.pinimg.com/originals/45/89/7a/45897a93490d628d6402cc6cdb75f45a.gif"
              size="50"
            />

            <Image
              shape="rectangle"
              src="https://i.pinimg.com/originals/45/89/7a/45897a93490d628d6402cc6cdb75f45a.gif"
              size="50"
            />
          </Wrap>
        </Grid>
      </Container>
    </>
  );
};

export default Popular;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  width: 420px;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  margin-top: 150px;
  color: #585858;
`;
