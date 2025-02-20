import { BuildingIcon, HouseIcon, ParkingCircleIcon } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{
    building: string;
    parkingSpace: string;
  }>;
};

export default async function Page({ params }: Readonly<Props>) {
  const { building, parkingSpace } = await params;

  console.log({ building, parkingSpace });

  const getParkingSpace = () => {
    return {
      identifier: "Vaga 13A",
      available: true,
      building: {
        name: "Condomínio Lago da Constança",
      },
      owner: {
        name: "Luis Guerreiro",
        apartment: "501",
      },
    };
  };

  const _parkingSpace = getParkingSpace();

  return (
    <div className="container py-8 space-y-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/garagens">Garagens</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{_parkingSpace.building.name}</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{_parkingSpace.identifier}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="p-6 bg-card shadow rounded text-sm space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-lg">
            <ParkingCircleIcon className="w-[1em] h-[1em]" />
            <h2 className="font-medium">{_parkingSpace.identifier}</h2>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <BuildingIcon className="w-[1em] h-[1em]" />
            <span className="block">{_parkingSpace.building.name}</span>
          </div>
        </div>
        <Badge>{_parkingSpace.available ? "Disponível" : "Indisponível"}</Badge>
        <hr />
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5 text-xs">
            <span>{_parkingSpace.owner.name}</span>
            <div className="flex items-center gap-1">
              <HouseIcon className="text-primary w-[1em] h-[1em]" />
              <span>{_parkingSpace.owner.apartment}</span>
            </div>
          </div>
        </div>
        <Button className="w-full !mt-10">Pedir emprestado</Button>
      </div>
    </div>
  );
}
