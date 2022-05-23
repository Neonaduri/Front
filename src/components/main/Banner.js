import React from "react";
import styled from "styled-components";
import post1 from "../../static/images/bannerPost/post1.png";
import post2 from "../../static/images/bannerPost/post2.png";
import post3 from "../../static/images/bannerPost/post3.png";
import post4 from "../../static/images/bannerPost/post4.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    fade: false,
    infinite: true,
    autoplay: true,
    speed: 2000,
    dots: true,
    arrows: true,
    color: "#ffffff",
  };

  return (
    <>
      <div>
        <Section>
          <StyledSlide {...settings}>
            <div>
              <Img src={post1} />
              <Button>
                <Link href="http://www.seamudexpo.or.kr/" target="_blank">
                  행사보러가기
                </Link>
              </Button>
            </div>

            <div>
              <Img src={post2}></Img>
              <Button>
                <Link
                  href="https://xn--o39aw54a7jcg1kemaw8w.kr/"
                  target="_blank"
                >
                  행사보러가기
                </Link>
              </Button>
            </div>

            <div>
              <Img src={post3}></Img>
              <Button>
                <Link
                  href="https://www.ktourmap.com/spotDetails.jsp?contentId=2818498"
                  target="_blank"
                >
                  행사보러가기
                </Link>
              </Button>
            </div>

            <div>
              <Img src={post4}></Img>
              <Button>
                <Link href="https://hansanmosi.kr/home" target="_blank">
                  행사보러가기
                </Link>
              </Button>
            </div>
          </StyledSlide>
        </Section>
      </div>
    </>
  );
};

export default Banner;

const Section = styled.section`
  width: 100%;
  height: 335px;
  margin-bottom: 10px;
`;

const Link = styled.a`
  text-decoration: none;
  color: white;
`;

const Img = styled.img`
  background-size: cover;
  width: 100%;
`;

const Button = styled.button`
  position: relative;
  bottom: 170px;
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

  .slick-dots {
    display: flex;
    justify-content: center;
    margin: 60px 0;
    padding: 1rem 0;
  }

  .slick-track {
    display: flex;
    height: 100%;
  }

  .slick-dots li {
    margin: 0 0.25rem;
  }

  .slick-dots button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255);
    text-indent: -9999px;
    cursor: pointer;
    opacity: 80%;
  }

  .slick-dots li.slick-active button {
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: center;
    align-items: center;
    background-color: white;
    width: 16px;
    height: 6px;
    border-radius: 52px;
  }

  .slick-dots {
    /* display: none !important; */
    margin-bottom: 80px;
  }
`;
