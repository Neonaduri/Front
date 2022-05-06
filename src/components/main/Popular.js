import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import love from "../../static/images/love.png";
import Union from "../../static/images/Union.png";

const Popular = (props) => {
  const settings = {
    slidesToShow: 2,
    slidesToScroll: 2,
    centerMode: true,
    centerPadding: "0px",
    arrows: true,
    dots: true,
    fade: false,
    infinite: true,
    pauseOnFocus: true,
    pauseOnHover: true,
  };

  return (
    <>
      <Line />
      <Div>
        <Name>
          <Title>인기여행</Title>
        </Name>

        <div style={{ display: "flex", position: "relative" }}>
          <StyledSlide {...settings}>
            <Wrap>
              <ImagePop src="https://mblogthumb-phinf.pstatic.net/MjAyMDAyMjlfMTY5/MDAxNTgyOTYzOTUyMzQ0.PbK6CMMKTOPLho9Ibr__DyC5sZq_deM697zsyejJsVMg.2xwHAE4G8ojR_mODq-DmMDmc0k0fDBMjR-E-M-i8VUMg.JPEG.haedud128/IMG_2905.JPG?type=w800" />
              <Box>
                <Content>방콕에서의 하루</Content>
                <SectionBox>
                  <Like>
                    <img src={love} />
                    <Cnt>2,431</Cnt>
                  </Like>

                  <Like>
                    <img src={Union} />
                    <Cnt>25</Cnt>
                  </Like>
                </SectionBox>
              </Box>
            </Wrap>

            <Wrap>
              <ImagePop src="https://cdn.traveltimes.co.kr/news/photo/202110/113374_11730_5213.jpg" />

              <Box>
                <Content>남친과 제주도 1박2일</Content>
                <SectionBox>
                  <Like>
                    <img src={love} />
                    <Cnt>2,431</Cnt>
                  </Like>

                  <Like>
                    <img src={Union} />
                    <Cnt>25</Cnt>
                  </Like>
                </SectionBox>
              </Box>
            </Wrap>

            <Wrap>
              <ImagePop src="https://res.klook.com/image/upload/fl_lossy.progressive,q_85/c_fill,w_410,h_264/v1617101647/blog/edlhmuf96dpqcnodl9qf.jpg" />

              <Box>
                <Content>혼자서 떠난 거제도~!</Content>
                <SectionBox>
                  <Like>
                    <img src={love} />
                    <Cnt>2,431</Cnt>
                  </Like>

                  <Like>
                    <img src={Union} />
                    <Cnt>25</Cnt>
                  </Like>
                </SectionBox>
              </Box>
            </Wrap>

            <Wrap>
              <ImagePop src="https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/oeE/image/qr9sTCdke-KEFZ55c32Vrzciu8I.jpg" />

              <Box>
                <Content>친구랑 떠나는 여행 :)</Content>
                <SectionBox>
                  <Like>
                    <img src={love} />
                    <Cnt>2,431</Cnt>
                  </Like>

                  <Like>
                    <img src={Union} />
                    <Cnt>25</Cnt>
                  </Like>
                </SectionBox>
              </Box>
            </Wrap>
          </StyledSlide>
        </div>
      </Div>
    </>
  );
};

export default Popular;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 420px;
`;

const StyledSlide = styled(Slider)`
  position: relative;
  margin-top: 30px;
  width: 100%;

  .slick-list {
    position: absolute;
    width: 330px;
    height: 370px;
    margin: 0 auto;
    top: -30px;
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

const SectionBox = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 5px;
`;

const Wrap = styled.div`
  display: flex;
  position: relative;
`;

const Like = styled.div`
  margin-left: 10px;
  display: flex;
  justify-content: left;
  align-items: center;
`;

const Cnt = styled.div`
  margin-left: 5px;
  color: #8d8d8d;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
`;

const Name = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Content = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 15px;
  margin-left: 10px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #363636;
  font-family: "Apple SD Gothic Neo";
`;

const Box = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.1);
  width: 158px;
  height: 60px;
  position: absolute;
  bottom: 0;
`;

const ImagePop = styled.img`
  /* filter: drop-shadow(1px 2px 10px rgba(0, 0, 0, 0.1)); */
  border-radius: 10px;
  width: 158px;
  height: 236px;
  object-fit: cover;
  margin-top: 40px;
  margin-right: 20px;
`;

const Line = styled.div`
  width: 400px;
  height: 10px;
  background: #eeeeee;
`;

const Title = styled.div`
  color: #585858;
  font-weight: 500;
`;

const Div = styled.div`
  color: #363636;
  /* position: relative; */
  margin-top: 50px;
  margin-left: 28px;
`;
