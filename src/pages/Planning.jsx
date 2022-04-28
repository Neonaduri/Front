import React from "react";
import Mappart from "../components/planning/Mappart";

const Planning = (props) => {
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

        }}
      >
        <Mappart />
      </div>
    </>
  );
};

export default Planning;
