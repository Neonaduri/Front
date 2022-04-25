import React from "react";
import styled from "styled-components";
import Button from "../elements/Button";
import SearchInput from "../elements/SearchInput";
import Grid from "../elements/Grid";

const Banner = (props) => {
  return (
    <>
      <Container>
        <Grid width="1920px" is_flex>
          <Grid bg="#eaeaea" height="350px" is_flex>
            <Title>너나들이 핫한 부산 여행지!!</Title>
            <Button />
            <SearchInput />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Banner;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 150px;
`;
