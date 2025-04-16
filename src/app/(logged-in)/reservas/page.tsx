import fetchWrapper from "@/lib/fetch";

import { BookingDTO } from "@/app/dtos";

import Feed from "./components/Feed";

type Props = {
  searchParams: Promise<{ status: string | undefined }>;
};

export default async function Page(props: Readonly<Props>) {
  const searchParams = await props.searchParams;

  const status = searchParams.status;

  const bookings = await fetchWrapper<Array<BookingDTO>>(
    status ? `booking/my?status=${status}` : "booking/my"
  );

  if (!bookings) return;

  return (
    <div className="container py-8 space-y-4">
      <h1 className="text-lg font-semibold text-foreground">
        Reservas feitas por você
      </h1>
      <hr />
      <Feed status={status} bookings={bookings} />
    </div>
  );
}
