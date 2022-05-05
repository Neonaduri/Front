import React from "react";
import styled from "styled-components";

const Banner = (props) => {
  return (
    <>
      <Container>
        <Section>
          <Title>창덕궁 달빛기행</Title>
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
  color: #363636;
  justify-content: center;
  align-content: center;
`;

const Section = styled.section`
  background-color: #62ce8b;
  width: 100%;
  height: 365px;
`;
