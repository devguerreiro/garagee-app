"use client";

import { PropsWithChildren } from "react";

import { usePathname } from "next/navigation";
import Link, { LinkProps } from "next/link";

import {
  BookUserIcon,
  CarIcon,
  CircleUserIcon,
  MapPinHouseIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

function NavbarItem({
  children,
  ...props
}: Readonly<PropsWithChildren & LinkProps>) {
  const pathname = usePathname();

  return (
    <li
      className={cn(
        "flex-1 xl:flex-initial xl:w-16",
        pathname.includes(props.href.toString()) && "text-primary font-bold"
      )}
    >
      <Link
        {...props}
        className="flex flex-col justify-center items-center gap-1"
      >
        {children}
      </Link>
    </li>
  );
}

export default function Navbar() {
  return (
    <div className="w-full h-16 bg-card sticky bottom-0 left-0 text-xs xl:h-20">
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
          <NavbarItem href="/garagem">
            <MapPinHouseIcon />
            <span>Garagem</span>
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
