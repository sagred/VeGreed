import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import io from "socket.io-client";
import { socketRequest } from "../utils/socketRequest";
import { Button } from "./ui/button";

export let socket: any;

const Loki = () => {
  const [login, setLogin] = useState(false);

  const [socketId, setSocketId] = useState("asgashfds");
  console.log(socketId);
  useEffect(() => {
    socket = io("http://localhost:4000");
    socket.on("publicKeyFromUser", (data: any) => {
      console.log(data);
    });

    socket.on("status", (data) => {
      console.log(data);
    });

    return () => socket.disconnect();
  }, []);

  console.log(socket);

  const qrData = {
    name: "EasyA Auth",
    description: "This is an Event Ticket",
    id: "0x24322689311b668d576bf3f6e9316adfb185909a2ddb0439c5237bd12c49074d",
    socketId: socket?.id,
    type: "publicKeyFromUser",
    socketURL: "https://0c1f-104-28-235-246.ngrok-free.app/",
  };

  console.log(qrData);

  return (
    <div className="w-screen flex bg-white items-center justify-center min-h-screen">
      <div className="max-w-sm">
        {login && (
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={JSON.stringify(qrData)}
            viewBox={`0 0 256 256`}
          />
        )}
        <Button variant={"secondary"} onClick={() => setLogin(true)}>
          Create Proof
        </Button>
      </div>
    </div>
  );
};

export default Loki;
