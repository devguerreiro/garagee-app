import {
  BuildingIcon,
  HouseIcon,
  ParkingCircleIcon,
  RadarIcon,
  UmbrellaIcon,
} from "lucide-react";

import { ParkingSpaceDetailDTO } from "@/dtos";

import { getAbbreviationName } from "@/utils";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import BorrowDialog from "./BorrowDialog";

type Props = {
  parkingSpace: ParkingSpaceDetailDTO;
};

export default function ParkingSpaceDetail({ parkingSpace }: Readonly<Props>) {
  return (
    <div className="p-6 bg-card shadow rounded text-sm space-y-6">
      <div className="flex justify-between items-center text-xl">
        <div className="flex items-center gap-2">
          <ParkingCircleIcon className="w-[1em] h-[1em]" />
          <h2 className="font-medium">{parkingSpace.identifier}</h2>
        </div>
        <Badge>{parkingSpace.available ? "Disponível" : "Indisponível"}</Badge>
      </div>
      <hr />
      <div className="text-muted-foreground space-y-4">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <BuildingIcon className="w-[1em] h-[1em]" />
            <span className="block">Local</span>
          </div>
          <div>
            <strong>{parkingSpace.building.name}</strong>
          </div>
        </div>
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <RadarIcon className="w-[1em] h-[1em]" />
            <span className="block">Orientação</span>
          </div>
          <div>
            <strong>{parkingSpace.guidance}</strong>
          </div>
        </div>
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <UmbrellaIcon className="w-[1em] h-[1em]" />
            <span className="block">Coberta?</span>
          </div>
          <div>
            <strong>{parkingSpace.isCovered ? "Sim" : "Não"}</strong>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>
            {getAbbreviationName(parkingSpace.owner.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0.5 text-xs">
          <strong>{parkingSpace.owner.name}</strong>
          <div className="flex items-center gap-1">
            <HouseIcon className="text-primary w-[1em] h-[1em]" />
            <span>{parkingSpace.owner.apartment}</span>
          </div>
        </div>
      </div>
      <BorrowDialog />
    </div>
  );
}
