import React from "react";
import Mappart from "../components/planning/Mappart";

const Planning = ({ memo_repo }) => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          display: "block",
          justifyContent: "right",
          alignItems: "center",
          width: "420px",
          height: "100%",
          // backgroundColor: "tomato",
          // marginLeft: "1110px",
        }}
      >
        <Mappart memo_repo={memo_repo} />
      </div>
    </>
  );
};

export default Planning;
