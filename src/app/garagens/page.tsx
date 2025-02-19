import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Garage from "./Garage";

export default function Page() {
  return (
    <div className="px-4 py-8 space-y-4">
      <h1 className="text-lg font-semibold">Garagens</h1>
      <Tabs defaultValue="covered" className="space-y-4">
        <TabsList>
          <TabsTrigger value="covered">Cobertas</TabsTrigger>
          <TabsTrigger value="uncovered">Descobertas</TabsTrigger>
        </TabsList>
        <TabsContent value="covered">
          <Garage />
        </TabsContent>
        <TabsContent value="uncovered">
          <Garage />
        </TabsContent>
      </Tabs>
    </div>
  );
}
