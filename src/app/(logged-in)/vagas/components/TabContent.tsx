import { LoaderCircle } from "lucide-react";

import { ParkingSpaceDTO } from "@/app/dtos";

import ParkingSpaceCard from "@/components/ParkingSpaceCard";
import Empty from "@/components/Empty";

type Props = {
  isPending: boolean;
  parkingSpaces: Array<ParkingSpaceDTO>;
};

export default function TabContent({
  isPending,
  parkingSpaces,
}: Readonly<Props>) {
  if (isPending) {
    return <LoaderCircle className="mx-auto animate-spin" />;
  } else if (parkingSpaces.length === 0) {
    return (
      <div className="text-center space-y-4">
        <div className="h-32 w-full">
          <Empty />
        </div>
        <p>Nenhuma vaga encontrada</p>
      </div>
    );
  }
  return parkingSpaces.map((parkingSpace) => (
    <ParkingSpaceCard
      href={`/vagas/${parkingSpace.public_id}`}
      key={parkingSpace.public_id}
      parkingSpace={parkingSpace}
    />
  ));
}
