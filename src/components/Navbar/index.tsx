import {
  BookUserIcon,
  CarIcon,
  CircleUserIcon,
  MapPinHouseIcon,
} from "lucide-react";

import fetchWrapper from "@/lib/fetch";

import NavbarItem from "./NavbarItem";

export default async function Navbar() {
  const response = await fetchWrapper<number>(
    "booking/pending-received-quantity"
  );

  function getPendingReceivedQuantity() {
    if (response.data) {
      if (response.data > 99) return "99+";
      return response.data.toString();
    }
    return "-";
  }

  return (
    <div className="w-full h-20 bg-card sticky bottom-0 left-0 text-xs">
      <nav className="h-full container">
        <ul className="h-full flex items-center justify-center gap-10">
          <NavbarItem href="/vagas">
            <CarIcon />
            <span>Vagas</span>
          </NavbarItem>
          <NavbarItem href="/reservas">
            <BookUserIcon />
            <span>Reservas</span>
          </NavbarItem>
          <NavbarItem href="/garagem">
            <MapPinHouseIcon />
            <span>Garagem</span>
            <span className="absolute -top-2 -right-2 bg-primary text-white font-bold text-[8px] px-2 rounded-full">
              {getPendingReceivedQuantity()}
            </span>
          </NavbarItem>
          <NavbarItem href="/conta">
            <CircleUserIcon />
            <span>Conta</span>
          </NavbarItem>
        </ul>
      </nav>
    </div>
  );
}
