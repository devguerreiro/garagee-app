import Link from "next/link";

import { CalendarClockIcon, ParkingCircleIcon } from "lucide-react";

import { BookingDTO, BookingStatusDTO } from "@/app/dtos";

import { brazilianDateTime, getBookingStatusBadgeVariant } from "@/utils";

import { Badge } from "@/components/ui/badge";

type Props = {
  booking: BookingDTO;
};

export default function FeedTabCard({ booking }: Readonly<Props>) {
  const { parking_space } = booking;

  return (
    <Link
      href={`/reservas/${booking.public_id}`}
      className="px-6 py-8 bg-card rounded-lg shadow flex gap-2 relative"
    >
      <Badge
        className="absolute -top-2 -right-2"
        variant={getBookingStatusBadgeVariant(booking.status)}
      >
        {BookingStatusDTO[booking.status]}
      </Badge>
      <div className="w-full flex text-sm">
        <div className="flex-1 flex flex-col gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CalendarClockIcon className="w-[1em] h-[1em] text-secondary" />
              <span className="block">Início</span>
            </div>
            <div>
              <strong>{brazilianDateTime(booking.booked_from)}</strong>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CalendarClockIcon className="w-[1em] h-[1em] text-secondary" />
              <span className="block">Fim</span>
            </div>
            <div>
              <strong>{brazilianDateTime(booking.booked_to)}</strong>
            </div>
          </div>
        </div>
        <hr className="h-full border-0 border-l border-border border-dashed" />
        <div className="flex-1 flex flex-col justify-center items-center gap-1 text-lg">
          <ParkingCircleIcon className="w-[1em] h-[1em]" />
          <span className="text-center font-semibold">
            {parking_space.identifier}
          </span>
        </div>
      </div>
    </Link>
  );
}
