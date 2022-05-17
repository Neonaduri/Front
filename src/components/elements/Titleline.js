import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

const Titleline = (props) => {
  return (
    <Titlepart>
      <span>{props.title}</span>
    </Titlepart>
  );
};

const Titlepart = styled.div`
  padding: 10px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin-top: 10px;
`;

export default Titleline;
