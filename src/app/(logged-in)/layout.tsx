import { PropsWithChildren } from "react";

import Footer from "@/components/Footer";

export default function LoggedInLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <>
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
}
