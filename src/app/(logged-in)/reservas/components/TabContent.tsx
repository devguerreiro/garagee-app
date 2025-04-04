import { BookingDTO } from "@/app/dtos";

import Empty from "@/components/Empty";
import AppLoading from "@/components/Loading";

import BookingCard from "./BookingCard";

type Props = {
  isPending: boolean;
  bookings: Array<BookingDTO> | null;
};

export default function TabContent({ isPending, bookings }: Readonly<Props>) {
  if (isPending || bookings === null) {
    return <AppLoading />;
  } else if (bookings.length === 0) {
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
    <BookingCard key={booking.public_id} booking={booking} />
  ));
}
