import React from "react";
import styled from "styled-components";
import post1 from "../../static/images/bannerPost/post1.png";

const Banner = (props) => {
  return (
    <>
      <Container>
        <Section>
          <Img src={post1}></Img>
        </Section>
      </Container>
    </>
  );
};

export default Banner;

const Container = styled.div``;

const Section = styled.section`
  width: 100%;
  height: 365px;
`;

const Img = styled.img`
  background-size: cover;
  width: 100%;
`;
