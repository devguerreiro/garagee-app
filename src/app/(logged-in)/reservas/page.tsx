import { getMyBookings } from "@/app/actions";

import Feed from "./components/Feed";

type Props = {
  searchParams: Promise<{ status: string | undefined }>;
};

export default async function Page(props: Readonly<Props>) {
  const searchParams = await props.searchParams;

  const status = searchParams.status;

  const response = await getMyBookings(status ? { status } : {});

  if (!response.data) return response.data;

  return (
    <div className="px-4 py-8 space-y-4">
      <h1 className="text-lg font-semibold">Reservas feitas por você</h1>
      <hr />
      <Feed status={status} bookings={response.data} />
    </div>
  );
}
