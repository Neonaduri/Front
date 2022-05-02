import React from "react";
import Image from "../elements/Image";
import Grid from "../elements/Grid";
import styled from "styled-components";

const MakePlan = (props) => {
  return (
    <>
      <Title>여행테마</Title>
      <Container>
        <Grid flex width="420px">
          <Wrap>
            <Image
              shape="circle"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkDT0X-nO8Njqxd57Kf8OZx2jvfDlzVaZyTpE34O8-OHTTEbodYC-TYzIwRyq-UEkVess&usqp=CAU"
              size="80"
            />
            <Image
              shape="circle"
              src="https://cdn.3hoursahead.com/v1/trip-cover/1x/a64ce1ad-1658-4da1-9b72-e17793f9ab13.jpeg"
              size="80"
            />
            <Image
              shape="circle"
              src="https://image.news1.kr/system/photos/2020/5/18/4198953/article.jpg/dims/optimize"
              size="80"
            />
            <Image
              shape="circle"
              src="https://www.sisaweek.com/news/photo/202011/139152_131022_2520.jpg"
              size="80"
            />
          </Wrap>
        </Grid>
      </Container>
    </>
  );
};

export default MakePlan;

const Container = styled.div`
  margin-top: 50px;
  position: relative;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  margin-top: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #585858;
`;
