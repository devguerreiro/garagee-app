import { getReservationList } from "@/app/actions";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ReservationCard from "./components/ReservationCard";

export default async function Page() {
  const reservations = await getReservationList();

  return (
    <div className="px-4 py-8 space-y-4">
      <h1 className="text-lg font-semibold">Reservas</h1>
      <Tabs defaultValue="all" className="space-y-8">
        <TabsList>
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="approved">Aprovadas</TabsTrigger>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
          <TabsTrigger value="refused">Recusadas</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-6">
          {reservations.map((reservation) => (
            <ReservationCard
              key={reservation.publicId}
              reservation={reservation}
            />
          ))}
        </TabsContent>
        <TabsContent value="approved">
          {reservations.map((reservation) => (
            <ReservationCard
              key={reservation.publicId}
              reservation={reservation}
            />
          ))}
        </TabsContent>
        <TabsContent value="pending">
          {reservations.map((reservation) => (
            <ReservationCard
              key={reservation.publicId}
              reservation={reservation}
            />
          ))}
        </TabsContent>
        <TabsContent value="refused">
          {reservations.map((reservation) => (
            <ReservationCard
              key={reservation.publicId}
              reservation={reservation}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
