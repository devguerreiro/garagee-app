import { ParkingSpaceDTO } from "@/app/dtos";

import ParkingSpaceCard from "@/components/ParkingSpaceCard";
import Empty from "@/components/Empty";
import AppLoading from "@/components/Loading";

type Props = {
  isPending: boolean;
  parkingSpaces: Array<ParkingSpaceDTO> | null;
};

export default function TabContent({
  isPending,
  parkingSpaces,
}: Readonly<Props>) {
  if (isPending || parkingSpaces === null) {
    return <AppLoading />;
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
