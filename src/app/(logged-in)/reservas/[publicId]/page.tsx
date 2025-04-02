import { getBookingDetail } from "@/app/actions";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import BookingDetail from "./components/BookingDetail";

type Props = {
  params: Promise<{
    publicId: string;
  }>;
};

export default async function Page({ params }: Readonly<Props>) {
  const { publicId } = await params;

  const response = await getBookingDetail(publicId);

  if (!response.data) return;

  const booking = response.data;

  return (
    <div className="container py-8 space-y-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/reservas">Reservas</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{booking.parking_space.identifier}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <BookingDetail booking={booking} />
    </div>
  );
}
