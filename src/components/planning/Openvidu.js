import React, { useEffect, useState } from "react";
import { OpenVidu } from "openvidu-browser";
import apis from "../../shared/request";
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";

const Openvidu = () => {
  // const history = useHistory();
  // const OV = new OpenVidu();
  // const [detectSpeaking, setDetectSpeaking] = useState(false);
  // const [session, setSession] = useState(OV.initSession());
  // const [remoteMicState, setRemoteMicState] = useState({
  //   remoteTarget: undefined,
  //   isAudioActive: undefined,
  // });
  // const [roomSubscribers, setRoomSubscribers] = useState([
  //   { subscriber: sessionStorage.getItem("OVAccessToken") },
  // ]);
  // const [publisher, setPublisher] = useState(undefined);
  // const params = useParams();
  // const postId = params.postId;
  // const userInfo = useSelector((state) => state.user.list);

  // const subscribers = [];

  // session.on("streamCreated", (event) => {
  //   console.log("스트림 크리에이티드란?", event.stream);
  //   let subscriber = session.subscribe(event.stream, undefined);
  //   subscribers.push(subscriber);
  // });
  // console.log(subscribers);
  // session.on("streamDestroyed", (event) => {
  //   event.preventDefault();
  //   console.log("스트림 디스트로이드란?", event);
  // });

  // useEffect(() => {
  //   subscribeToStreamCreated();
  //   subscribeToStreamDestroyed();
  // }, []);
  // const subscribeToStreamDestroyed = () => {
  //   if (session) {
  //     session.on("streamDestroyed", (event) => {
  //       console.log("🏙🏙🏙🏙🏙🏙🏙🏙");
  //       // deleteSubscriber(event.stream.streamManager);
  //     });
  //   }
  // };

  // const leaveSession = () => {
  //   if (session) {
  //     session.disconnect();
  //   }
  //   setPublisher(undefined);
  //   // dispatch(removeAllRoomSubscribers);
  // };

  // const getToken = async () => {
  //   let data;
  //   if (userInfo.length === 0) {
  //     data = {
  //       postId,
  //       nickName: "비회원",
  //       role: "PUBLISHER",
  //       participantCount: 6,
  //     };
  //   } else {
  //     data = {
  //       postId,
  //       nickName: userInfo.nickName,
  //       role: "MODERATOR",
  //       participantCount: 6,
  //     };
  //   }
  //   console.log(data);
  //   return await apis.axiosOVInstance
  //     .post("/auth/api/openvidu/getToken", data)
  //     .then((token) => {
  //       sessionStorage.setItem("OVAccessToken", token.data.token);
  //       return token.data.token;
  //     });
  // };

  // const connectVoice = async () => {
  //   if (session) {
  //     const devices = await OV.getDevices();
  //     // const videoDevices = devices.filter((device) => {
  //     //   return device.kind === 'videoinput';
  //     // });
  //     const audioDevices = devices.filter((device) => {
  //       return device.kind === "audioinput";
  //     });
  //     /////////**** */////////////
  //     let initPublisher = OV.initPublisher(undefined, {
  //       audioSource: true, // The source of audio. If undefined default microphone
  //       // videoSource:
  //       //   joinRoomStatus.role === 'PUBLISHER' ? false : videoDevices[1].deviceId, // The source of video. If undefined default webcam
  //       videoSource: false,
  //       publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
  //       publishVideo: false, // Whether you want to start publishing with your video enabled or not
  //       resolution: "640x480", // The resolution of your video
  //       frameRate: 30, // The frame rate of your video
  //       insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
  //       mirror: false, // Whether to mirror your local video or not
  //     });
  //     console.log(initPublisher);
  //     await session.publish(initPublisher);
  //     setPublisher(initPublisher);
  //   }
  // };

  // const connect = (token) => {
  //   if (session) {
  //     session
  //       .connect(token)
  //       .then((r) => {
  //         connectVoice().then((r) => r);
  //       })
  //       .catch((error) => {
  //         //!Todo 나중에 무조건 Alert 삭제해야함! 그래야 페이지 이동 바로됨!
  //         // alert(`There was an error connecting to the session: ${error.message}`);
  //         alert("이미 종료된 방입니다!");
  //         console.log(
  //           "There was an error connecting to the session:",
  //           error.code,
  //           error.message
  //         );
  //         localStorage.removeItem("OVAccessToken");
  //         history.replace("/");
  //       });
  //   }
  // };

  // const connectToSession = () => {
  //   getToken().then((token) => connect(token));
  // };

  // const publisherDetectSpeaking = () => {
  //   if (publisher) {
  //     publisher.on("publisherStartSpeaking", (event) => {
  //       console.log("The local user start speaking");
  //       setDetectSpeaking(true);
  //     });
  //     publisher.on("publisherStopSpeaking", (event) => {
  //       console.log("The local user stop speaking");
  //       setDetectSpeaking(false);
  //     });
  //   }
  // };
  // console.log(detectSpeaking);
  // useEffect(() => {
  //   receiveMicStatus();
  // }, []);

  // // 마이크 상태가 변하면 메세지를 받는다.
  // const receiveMicStatus = () => {
  //   if (session) {
  //     session.on("signal:userChanged", (event) => {
  //       console.log("signal 등장");
  //       const isAudioActive = JSON.parse(event.data).isAudioActive;
  //       const remoteTarget = event.from.connectionId;
  //       setRemoteMicState({
  //         remoteTarget: remoteTarget,
  //         isAudioActive: isAudioActive,
  //       });
  //       console.log("마이크 상태를 정상적으로 전송 받았습니다!");
  //     });
  //   }
  // };

  // useEffect(() => {
  //   publisherDetectSpeaking();
  //   return () => publisherDetectSpeaking();
  // }, [publisher]);

  // const joinSession = async () => {
  //   await connectToSession();
  //   // await session.on('exception', (exception) => {
  //   //   console.warn(exception);
  //   // });
  // };
  // const subscribeToStreamCreated = () => {
  //   if (session) {
  //     session.on("streamCreated", (event) => {
  //       let subscriber = session.subscribe(event.stream, undefined);
  //       // let subscribers = subscribersState;
  //       // subscribers.push(subscriber);
  //       // setSubscribersState(subscribers);

  //       const data = subscriber.stream.connection.data.split("%")[0];
  //       const imageUrl = JSON.parse(data).profileImageUrl;
  //       console.log(data, imageUrl);
  //       //  dispatch(
  //       //    setRoomSubscribers({
  //       //      subscriber: subscriber,
  //       //      profileImageUrl: imageUrl,
  //       //    })
  //       //  );
  //     });
  //   }
  // };

  // const onbeforeunload = async (event) => {
  //   // event.preventDefault();
  //   // eslint-disable-next-line no-param-reassign
  //   // event.returnValue = '';
  //   console.log("방 나감");
  //   // if (joinRoomStatus.role !== "MODERATOR") {
  //   // 흠.. 하나의 함수만 실행 가능한 것 같음. 두번째 함수부터는 실행이 안됨.
  //   // await leaveRoom();
  //   // await leaveRoom().then(() => navigate('/home', { replace: true }));
  //   // await navigate('/room', { replace: true });
  //   // } else {
  //   // await sendForceLeave();
  //   // await sendForceLeave();
  //   // await leaveRoom();
  //   // await closeRoom();
  // };
  // // };

  // useEffect(() => {
  //   window.addEventListener("beforeunload", onbeforeunload);
  //   if (!sessionStorage.getItem("OVAccessToken")) {
  //     joinSession().then((r) => r);
  //   }
  //   return () => window.removeEventListener("beforeunload", onbeforeunload);
  // }, []);

  return (
    <div>
      <div></div>
    </div>
  );
};

export default Openvidu;
