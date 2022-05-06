import React, { useEffect } from "react";
import styled from "styled-components";
import { OpenVidu } from "openvidu-browser";
import { useDispatch } from "react-redux";
import axiosInstance from "../../shared/request";
import apis from "../../shared/request";

const Openvidu = () => {
  const dispatch = useDispatch();
  const OV = new OpenVidu();

  const session = OV.initSession();

  const nickName = sessionStorage.getItem("nickName");
  const roomId = sessionStorage.getItem("roomId");
  const role = sessionStorage.getItem("role");

  console.log(nickName, roomId, role);

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

  const getToken = async (roomId, nickName, role) => {
    const data = {
      roomId: roomId,
      nickName: nickName,
      role: role,
      participantCount: 4,
    };
    //서버한테 보내주는 데이터

    console.log(data);
    // return await apis.axiosOVInstance
    //   .post("/auth/api/openvidu/getToken", data)
    //   .then((res) => {
    //     console.log(res);
    //     localStorage.setItem("OVAccessToken", res.data.token);
    //     return res.data.token;
    //   });
  };

  const connect = (token) => {
    if (session) {
      session
        .connect(token, {
          profileImageUrl: localStorage.getItem("profileImageUrl"),
        })
        .then(() => {
          connectVoice().then((res) => res);
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
        console.log(data);
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
