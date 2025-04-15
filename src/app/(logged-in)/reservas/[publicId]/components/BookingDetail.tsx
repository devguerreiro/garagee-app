import {
  CalendarClockIcon,
  HouseIcon,
  ParkingCircleIcon,
  RadarIcon,
  UmbrellaIcon,
} from "lucide-react";

import { BookingDetailDTO, BookingStatusDTO } from "@/app/dtos";

import {
  brazilianDateTime,
  getAbbreviationName,
  getBookingStatusBadgeVariant,
  getShortName,
} from "@/utils";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import BookingDetailActions from "./BookingDetailActions";

type Props = {
  booking: BookingDetailDTO;
};

export default function BookingDetail({ booking }: Readonly<Props>) {
  const { parking_space } = booking;

  return (
    <div className="p-8 mb-32 bg-card shadow rounded-lg text-sm space-y-6">
      <div className="flex justify-between items-center text-xl">
        <div className="flex items-center gap-2 text-foreground">
          <ParkingCircleIcon className="w-[1em] h-[1em]" />
          <h2 className="font-semibold">{parking_space.identifier}</h2>
        </div>
        <Badge variant={getBookingStatusBadgeVariant(booking.status)}>
          {BookingStatusDTO[booking.status]}
        </Badge>
      </div>
      <hr />
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-foreground">
          Sobre a reserva
        </h3>
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
      <hr />
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-foreground">
          Sobre a vaga
        </h3>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <RadarIcon className="w-[1em] h-[1em] text-secondary" />
            <span className="block">Orientação</span>
          </div>
          <div>
            <strong>{parking_space.guidance}</strong>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <UmbrellaIcon className="w-[1em] h-[1em] text-secondary" />
            <span className="block">Coberta?</span>
          </div>
          <div>
            <strong>{parking_space.is_covered ? "Sim" : "Não"}</strong>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex items-center gap-3">
        <Avatar>
          {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
          <AvatarFallback className="bg-slate-600 text-white">
            {getAbbreviationName(parking_space.apartment.occupant.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1 text-sm">
          <strong>{getShortName(parking_space.apartment.occupant.name)}</strong>
          <div className="flex items-center gap-1">
            <HouseIcon className="text-secondary w-[1em] h-[1em]" />
            <span>
              {parking_space.apartment.identifier} |{" "}
              {parking_space.apartment.tower.identifier}
            </span>
          </div>
        </div>
      </div>
      <BookingDetailActions booking={booking} />
    </div>
  );
}
