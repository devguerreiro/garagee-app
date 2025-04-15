import { getParkingSpaceBookings } from "@/app/actions";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import Feed from "./components/Feed";

type Props = {
  searchParams: Promise<{ status: string | undefined }>;
};

export default async function Page(props: Readonly<Props>) {
  const searchParams = await props.searchParams;

  const status = searchParams.status;

  const response = await getParkingSpaceBookings(status ? { status } : {});

  if (!response.data) return response.data;

  const bookings = response.data;

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
