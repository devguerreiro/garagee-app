import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Garage from "./components/Garage";

export default function Page() {
  return (
    <div className="px-4 py-8 space-y-4">
      <h1 className="text-lg font-semibold">Garagens</h1>
      <Tabs defaultValue="covered" className="space-y-8">
        <TabsList>
          <TabsTrigger value="covered">Cobertas</TabsTrigger>
          <TabsTrigger value="uncovered">Descobertas</TabsTrigger>
        </TabsList>
        <TabsContent value="covered" className="space-y-6">
          <Garage />
          <Garage />
          <Garage />
        </TabsContent>
        <TabsContent value="uncovered">
          <Garage />
        </TabsContent>
      </Tabs>
    </div>
  );
}
