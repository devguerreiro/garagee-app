"use client";

import { io } from "socket.io-client";

export function getSocket() {
  return io(process.env.NEXT_PUBLIC_WS_URI);
}
