"use client";

import { startTransition, useActionState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { getParkingSpaces } from "@/app/actions";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import TabContent from "./TabContent";

export default function Page() {
  const { replace } = useRouter();

  const searchParams = useSearchParams();

  const [parkingSpaces, dispatch, isPending] = useActionState(async () => {
    const isCovered = searchParams.get("isCovered");
    const params = new URLSearchParams();
    if (isCovered !== null && ["true", "false"].includes(isCovered)) {
      params.set("isCovered", isCovered);
    }
    const response = await getParkingSpaces(
      Object.fromEntries(params.entries())
    );
    if (response.data) return response.data;
    return [];
  }, []);

  function getTabsDefaultValue() {
    const isCovered = searchParams.get("isCovered");
    if (isCovered === null) return "all";
    else if (isCovered === "true") return "covered";
    return "uncovered";
  }

  useEffect(() => {
    startTransition(dispatch);
  }, [searchParams]);

  return (
    <div className="px-4 py-8 space-y-4">
      <h1 className="text-lg font-semibold">Vagas</h1>
      <hr />
      <Tabs defaultValue={getTabsDefaultValue()} className="space-y-8">
        <TabsList>
          <TabsTrigger
            value="all"
            onClick={() => {
              replace("/vagas");
            }}
          >
            Todas
          </TabsTrigger>
          <TabsTrigger
            value="covered"
            onClick={() => {
              replace("/vagas?isCovered=true");
            }}
          >
            Cobertas
          </TabsTrigger>
          <TabsTrigger
            value="uncovered"
            onClick={() => {
              replace("/vagas?isCovered=false");
            }}
          >
            Descobertas
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-6">
          <TabContent isPending={isPending} parkingSpaces={parkingSpaces} />
        </TabsContent>
        <TabsContent value="covered" className="space-y-6">
          <TabContent isPending={isPending} parkingSpaces={parkingSpaces} />
        </TabsContent>
        <TabsContent value="uncovered" className="space-y-6">
          <TabContent isPending={isPending} parkingSpaces={parkingSpaces} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
