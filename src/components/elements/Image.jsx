import styled from "styled-components";
import React from "react";

const Image = (props) => {
  const { shape, src, size } = props;

  const styles = {
    src: src,
    size: size,
  };

  if (shape === "circle") {
    return <ImageCircle {...styles}></ImageCircle>;
  }

  if (shape === "rectangle") {
    return (
      <AspectOutter>
        <AspectInner {...styles}></AspectInner>
      </AspectOutter>
    );
  }

  return <React.Fragment></React.Fragment>;
};

Image.defaultProps = {
  shape: "circle",
  src: "https://img.huffingtonpost.com/asset/5ac5987c200000d30ceb3e9c.jpeg?ops=scalefit_630_noupscale",
  size: 36,
};

const AspectOutter = styled.div`
  width: 100%;
  height: 200px;
  min-width: 250px;
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  height: 200px;
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: 30px;
  border-radius: 20px 20px 0px 0px;
  cursor: pointer;
`;

const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: 30px;
  cursor: pointer;
`;

export default Image;
