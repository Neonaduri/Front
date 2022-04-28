import React from "react";
import GoogleMap from "../components/planning/map/GoogleMap";
import RealtimeMakePlan from "../components/planning/plan/RealtimeMakePlan";

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
          // backgroundColor: "tomato",
          // marginLeft: "1110px",
        }}
      >
        <GoogleMap />
      </div>
    </>
  );
};

export default Planning;
