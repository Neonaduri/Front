import React from "react";
import { OpenVidu } from "openvidu-browser";
import { useState } from "react";

const Sound = (props) => {
  const [OV, setOV] = useState(new OpenVidu());
  const [session, setSession] = useState(OV.initSession());
};
export default Sound;
