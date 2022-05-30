import React from "react";
import Titleline from "../components/elements/Titleline";
import { useHistory } from "react-router";
import styled from "styled-components";

const Withdrawal = () => {
  const history = useHistory();
  return (
    <div>
      <div>
        <Titleline
          title="계정 삭제"
          onClick={() => {
            history.goBack();
          }}
        />
      </div>
      <ListBox>
        <li>
          계정 삭제시, 개인 정보는 일괄 <span>삭제 처리</span>됩니다.
        </li>
        <li>
          계정 삭제 이후, 재가입하여도 이전 데이터는{" "}
          <span>복구되지 않습니다.</span>
        </li>
        <li>
          계정 삭제시, 댓글은 삭제 처리되지만 기존 작성했던{" "}
          <span>계획 게시물은 삭제되지 않습니다.</span>
        </li>
      </ListBox>
      <Button>계정 삭제하기</Button>
    </div>
  );
};

export default Withdrawal;

const ListBox = styled.div`
  margin: 10px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 343px;
  height: 191px;
  background: #f5f5f5;
  border-radius: 10px;
  li {
    width: 100%;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #8d8d8d;
  }

  span {
    font-weight: 500;
    color: #e50404;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 343px;
  height: 39px;
  background: #e60404;
  border-radius: 5px;
  color: white;
  border: 0;
`;
