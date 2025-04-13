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

function FooterItem({
  children,
  ...props
}: Readonly<PropsWithChildren & LinkProps>) {
  const pathname = usePathname();

  return (
    <li
      className={cn(
        "flex-1",
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

export default function Footer() {
  return (
    <footer className="w-full h-16 bg-card text-muted-foreground sticky bottom-0 left-0 text-xs">
      <nav className="h-full">
        <ul className="h-full flex items-center">
          <FooterItem href="/vagas">
            <CarIcon />
            <span>Vagas</span>
          </FooterItem>
          <FooterItem href="/reservas">
            <BookUserIcon />
            <span>Reservas</span>
          </FooterItem>
          <FooterItem href="/garagem">
            <MapPinHouseIcon />
            <span>Garagem</span>
          </FooterItem>
          <FooterItem href="/conta">
            <CircleUserIcon />
            <span>Conta</span>
          </FooterItem>
        </ul>
      </nav>
    </footer>
  );
}
