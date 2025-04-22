"use client";

import { useEffect, useState } from "react";

import { MapPinHouseIcon } from "lucide-react";

import fetchWrapper from "@/lib/fetch";

import useWebSocketNotification from "@/hooks/use-websocket-notification";

import NavbarItem from "./NavbarItem";

export default function NavbarItemGarage() {
  const [pendingBookingsQuantity, setPendingBookingsQuantity] = useState<
    number | null
  >(null);

  function getPendingReceivedQuantity() {
    if (pendingBookingsQuantity) {
      if (pendingBookingsQuantity > 99) return "99+";
      return pendingBookingsQuantity.toString();
    }
    return "-";
  }

  useEffect(() => {
    fetchWrapper<number>("booking/pending-received-quantity").then(
      (response) => {
        if (response.data) {
          setPendingBookingsQuantity(response.data);
        }
      }
    );
  }, []);

  useWebSocketNotification({
    eventName: "new booking",
    message: "Você recebeu uma nova solicitação de reserva",
    callback: () =>
      setPendingBookingsQuantity((old) => {
        if (old) return old + 1;
        return 0;
      }),
  });

  return (
    <NavbarItem href="/garagem">
      <MapPinHouseIcon />
      <span>Garagem</span>
      <span className="absolute -top-2 -right-2 bg-primary text-white font-bold text-[8px] px-2 rounded-full">
        {getPendingReceivedQuantity()}
      </span>
    </NavbarItem>
  );
}
