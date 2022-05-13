import React from "react";
import styled from "styled-components";
import post1 from "../../static/images/bannerPost/post1.png";
import post2 from "../../static/images/bannerPost/post2.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    arrows: true,
    dots: true,
    fade: false,
    infinite: true,
    pauseOnFocus: true,
    pauseOnHover: true,
    autoplay: true,
    speed: 1000,
  };

  return (
    <>
      <Container>
        <Section>
          <StyledSlide {...settings}>
            <div>
              <Img src={post1} />
              <Button>
                <A
                  href="https://www.ktourmap.com/spotDetails.jsp?contentId=2818498"
                  target="_blank"
                >
                  행사보러가기
                </A>
              </Button>
            </div>

            <div>
              <Img src={post2}></Img>
              <Button>
                <A href="https://hansanmosi.kr/home" target="_blank">
                  행사보러가기
                </A>
              </Button>
            </div>
          </StyledSlide>
        </Section>
      </Container>
    </>
  );
};

export default Banner;

const Container = styled.div``;

const Section = styled.section`
  width: 100%;
  height: 335px;
`;

const A = styled.a`
  text-decoration: none;
  color: white;
`;

const Img = styled.img`
  background-size: cover;
  width: 100%;
`;

const Button = styled.button`
  position: relative;
  bottom: 180px;
  left: 20px;
  width: 112px;
  height: 32px;
  color: white;
  justify-content: center;
  align-items: center;
  background: #000000;
  border-radius: 18px;
  border: none;
  cursor: pointer;
`;

const StyledSlide = styled(Slider)`
  width: 100%;

  .slick-list {
    width: 100%;
    height: 380px;
    margin: 0 auto;
  }

  .slick-track {
    display: flex;
    height: 100%;
  }

  .slick-dots {
    display: none !important;
  }

  .slick-arrow {
    transform: translate(30px, 150px);
    cursor: pointer;
  }
`;
