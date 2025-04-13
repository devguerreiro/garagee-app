import { ParkingSpaceBookingsDTO } from "@/app/dtos";

import Empty from "@/components/Empty";

import FeedTabCard from "./FeedTabCard";

type Props = {
  bookings: Array<ParkingSpaceBookingsDTO>;
};

export default function FeedTab({ bookings }: Readonly<Props>) {
  if (bookings.length === 0) {
    return (
      <div className="text-center space-y-4">
        <div className="h-32 w-full">
          <Empty />
        </div>
        <p>Nenhuma reserva encontrada</p>
      </div>
    );
  }

  return bookings.map((booking) => (
    <FeedTabCard key={booking.public_id} booking={booking} />
  ));
}
