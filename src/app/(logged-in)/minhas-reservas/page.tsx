"use client";

import { startTransition, useActionState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { getMyBookings } from "@/app/actions";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import TabContent from "./components/TabContent";

export default function Page() {
  const { replace } = useRouter();

  const searchParams = useSearchParams();

  const [bookings, dispatch, isPending] = useActionState(async () => {
    const status = searchParams.get("status");
    const params = new URLSearchParams();
    if (
      status !== null &&
      ["approved", "pending", "refused"].includes(status)
    ) {
      params.set("status", status);
    }
    const response = await getMyBookings(Object.fromEntries(params.entries()));
    if (response.data) return response.data;
    return [];
  }, []);

  function getTabsDefaultValue() {
    const status = searchParams.get("status");
    if (status === null) return "all";
    else if (status === "true") return "covered";
    return "uncovered";
  }

  useEffect(() => {
    startTransition(dispatch);
  }, [searchParams]);

  return (
    <div className="px-4 py-8 space-y-4">
      <h1 className="text-lg font-semibold">Reservas</h1>
      <hr />
      <Tabs defaultValue={getTabsDefaultValue()} className="space-y-8">
        <TabsList>
          <TabsTrigger
            value="all"
            onClick={() => {
              replace("/minhas-reservas");
            }}
          >
            Todas
          </TabsTrigger>
          <TabsTrigger
            value="approved"
            onClick={() => {
              replace("/minhas-reservas?status=approved");
            }}
          >
            Aprovadas
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            onClick={() => {
              replace("/minhas-reservas?status=pending");
            }}
          >
            Pendentes
          </TabsTrigger>
          <TabsTrigger
            value="refused"
            onClick={() => {
              replace("/minhas-reservas?status=refused");
            }}
          >
            Recusadas
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-6">
          <TabContent isPending={isPending} bookings={bookings} />
        </TabsContent>
        <TabsContent value="approved" className="space-y-6">
          <TabContent isPending={isPending} bookings={bookings} />
        </TabsContent>
        <TabsContent value="pending" className="space-y-6">
          <TabContent isPending={isPending} bookings={bookings} />
        </TabsContent>
        <TabsContent value="refused" className="space-y-6">
          <TabContent isPending={isPending} bookings={bookings} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
