import { PropsWithChildren } from "react";
import { BookUserIcon, CarIcon, MapPinHouseIcon } from "lucide-react";
import Link, { LinkProps } from "next/link";

function FooterItem({
  children,
  ...props
}: Readonly<PropsWithChildren & LinkProps>) {
  return (
    <li className="flex-1">
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
    <footer className="w-full h-16 bg-primary text-white sticky bottom-0 left-0 text-xs">
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
          <FooterItem href="/minhas-vagas">
            <MapPinHouseIcon />
            <span>Minhas Vagas</span>
          </FooterItem>
        </ul>
      </nav>
    </footer>
  );
}
