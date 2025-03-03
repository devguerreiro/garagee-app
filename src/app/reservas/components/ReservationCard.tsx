import Link from "next/link";

import { ReservationListDTO } from "@/app/dtos";

type Props = {
  reservation: ReservationListDTO;
};

export default function ReservationCard({ reservation }: Readonly<Props>) {
  return (
    <Link
      href={`/reservation/${reservation.publicId}`}
      className="block px-6 py-4 bg-card rounded-lg shadow space-y-4"
    ></Link>
  );
}
