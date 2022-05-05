import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import Sound from "../components/chat/Sound";

const Chat = () => {
  const [currentSocket, setCurrentSocket] = useState();

  useEffect(() => {
    setCurrentSocket(socketIOClient("localhost:3000"));
  }, []);

  return (
    <>
      <input socket={currentSocket} />;
      <Sound />
    </>
  );
};

export default Chat;
