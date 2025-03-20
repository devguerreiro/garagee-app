import Link from "next/link";

import { BuildingIcon, HouseIcon, ParkingCircleIcon } from "lucide-react";

import { ParkingSpacesListDTO } from "@/app/dtos";

import { getAbbreviationName } from "@/utils";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Props = {
  href: string;
  parkingSpace: ParkingSpacesListDTO;
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
            {parkingSpace.owner.building.name}
          </span>
        </div>
      </div>
    </Link>
  );
}
