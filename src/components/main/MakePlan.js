import React from "react";
import Image from "../elements/Image";
import Grid from "../elements/Grid";
import styled from "styled-components";
import { useHistory } from "react-router";

const MakePlan = () => {
  const history = useHistory();

  return (
    <>
      <Div>
        <Title>여행테마</Title>
        <Container>
          <Grid flex>
            <Wrap>
              <Image
                shape="rectangle"
                src="https://a.cdn-hotels.com/gdcs/production166/d135/a06c88d0-2446-4d2f-96d9-7afc2d01e8fb.jpg?impolicy=fcrop&w=800&h=533&q=medium"
                size="62"
              />
              <Image
                shape="rectangle"
                src="https://image1.onlinetour.co.kr/resize.php?w=400&u=https://image1.onlinetour.co.kr/obms_images/keyword/2022/0421/20220421111912B878041498FD467799977884F261F151.JPG"
                size="62"
              />
              <Image
                shape="rectangle"
                src="https://dcinside.mycelebs.com/service/uploaded/theme/1417.jpeg"
                size="62"
              />
              <Image
                shape="rectangle"
                src="https://youimg1.tripcdn.com/target/100k0u000000jguly8D69_D_1180_558.jpg?proc=source%2Ftrip"
                size="62"
              />
            </Wrap>
          </Grid>
          <Grid flex width="420px">
            <Wrap>
              <Image
                shape="rectangle"
                src="https://image.theminda.com/data/tg/image/item/high/202002/eb0fcc2ecd580bc85f5bc919f691dcf6.jpg"
                size="62"
              />
              <Image
                shape="rectangle"
                src="http://www.travelnbike.com/news/photo/201805/57815_85365_4941.jpg"
                size="62"
              />
              <Image
                shape="rectangle"
                src="https://www.eurobike.kr/upload/goods_data/212018510504367.jpg"
                size="62"
              />
              <Image
                shape="rectangle"
                src="https://kr.blog.kkday.com/wp-content/uploads/2017/10/5324-15-e1509086144609.jpeg"
                size="62"
              />
              <Image
                shape="rectangle"
                src="https://t1.daumcdn.net/cfile/tistory/99EBAB4F5E7073F139"
                size="62"
              />
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

const Div = styled.div`
  position: relative;
  background-color: #ffffff;
  height: 267px;
  border-radius: 30px 30px 0px 0px;
  bottom: 30px;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.p`
  color: #585858;
  padding-top: 40px;
  padding-left: 25px;
  font-weight: 500;
`;
