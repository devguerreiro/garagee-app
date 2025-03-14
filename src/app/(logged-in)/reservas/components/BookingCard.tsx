import Link from "next/link";

import {
  BuildingIcon,
  CalendarClockIcon,
  ParkingCircleIcon,
} from "lucide-react";

import { BookingListDTO } from "@/app/dtos";

import { createBookingDateTime, getBookingStatusBadgeVariant } from "@/utils";

import { Badge } from "@/components/ui/badge";

type Props = {
  booking: BookingListDTO;
};

export default function BookingCard({ booking }: Readonly<Props>) {
  const { parkingSpace } = booking;

  return (
    <Link
      href={`/reservas/${booking.publicId}`}
      className="px-6 py-4 bg-card rounded-lg shadow flex gap-2 relative"
    >
      <Badge
        className="p-2 absolute -top-2 -right-2"
        variant={getBookingStatusBadgeVariant(booking.status)}
      >
        {booking.status}
      </Badge>
      <div className="flex gap-4 text-xs text-muted-foreground">
        <div className="space-y-4">
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
              <CalendarClockIcon className="w-[1em] h-[1em]" />
              <span className="block">Início</span>
            </div>
            <div>
              <strong>
                {createBookingDateTime(booking.from_date, booking.from_hour)}
              </strong>
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <CalendarClockIcon className="w-[1em] h-[1em]" />
              <span className="block">Fim</span>
            </div>
            <div>
              <strong>
                {createBookingDateTime(booking.to_date, booking.to_hour)}
              </strong>
            </div>
          </div>
        </div>
        <hr className="h-full border-0 border-l border-border border-dashed" />
        <div className="flex flex-col justify-center items-center text-xl text-primary">
          <ParkingCircleIcon className="w-[1em] h-[1em]" />
          <h2 className="text-center font-medium">{parkingSpace.identifier}</h2>
        </div>
      </div>
    </Link>
  );
}
