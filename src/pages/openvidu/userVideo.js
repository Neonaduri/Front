import React, { useEffect } from "react";
import OpenViduVideoComponent from "./OvVideo";
import "./UserVideo.css";
import PropTypes from "prop-types";

const UserVideoComponent = ({ streamManager }) => {
  // console.log('🐝 🐝 streamManager', streamManager);
  // console.log('🐝 🐝 subscriber', subscriber);
  // const [stream, setStream] = useState(undefined);
  // const [name, setName] = useState(undefined);

  useEffect(() => {
    // if (streamManager) {
    //   streamManager.addVideoElement(videoRef.current);
    // } else {
    //   subscriber.addVideoElement(videoRef.current);
    // }
    // streamManager.addVideoElement(videoRef.current);
    // subscriber.addVideoElement(videoRef.current);
  }, []);

  // const getNicknameTag = () => {
  //   // Gets the nickName of the user
  //   if (streamManager) {
  //     return JSON.parse(streamManager.stream.connection.data).clientData;
  //   } else {
  //     return JSON.parse(subscriber.subscribers.stream.connection.data)
  //       .clientData;
  //   }
  // };

  // const videoRef = useRef();
  return (
    <div>
      {streamManager !== undefined && (
        <div className="streamcomponent">
          <OpenViduVideoComponent streamManager={streamManager} />
        </div>
      )}
    </div>
  );
};

UserVideoComponent.propTypes = {
  streamManager: PropTypes.any,
  subscriber: PropTypes.any,
  onClick: PropTypes.any,
};

export default UserVideoComponent;
