import React from "react";
import "../common/MobileFrame.css";

const MobileFrame = ({ children }) => {
  return (
    <>
      <div className="WebFullFrame">
        <div className="MobileFullFrame">
          <div id="scroll" className="Container">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileFrame;
