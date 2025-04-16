import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import fetchWrapper from "@/lib/fetch";

import { ParkingSpaceBookingsDTO } from "@/app/dtos";

import Feed from "./components/Feed";

type Props = {
  searchParams: Promise<{ status: string | undefined }>;
};

export default async function Page(props: Readonly<Props>) {
  const searchParams = await props.searchParams;

  const status = searchParams.status;

  const bookings = await fetchWrapper<Array<ParkingSpaceBookingsDTO>>(
    status
      ? `parking-space/bookings/my?status=${status}`
      : "parking-space/bookings/my"
  );

  if (!bookings) return;

  return (
    <div className="container py-8 space-y-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/garagem">Garagem</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Solicitações</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="space-y-4">
        <h1 className="text-lg font-semibold text-foreground">
          Solicitações de reservas recebidas
        </h1>
        <hr />
        <Feed status={status} bookings={bookings} />
      </div>
    </div>
  );
}
