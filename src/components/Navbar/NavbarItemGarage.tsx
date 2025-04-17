"use client";

import { useEffect } from "react";

import { MapPinHouseIcon } from "lucide-react";

import fetchWrapper from "@/lib/fetch";

import useNotificationState from "@/states/notification";

import NavbarItem from "./NavbarItem";

export default function NavbarItemGarage() {
  const { pendingBookingsQuantity, setPendingBookingsQuantity } =
    useNotificationState();

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
