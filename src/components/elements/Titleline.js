import React from "react";
import { FaPlus } from "react-icons/fa";
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
  font-size: 20px;
  margin-top: 20px;
`;

export default Titleline;
