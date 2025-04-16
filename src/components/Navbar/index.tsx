import {
  BookUserIcon,
  CarIcon,
  CircleUserIcon,
  MapPinHouseIcon,
} from "lucide-react";

import NavbarItem from "./NavbarItem";
import fetchWrapper from "@/lib/fetch";

export default async function Navbar() {
  const response = await fetchWrapper<number>(
    "booking/pending-received-quantity"
  );

  function getPendingReceivedQuantity() {
    if (response.data) {
      if (response.data > 99) return "99+";
      return response.data;
    }
    return "-";
  }

  return (
    <div className="w-full h-20 bg-card sticky bottom-0 left-0 text-xs">
      <nav className="h-full container">
        <ul className="h-full flex items-center xl:justify-center xl:gap-10">
          <NavbarItem href="/vagas">
            <CarIcon />
            <span>Vagas</span>
          </NavbarItem>
          <NavbarItem href="/reservas">
            <BookUserIcon />
            <span>Reservas</span>
          </NavbarItem>
          <div className="relative">
            <NavbarItem href="/garagem">
              <MapPinHouseIcon />
              <span>Garagem</span>
            </NavbarItem>
            <span className="absolute -top-2 -right-2 bg-primary text-white font-bold text-[8px] px-2 rounded-full">
              {getPendingReceivedQuantity()}
            </span>
          </div>
          <NavbarItem href="/conta">
            <CircleUserIcon />
            <span>Conta</span>
          </NavbarItem>
        </ul>
      </nav>
    </div>
  );
}
