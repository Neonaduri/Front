import React, { useEffect } from "react";
import styled from "styled-components";
import { OpenVidu } from "openvidu-browser";
import { useDispatch } from "react-redux";
import axiosInstance from "../../shared/request";
import apis from "../../shared/request";

const Openvidu = ({ nickName }) => {
  const dispatch = useDispatch();
  const OV = new OpenVidu();
  const session = OV.initSession();
  console.log(nickName);

  useEffect(() => {
    joinSession();
  }, []);

  const joinSession = async () => {
    await connectToSession();
    await subscribeToStreamCreated();
  };
  const connectToSession = () => {
    getToken()
      .then((token) => {
        connect(token);
      })
      .catch((error) => {
        alert(`There was an error getting the token: ${error.message}`);
      });
  };

  const getToken = async () => {
    const data = {
      roomId: 1,
      nickName: "예령",
      role: "MODERATOR",
      participantCount: 4,
    };
    return await apis.axiosOVInstance
      .post("/auth/api/openvidu/getToken", data)
      .then((res) => {
        console.log(res);
        localStorage.setItem("OVAccessToken", res.data.token);
        return res.data.token;
      });
  };
  const connect = (token) => {
    if (session) {
      session
        .connect(token, {
          profileImageUrl: localStorage.getItem("profileImageUrl"),
        })
        .then(() => {
          connectVoice().then((r) => r);
        });
    }
  };
  const connectVoice = async () => {
    if (session) {
      const devices = await OV.getDevices();
      const audioDevices = devices.filter((device) => {
        return device.kind === "audioinput";
      });
      console.log(audioDevices);
    }
  };

  const subscribeToStreamCreated = () => {
    if (session) {
      session.on("streamCreated", (event) => {
        console.log("streamCreated 이벤트 실행!!!!!!!!");
        let subscriber = session.subscribe(event.stream, undefined);
        const data = subscriber.stream.connection.data.split("%")[0];
        const imageUrl = JSON.parse(data).profileImageUrl;
        // dispatch(
        //   setRoomSubscribers({
        //     subscriber: subscriber,
        //     profileImageUrl: imageUrl,
        //   })
        // );
      });
    }
  };

  return (
    <div>
      <Circle></Circle>
    </div>
  );
};

const Circle = styled.div`
  width: 50px;
  height: 50px;
  background-color: gray;
  border-radius: 50%;
`;

export default Openvidu;
