import Link from "next/link";

import { BuildingIcon, HouseIcon, ParkingCircleIcon } from "lucide-react";

import { ParkingSpaceListDTO } from "@/dtos";

import { getAbbreviationName } from "@/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type Props = {
  parkingSpace: ParkingSpaceListDTO;
};

export default function ParkingSpaceCard({ parkingSpace }: Readonly<Props>) {
  return (
    <Link
      href="/vagas/11ef06e4-11d7-40a2-8ac6-0281ad7cf3db"
      className="block px-6 py-4 bg-card rounded-lg shadow space-y-4"
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>
              {getAbbreviationName(parkingSpace.owner.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5 text-xs">
            <strong className="max-w-40 overflow-hidden text-ellipsis text-nowrap">
              {parkingSpace.owner.name}
            </strong>
            <div className="flex items-center gap-1">
              <HouseIcon className="text-primary w-[1em] h-[1em]" />
              <span>{parkingSpace.owner.apartment}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <ParkingCircleIcon className="w-[1em] h-[1em]" />
          <span className="font-medium">{parkingSpace.identifier}</span>
        </div>
      </div>
      <hr />
      <div className="text-sm flex justify-between items-center">
        <div className="flex items-center gap-1.5 max-w-56">
          <BuildingIcon className="text-primary w-[1em] h-[1em]" />
          <span className="overflow-hidden text-ellipsis text-nowrap">
            {parkingSpace.building.name}
          </span>
        </div>
        <Badge>{parkingSpace.available ? "Disponível" : "Indisponível"}</Badge>
      </div>
    </Link>
  );
}
