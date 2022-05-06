import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { OpenVidu } from "openvidu-browser";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../shared/request";
import apis from "../../shared/request";
import { useHistory, useParams } from "react-router";

const Openvidu = ({ nickName }) => {
  const history = useHistory();
  const params = useParams();
  const postId = params.postId;
  const dispatch = useDispatch();
  const OV = new OpenVidu();

  const session = OV.initSession();
  const OVnickName = sessionStorage.getItem("OVnickName");
  const OVrole = sessionStorage.getItem("OVrole");
  const [publisher, setPublisher] = useState(undefined);
  const [publisherProfileImage, setPublisherProfileImage] = useState(undefined);

  const onbeforeunload = () => {
    alert("dddd");
  };

  window.onbeforeunload = function (e) {
    alert("dddd");
  };

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
    let data = {
      roomId: postId,
      nickName: OVnickName,
      role: OVrole,
      participantCount: 9999,
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
          profileImageUrl: sessionStorage.getItem("profileImgUrl"),
        })
        .then(() => {
          console.log("connection 완료");
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
      const initPublisher = OV.initPublisher(undefined, {
        audioSource: true,
        videoSource: false,
        publishAudio: true,
        publishVideo: false,
        resolution: "640x480",
        frameRate: 30,
        insertMode: "APPEND",
        mirror: false,
      });
      console.log(initPublisher);
      await session.publish(initPublisher);
      setPublisher(initPublisher);
      setPublisherProfileImage(sessionStorage.getItem("profileImgUrl"));
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
  if (!sessionStorage.getItem("OVrole")) {
    history.replace(`/planning/${postId}/join`);
  }
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
