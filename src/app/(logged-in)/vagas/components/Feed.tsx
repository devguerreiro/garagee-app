"use client";

import { useRouter } from "next/navigation";

import { ParkingSpaceDTO } from "@/app/dtos";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import FeedTab from "./FeedTab";

type Props = {
  isCovered: string | undefined;
  parkingSpaces: Array<ParkingSpaceDTO>;
};

export default function Feed({ isCovered, parkingSpaces }: Readonly<Props>) {
  const { replace } = useRouter();

  function getTabsDefaultValue() {
    if (isCovered === "true") return "covered";
    else if (isCovered === "false") return "uncovered";
    return "all";
  }

  function handleTabChange(value: string) {
    if (value === "covered") replace("/vagas?isCovered=true");
    else if (value === "uncovered") replace("/vagas?isCovered=false");
    else replace("/vagas");
  }

  return (
    <Tabs
      defaultValue={getTabsDefaultValue()}
      onValueChange={handleTabChange}
      className="space-y-8"
    >
      <TabsList>
        <TabsTrigger value="all">Todas</TabsTrigger>
        <TabsTrigger value="covered">Cobertas</TabsTrigger>
        <TabsTrigger value="uncovered">Descobertas</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="space-y-6">
        <FeedTab parkingSpaces={parkingSpaces} />
      </TabsContent>
      <TabsContent value="covered" className="space-y-6">
        <FeedTab parkingSpaces={parkingSpaces} />
      </TabsContent>
      <TabsContent value="uncovered" className="space-y-6">
        <FeedTab parkingSpaces={parkingSpaces} />
      </TabsContent>
    </Tabs>
  );
}
