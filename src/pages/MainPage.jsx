import React from "react";
import styled from "styled-components";
import Grid from "../components/elements/Grid";
import Banner from "../components/main/Banner";
import Location from "../components/main/Location";
import MakePlan from "../components/main/MakePlan";
import Popular from "../components/main/Popular";

const MainPage = () => {
  return (
    <>
      <Section bg="tomato" width="420px" position="absolute">
        <Banner />
        <MakePlan />
        <Popular />
        <Location />
      </Section>
    </>
  );
};

export default MainPage;

const Section = styled.section`
  background-color: blue;
  justify-content: center;
  align-content: center;
  margin-left: 250px;
  width: 420px;
`;
