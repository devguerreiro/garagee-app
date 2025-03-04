import Link from "next/link";

import { BuildingIcon, HouseIcon, ParkingCircleIcon } from "lucide-react";

import { BookingListDTO } from "@/app/dtos";

import { getAbbreviationName } from "@/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type Props = {
  booking: BookingListDTO;
};

export default function BookingCard({ booking }: Readonly<Props>) {
  const { parkingSpace } = booking;

  return (
    <Link
      href={`/reservas/${booking.publicId}`}
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
        <div className="flex items-center gap-1.5 max-w-48">
          <BuildingIcon className="text-primary w-[1em] h-[1em]" />
          <span className="overflow-hidden text-ellipsis text-nowrap">
            {parkingSpace.building.name}
          </span>
        </div>
        <Badge>{booking.status}</Badge>
      </div>
    </Link>
  );
}
