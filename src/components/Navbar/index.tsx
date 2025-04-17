import { BookUserIcon, CarIcon, CircleUserIcon } from "lucide-react";

import NavbarItem from "./NavbarItem";
import NavbarItemGarage from "./NavbarItemGarage";

export default async function Navbar() {
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
          <NavbarItemGarage />
          <NavbarItem href="/conta">
            <CircleUserIcon />
            <span>Conta</span>
          </NavbarItem>
        </ul>
      </nav>
    </div>
  );
}
