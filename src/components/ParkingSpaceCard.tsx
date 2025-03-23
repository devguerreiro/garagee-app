import Link from "next/link";

import { BuildingIcon, HouseIcon, ParkingCircleIcon } from "lucide-react";

import { ParkingSpaceDTO } from "@/app/dtos";

import { getAbbreviationName, getShortName } from "@/utils";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Props = {
  href: string;
  parkingSpace: ParkingSpaceDTO;
};

export default function ParkingSpaceCard({
  href,
  parkingSpace,
}: Readonly<Props>) {
  return (
    <Link
      href={href}
      className="block px-6 py-4 bg-card rounded-lg shadow space-y-4"
    >
      <div className="flex justify-between">
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
        <div className="flex flex-col justify-center items-center">
          <ParkingCircleIcon className="w-[1em] h-[1em]" />
          <span className="font-medium">{parkingSpace.identifier}</span>
        </div>
      </div>
      <hr />
      <div className="text-sm flex justify-between items-center">
        <div className="w-full flex items-center gap-1.5">
          <BuildingIcon className="text-primary w-[1em] h-[1em]" />
          <span className="overflow-hidden text-ellipsis text-nowrap">
            {parkingSpace.apartment.tower.building.name}
          </span>
        </div>
      </div>
    </Link>
  );
}
