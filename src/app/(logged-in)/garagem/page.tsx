import Link from "next/link";

import { cn } from "@/lib/utils";
import fetchWrapper from "@/lib/fetch";

import { buttonVariants } from "@/components/ui/button";

import { MyParkingSpaceDTO } from "@/app/dtos";

import ParkingSpaceDetail from "./components/ParkingSpaceDetail";

export default async function Page() {
  const response = await fetchWrapper<MyParkingSpaceDTO>("parking-space/my");

  if (!response.data) return;

  const parkingSpace = response.data;

  return (
    <div className="container py-8 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold text-foreground">
          Gerencie sua garagem
        </h1>
      </div>
      <hr />
      <ParkingSpaceDetail parkingSpace={parkingSpace} />
      <Link
        href="/garagem/solicitacoes"
        className={cn(buttonVariants({ variant: "outline" }), "!mt-12 w-full")}
      >
        Visualizar solicitações
      </Link>
    </div>
  );
}
