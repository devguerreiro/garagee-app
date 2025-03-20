import { getParkingSpaces } from "@/app/actions";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ParkingSpaceCard from "@/components/ParkingSpaceCard";

export default async function Page() {
  const response = await getParkingSpaces();

  if (!response.data) return;

  const parkingSpaces = response.data;

  return (
    <div className="px-4 py-8 space-y-4">
      <h1 className="text-lg font-semibold">Vagas</h1>
      <hr />
      <Tabs defaultValue="covered" className="space-y-8">
        <TabsList>
          <TabsTrigger value="covered">Cobertas</TabsTrigger>
          <TabsTrigger value="uncovered">Descobertas</TabsTrigger>
        </TabsList>
        <TabsContent value="covered" className="space-y-6">
          {parkingSpaces.map((parkingSpace) => (
            <ParkingSpaceCard
              href={`/vagas/${parkingSpace.public_id}`}
              key={parkingSpace.public_id}
              parkingSpace={parkingSpace}
            />
          ))}
        </TabsContent>
        <TabsContent value="uncovered" className="space-y-6">
          {parkingSpaces.map((parkingSpace) => (
            <ParkingSpaceCard
              href={`/vagas/${parkingSpace.public_id}`}
              key={parkingSpace.public_id}
              parkingSpace={parkingSpace}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
