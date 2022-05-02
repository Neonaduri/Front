import React from "react";
import styled from "styled-components";
import Button from "../elements/Button";
import SearchInput from "../elements/SearchInput";
import Grid from "../elements/Grid";

const Banner = (props) => {
  return (
    <>
      <Container>
        <Section>
          <Title>너나들이 핫한 부산 여행지!!</Title>
          <Button />
        </Section>
      </Container>
    </>
  );
};

export default Banner;

const Container = styled.div``;

const Title = styled.h1`
  padding-top: 150px;
  display: flex;
  justify-content: center;
  align-content: center;
`;

const Section = styled.section`
  background-color: aliceblue;
  width: 100%;
`;
