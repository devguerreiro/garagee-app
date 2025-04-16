import dayjs from "@/lib/dayjs";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import fetchWrapper from "@/lib/fetch";

import { ParkingSpaceDetailDTO } from "@/app/dtos";

import ParkingSpaceDetail from "./components/ParkingSpaceDetail";
import BorrowDialog from "./components/BorrowDialog";

type Props = {
  params: Promise<{
    publicId: string;
  }>;
};

export default async function Page({ params }: Readonly<Props>) {
  const { publicId } = await params;

  const timezoneOffset = dayjs().utcOffset();

  const url = `parking-space/${publicId}?timezoneOffset=${timezoneOffset}`;

  const parkingSpace = await fetchWrapper<ParkingSpaceDetailDTO>(url);

  if (!parkingSpace) return;

  return (
    <div className="container py-8 space-y-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/vagas">Vagas</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{parkingSpace.identifier}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ParkingSpaceDetail parkingSpace={parkingSpace} />
      <BorrowDialog parkingSpace={parkingSpace} />
    </div>
  );
}
