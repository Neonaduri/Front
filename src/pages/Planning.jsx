import React from "react";
import Mappart from "../components/planning/Mappart";
import Schedule from "../components/planning/Schedule";

const Planning = () => {
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
        <Mappart />
        <Schedule />
      </div>
    </>
  );
};

export default Planning;
