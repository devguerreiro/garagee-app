import {
  BuildingIcon,
  HouseIcon,
  ParkingCircleIcon,
  RadarIcon,
  UmbrellaIcon,
} from "lucide-react";

import { ParkingSpaceDetailDTO } from "@/app/dtos";

import { getAbbreviationName, getShortName } from "@/utils";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import ParkingSpaceDetailOptions from "./ParkingSpaceDetailOptions";

type Props = {
  parkingSpace: ParkingSpaceDetailDTO;
};

export default function ParkingSpaceDetail({ parkingSpace }: Readonly<Props>) {
  return (
    <div className="p-6 bg-card shadow rounded text-sm space-y-6">
      <div className="text-xl flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ParkingCircleIcon className="w-[1em] h-[1em]" />
          <h2 className="font-medium">{parkingSpace.identifier}</h2>
        </div>
        <ParkingSpaceDetailOptions parkingSpace={parkingSpace} />
      </div>
      <hr />
      <div className="text-muted-foreground space-y-4">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <BuildingIcon className="w-[1em] h-[1em]" />
            <span className="block">Local</span>
          </div>
          <div>
            <strong>{parkingSpace.apartment.tower.building.name}</strong>
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
            <strong>{parkingSpace.is_covered ? "Sim" : "Não"}</strong>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex items-center gap-2">
        <Avatar>
          {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
          <AvatarFallback className="bg-secondary text-white">
            {getAbbreviationName(parkingSpace.apartment.occupant.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0.5 text-xs">
          <span className="max-w-40 overflow-hidden text-ellipsis text-nowrap font-semibold">
            {getShortName(parkingSpace.apartment.occupant.name)}
          </span>
          <div className="flex items-center gap-1">
            <HouseIcon className="text-primary w-[1em] h-[1em]" />
            <span>{parkingSpace.apartment.identifier}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
