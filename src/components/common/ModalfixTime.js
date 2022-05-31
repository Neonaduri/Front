import React from "react";
import "../../assets/modalTime.css";

const ModalfixTime = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, onSubmitClick, btnstyle = "submit" } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <main>{header}</main>
          <footer>
            <button onClick={close}>취소</button>
            {btnstyle === "del" ? (
              <button
                onClick={onSubmitClick}
                style={{ backgroundColor: "#E50404" }}
              >
                삭제
              </button>
            ) : (
              <button onClick={onSubmitClick}>등록하기</button>
            )}
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default ModalfixTime;
