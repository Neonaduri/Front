import React from "react";
import { useHistory } from "react-router";

const UploadComplete = () => {
  const history = useHistory();
  return (
    <div>
      <div>
        <span>계획이 저장되었습니다. 즐거운 여행되세요.</span>
      </div>
      <div>
        <span>URL 복사하기</span>
        <button onClick={() => history.push("/")}>홈으로 가기</button>
      </div>
    </div>
  );
};

export default UploadComplete;
