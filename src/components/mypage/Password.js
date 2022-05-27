import React from "react";
import styled from "styled-components";

const Password = ({ name, title, setPwd, pwd }) => {
  const onChange = (e) => {
    const { name, value } = e.target;

    setPwd({
      ...pwd,
      [name]: value,
    });
  };

  return (
    <Container>
      <p>{title}</p>
      <input
        type="password"
        onChange={onChange}
        name={name}
        placeholder="4자리 이상 12자리 미만"
      ></input>
    </Container>
  );
};

export default Password;

const Container = styled.div`
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 20px;
  p {
    display: flex;
    justify-content: left;
    font-family: "Apple SD Gothic Neo";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
  }

  input {
    padding: 10px;
    margin-top: 10px;
    width: 335px;
    height: 39px;
    border: 1px solid #cacaca;
    border-radius: 5px;
  }
`;
