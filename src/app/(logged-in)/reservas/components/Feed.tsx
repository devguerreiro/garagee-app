"use client";

import { useRouter } from "next/navigation";

import { BookingDTO, BookingStatusDTO } from "@/app/dtos";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import FeedTab from "./FeedTab";

const statuses = Object.keys(BookingStatusDTO).map((status) =>
  status.toLowerCase()
);

type Props = {
  status: string | undefined;
  bookings: Array<BookingDTO>;
};

export default function Feed({ status, bookings }: Readonly<Props>) {
  const { replace } = useRouter();

  function getTabsDefaultValue() {
    if (status === undefined || !statuses.includes(status.toLowerCase())) {
      return "all";
    }
    return status.toLowerCase();
  }

  function handleTabChange(value: string) {
    if (value === "approved") replace("/reservas?status=approved");
    else if (value === "pending") replace("/reservas?status=pending");
    else if (value === "refused") replace("/reservas?status=refused");
    else if (value === "revoked") replace("/reservas?status=revoked");
    else replace("/reservas");
  }

  return (
    <Tabs
      defaultValue={getTabsDefaultValue()}
      onValueChange={handleTabChange}
      className="space-y-8"
    >
      <TabsList>
        <TabsTrigger value="all">Todas</TabsTrigger>
        <TabsTrigger value="approved">Aprovadas</TabsTrigger>
        <TabsTrigger value="pending">Pendentes</TabsTrigger>
        <TabsTrigger value="refused">Recusadas</TabsTrigger>
        <TabsTrigger value="revoked">Canceladas</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="space-y-6">
        <FeedTab bookings={bookings} />
      </TabsContent>
      <TabsContent value="approved" className="space-y-6">
        <FeedTab bookings={bookings} />
      </TabsContent>
      <TabsContent value="pending" className="space-y-6">
        <FeedTab bookings={bookings} />
      </TabsContent>
      <TabsContent value="refused" className="space-y-6">
        <FeedTab bookings={bookings} />
      </TabsContent>
      <TabsContent value="revoked" className="space-y-6">
        <FeedTab bookings={bookings} />
      </TabsContent>
    </Tabs>
  );
}
