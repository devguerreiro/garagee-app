import { ParkingSpaceDTO } from "@/app/dtos";

import Empty from "@/components/Empty";

import FeedTabCard from "./FeedTabCard";

type Props = {
  parkingSpaces: Array<ParkingSpaceDTO>;
};

export default function FeedTab({ parkingSpaces }: Readonly<Props>) {
  if (parkingSpaces.length === 0) {
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
    <FeedTabCard
      href={`/vagas/${parkingSpace.public_id}`}
      key={parkingSpace.public_id}
      parkingSpace={parkingSpace}
    />
  ));
}
