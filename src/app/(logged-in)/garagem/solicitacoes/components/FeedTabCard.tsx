import { CalendarClockIcon, HouseIcon, UserIcon } from "lucide-react";

import { BookingStatusDTO, ParkingSpaceBookingsDTO } from "@/app/dtos";

import { brazilianDateTime, getBookingStatusBadgeVariant } from "@/utils";

import { Badge } from "@/components/ui/badge";

type Props = {
  booking: ParkingSpaceBookingsDTO;
};

export default function FeedTabCard({ booking }: Readonly<Props>) {
  return (
    <div className="px-6 py-8 bg-card rounded-lg shadow flex gap-2 relative">
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
          <UserIcon className="w-[1em] h-[1em]" />
          <span className="text-center font-medium">
            {booking.claimant.name}
          </span>
          <div className="flex items-center gap-1 text-sm">
            <HouseIcon className="w-[1em] h-[1em] text-secondary" />
            <span>
              {booking.claimant.apartment.identifier} |{" "}
              {booking.claimant.apartment.tower.identifier}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
