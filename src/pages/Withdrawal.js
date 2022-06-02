import React, { useRef, useState } from "react";
import Titleline from "../components/elements/Titleline";
import { useHistory } from "react-router";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deleteAccountDB } from "../redux/module/user";

const Withdrawal = () => {
  let token;
  let inputRef = useRef();
  const [checkState, setCheckState] = useState(false);

  if (localStorage.getItem("token")) {
    token = localStorage.getItem("token");
  }

  const history = useHistory();
  const dispatch = useDispatch();
  const checkClick = () => {
    const check = inputRef.current.checked;
    if (check) setCheckState(true);
    else setCheckState(false);
  };
  const onClick = () => {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      dispatch(deleteAccountDB(token));
    }
  };

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
          계정 삭제 이후, 재가입하여도 이전 데이터는 <br />
          <span> 복구되지 않습니다.</span>
        </li>
        <li>
          계정 삭제시, 댓글은 삭제 처리되지만 기존 작성했던
          <span> 계획 게시물은 삭제되지 않습니다.</span>
        </li>
      </ListBox>

      <InputBox>
        <input type="checkbox" ref={inputRef} onChange={checkClick}></input>
        <div>위 내용을 모두 확인하였으며, 이에 동의합니다.</div>
      </InputBox>
      <Button
        check={checkState}
        disabled={checkState ? false : true}
        onClick={onClick}
      >
        계정 삭제하기
      </Button>
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
    position: relative;
    list-style: none;
    width: 80%;
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    color: #8d8d8d;
    padding-left: 10px;
    padding-bottom: 15px;
    /* white-space: pre-wrap; */
  }
  li:before {
    position: absolute;
    content: "";
    top: 10px;
    left: 0;
    width: 3px;
    height: 3px;
    background-color: #8d8d8d;
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
  margin-top: 40px;
  width: 343px;
  height: 39px;
  background: ${(props) => (props.check ? "#e60404" : "#F5F5F5")};
  color: ${(props) => (props.check ? "white" : "#8D8D8D")};
  border-radius: 5px;
  /* color: white; */
  border: 0;
  cursor: pointer;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin: 20px 35px;

  div {
    margin-left: 10px;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #8d8d8d;
  }
`;
