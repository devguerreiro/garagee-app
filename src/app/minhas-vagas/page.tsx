import { getParkingSpaceList } from "@/app/actions";

import { Button } from "@/components/ui/button";

import ParkingSpaceCard from "@/components/ParkingSpaceCard";

export default async function Page() {
  const parkingSpaces = await getParkingSpaceList();

  return (
    <div className="px-4 py-8 space-y-4 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Minhas vagas</h1>
        <Button>Adicionar vaga</Button>
      </div>
      <hr />
      <div className="space-y-6">
        {parkingSpaces.map((parkingSpace) => (
          <ParkingSpaceCard
            href={`/minhas-vagas/${parkingSpace.publicId}`}
            key={parkingSpace.publicId}
            parkingSpace={parkingSpace}
          />
        ))}
      </div>
    </div>
  );
}
