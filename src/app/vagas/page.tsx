import { getParkingSpaceList } from "@/app/actions";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ParkingSpaceCard from "./components/ParkingSpaceCard";

export default async function Page() {
  const parkingSpaces = await getParkingSpaceList();

  return (
    <div className="px-4 py-8 space-y-4">
      <h1 className="text-lg font-semibold">Vagas</h1>
      <Tabs defaultValue="covered" className="space-y-8">
        <TabsList>
          <TabsTrigger value="covered">Cobertas</TabsTrigger>
          <TabsTrigger value="uncovered">Descobertas</TabsTrigger>
        </TabsList>
        <TabsContent value="covered" className="space-y-6">
          {parkingSpaces.map((parkingSpace) => (
            <ParkingSpaceCard
              key={parkingSpace.publicId}
              parkingSpace={parkingSpace}
            />
          ))}
        </TabsContent>
        <TabsContent value="uncovered">
          {parkingSpaces.map((parkingSpace) => (
            <ParkingSpaceCard
              key={parkingSpace.publicId}
              parkingSpace={parkingSpace}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
