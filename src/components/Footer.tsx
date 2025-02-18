import { PropsWithChildren } from "react";
import { BookUserIcon, CarIcon, SquareParkingIcon } from "lucide-react";
import Link, { LinkProps } from "next/link";

function FooterItem({
  children,
  ...props
}: Readonly<PropsWithChildren & LinkProps>) {
  return (
    <li className="flex-1">
      <Link
        {...props}
        className="flex flex-col justify-center items-center gap-0.5"
      >
        {children}
      </Link>
    </li>
  );
}

export default function Footer() {
  return (
    <footer className="w-full h-14 bg-primary text-white absolute bottom-0 left-0 text-xs">
      <nav className="h-full">
        <ul className="h-full flex items-center">
          <FooterItem href="/garagens">
            <CarIcon />
            <span>Garagens</span>
          </FooterItem>
          <FooterItem href="/reservas">
            <BookUserIcon />
            <span>Reservas</span>
          </FooterItem>
          <FooterItem href="/minhas-garagens">
            <SquareParkingIcon />
            <span>Minhas Garagens</span>
          </FooterItem>
        </ul>
      </nav>
    </footer>
  );
}
