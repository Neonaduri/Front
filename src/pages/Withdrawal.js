import React from "react";
import Titleline from "../components/elements/Titleline";
import { useHistory } from "react-router";

const Withdrawal = () => {
  const history = useHistory();
  return (
    <div>
      <div>
        <Titleline
          title="회원탈퇴"
          onClick={() => {
            history.goBack();
          }}
        />
      </div>
      <div>준비중입니다.</div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Withdrawal;
