import React, { useEffect } from "react";
import styled from "styled-components";
import Footer from "../components/common/Footer";
import Banner from "../components/main/Banner";
import Location from "../components/main/Location";
import MakePlan from "../components/main/MakePlan";
import Popular from "../components/main/Popular";

const MainPage = ({ history }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    history.push("/login");
  }
  return (
    <>
      <Section>
        <Banner />
        <MakePlan />
        <Popular />
        <Location />
        <Footer />
      </Section>
    </>
  );
};

export default MainPage;

const Section = styled.section`
  justify-content: center;
  align-content: center;
`;
