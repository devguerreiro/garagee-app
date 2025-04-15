import Link from "next/link";

import { HouseIcon, ParkingCircleIcon } from "lucide-react";

import { ParkingSpaceDTO } from "@/app/dtos";

import { getAbbreviationName, getShortName } from "@/utils";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  parkingSpace: ParkingSpaceDTO;
};

export default function FeedTabCard({ href, parkingSpace }: Readonly<Props>) {
  return (
    <Link
      href={href}
      className="block px-6 py-8 bg-card rounded-lg shadow space-y-4"
    >
      <div className="flex justify-between">
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
              <HouseIcon className="w-[1em] h-[1em] text-secondary" />
              <span>
                {parkingSpace.apartment.identifier} |{" "}
                {parkingSpace.apartment.tower.identifier}
              </span>
            </div>
          </div>
        </div>
        <div
          className={cn(
            "flex flex-col justify-center items-center gap-1 text-lg",
            parkingSpace.is_blocked ? "text-destructive" : "text-success"
          )}
        >
          <ParkingCircleIcon className="w-[1em] h-[1em]" />
          <div className="flex flex-col items-center">
            <span className="font-semibold">{parkingSpace.identifier}</span>
            <span className="text-xs">
              {parkingSpace.is_blocked ? "Fechada" : "Aberta"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
