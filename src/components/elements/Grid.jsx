import React from "react";
import styled from "styled-components";

const Grid = ({
  flex = false,
  gridBox = false,
  width = "100%",
  margin = false,
  padding = false,
  bg = false,
  children = null,
  center = false,
  height = false,
  position = "static",
  justify = false,
  column = "row",
}) => {
  const styles = {
    flex: flex,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
    center: center,
    gridBox: gridBox,
    height: height,
    position,
    justify,
    column,
  };

  if (gridBox) {
    return (
      <React.Fragment>
        <ParentsGridbox {...styles}>{children}</ParentsGridbox>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <GridBox {...styles}>{children}</GridBox>
    </React.Fragment>
  );
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  position: ${(props) => props.position};
  box-sizing: border-box;
  ${(props) => (props.center ? `text-align:center` : "")};
  ${(props) => (props.padding ? `padding:${props.padding}` : "")};
  ${(props) => (props.margin ? `margin:${props.margin}` : "")};
  ${(props) => (props.bg ? `background-color:${props.bg}` : "")};
  ${(props) =>
    props.flex
      ? `display:flex; align-items:center; justify-content:center`
      : ""};
  ${(props) => (props.height ? `height:${props.height}` : "")};
  ${(props) => (props.justify ? `justify-content:${props.justify}` : "")};
  flex-direction: ${(props) => props.column};
`;

const ParentsGridbox = styled.div`
  width: ${(props) => props.width};
  box-sizing: border-box;
  ${(props) => (props.center ? `text-align:center` : "")};
  ${(props) => (props.padding ? `padding:${props.padding}` : "")};
  ${(props) => (props.margin ? `margin:${props.margin}` : "")};
  ${(props) => (props.bg ? `background-color:${props.bg}` : "")};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
`;

export default Grid;
