import { getMyParkingSpace } from "@/app/actions";

import ParkingSpaceCard from "@/components/ParkingSpaceCard";

export default async function Page() {
  const response = await getMyParkingSpace();

  if (!response.data) return;

  const parkingSpace = response.data;

  return (
    <div className="px-4 py-8 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Minha vaga</h1>
      </div>
      <hr />
      <div className="space-y-6">
        <ParkingSpaceCard
          href={`/minha-vaga/${parkingSpace.public_id}`}
          key={parkingSpace.public_id}
          parkingSpace={parkingSpace}
        />
      </div>
    </div>
  );
}
