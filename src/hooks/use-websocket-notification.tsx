"use client";

import { useEffect } from "react";

import { toast } from "sonner";

import { getSocket } from "@/lib/socket.io";

import { decodeTokenFromCookie } from "@/utils";

type Props = {
  eventName: string;
  message: string;
};

export default function useWebSocketNotification({
  eventName,
  message,
}: Readonly<Props>) {
  useEffect(() => {
    const socket = getSocket();

    const decodedToken = decodeTokenFromCookie();

    socket.emit("join room", decodedToken.sub, (room: string) => {
      if (room) {
        socket.on(eventName, () => {
          toast.info(message);
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);
}
