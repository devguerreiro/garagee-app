"use client";

import useWebSocketNotification from "@/hooks/use-websocket-notification";

export default function WSNotification() {
  useWebSocketNotification({
    eventName: "new booking",
    message: "Você recebeu uma nova solicitação de reserva",
  });

  return <></>;
}
