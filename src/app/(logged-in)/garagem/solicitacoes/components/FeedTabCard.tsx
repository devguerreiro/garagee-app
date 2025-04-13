import { ParkingSpaceBookingsDTO } from "@/app/dtos";

type Props = {
  booking: ParkingSpaceBookingsDTO;
};

export default function FeedTabCard({ booking }: Readonly<Props>) {
  console.log(booking);

  return <div></div>;
}
