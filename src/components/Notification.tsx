"use client";

import useWebSocketNotification from "@/hooks/use-websocket-notification";

import useNotificationState from "@/states/notification";

export default function Notification() {
  const { incrementPendingBookingsQuantity } = useNotificationState();

  useWebSocketNotification({
    eventName: "new booking",
    message: "Você recebeu uma nova solicitação de reserva",
    callback: incrementPendingBookingsQuantity,
  });

  return <></>;
}
