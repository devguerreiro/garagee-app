import { getParkingSpaceDetail } from "@/app/actions";

import dayjs from "@/lib/dayjs";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import ParkingSpaceDetail from "@/components/ParkingSpaceDetail";

import BorrowDialog from "./components/BorrowDialog";

type Props = {
  params: Promise<{
    publicId: string;
  }>;
};

export default async function Page({ params }: Readonly<Props>) {
  const { publicId } = await params;

  const response = await getParkingSpaceDetail(publicId, dayjs().utcOffset());

  if (!response.data) return;

  const parkingSpace = response.data;

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
