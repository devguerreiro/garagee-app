"use client";

import { PropsWithChildren } from "react";

import { usePathname } from "next/navigation";
import Link, { LinkProps } from "next/link";

import { cn } from "@/lib/utils";

export default function NavbarItem({
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
