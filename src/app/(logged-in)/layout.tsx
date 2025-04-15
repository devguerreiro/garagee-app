import { PropsWithChildren } from "react";

import Navbar from "@/components/Navbar";

export default function LoggedInLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <div className="flex flex-col xl:flex-col-reverse">
      <div className="min-h-screen xl:min-h-fit">{children}</div>
      <Navbar />
    </div>
  );
}
