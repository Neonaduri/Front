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
  display: flex;
  flex-direction: column;
  padding: 20px;
  p {
    display: flex;
    justify-content: left;
    font-family: "apple2";
    font-size: 16px;
    line-height: 19px;
  }
  input {
    padding: 10px;
    margin-top: 10px;
    width: 100%;
    height: 39px;
    border: 1px solid ${({ theme }) => theme.colors.text3};
    border-radius: 5px;
    &::placeholder {
      color: ${({ theme }) => theme.colors.text3};
    }
  }
`;
