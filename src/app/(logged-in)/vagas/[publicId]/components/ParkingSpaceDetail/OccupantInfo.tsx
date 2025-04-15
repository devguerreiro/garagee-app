"use client";

import { HouseIcon } from "lucide-react";

import { getAbbreviationName, getShortName } from "@/utils";

import { ParkingSpaceDetailDTO } from "@/app/dtos";

import { useCurrentUser } from "@/hooks/use-current-user";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Props = {
  parkingSpace: ParkingSpaceDetailDTO;
};

export default function OccupantInfo({ parkingSpace }: Readonly<Props>) {
  const parkingSpaceOwner = parkingSpace.apartment.occupant.public_id;

  const { isCurrentUser: isParkingSpaceOwner } =
    useCurrentUser(parkingSpaceOwner);

  return (
    isParkingSpaceOwner !== null &&
    !isParkingSpaceOwner && (
      <div className="flex items-center gap-3">
        <Avatar>
          {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
          <AvatarFallback className="bg-slate-600 text-white">
            {getAbbreviationName(parkingSpace.apartment.occupant.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1 text-sm">
          <span className="max-w-40 overflow-hidden text-ellipsis text-nowrap font-semibold">
            {getShortName(parkingSpace.apartment.occupant.name)}
          </span>
          <div className="flex items-center gap-1">
            <HouseIcon className="text-secondary w-[1em] h-[1em]" />
            <span>
              {parkingSpace.apartment.identifier} |{" "}
              {parkingSpace.apartment.tower.identifier}
            </span>
          </div>
        </div>
      </div>
    )
  );
}
