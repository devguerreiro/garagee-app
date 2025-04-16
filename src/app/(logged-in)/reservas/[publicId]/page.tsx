import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import fetchWrapper from "@/lib/fetch";

import { BookingDetailDTO } from "@/app/dtos";

import BookingDetail from "./components/BookingDetail";

type Props = {
  params: Promise<{
    publicId: string;
  }>;
};

export default async function Page({ params }: Readonly<Props>) {
  const { publicId } = await params;

  const booking = await fetchWrapper<BookingDetailDTO>(`booking/${publicId}`);

  if (!booking) return;

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
