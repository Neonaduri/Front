import React from "react";
import styled from "styled-components";

const RealtimeMakePlan = (props) => {
  return (
    <Memo>
      <Input type="text" placeholder="메모를 입력해주세용" />
    </Memo>
  );
};

export default RealtimeMakePlan;

const Memo = styled.div`
  position: relative;
`;

const Input = styled.input`
  padding: 60px;
`;
