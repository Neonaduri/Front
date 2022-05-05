import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const OvVideo = ({ streamManager }) => {
  const videoRef = useRef();

  useEffect(() => {
    if (streamManager) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <>
      {streamManager && (
        <>
          <video
            autoPlay={true}
            ref={videoRef}
            style={{ width: 200, height: 200 }}
          />
        </>
      )}
    </>
  );
};

OvVideo.propTypes = {
  streamManager: PropTypes.any,
};

export default OvVideo;
