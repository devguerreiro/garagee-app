import { getBookingList } from "@/app/actions";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import BookingCard from "./components/BookingCard";

export default async function Page() {
  const bookings = await getBookingList();

  return (
    <div className="px-4 py-8 space-y-4">
      <h1 className="text-lg font-semibold">Reservas</h1>
      <hr />
      <Tabs defaultValue="all" className="space-y-8">
        <TabsList>
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="approved">Aprovadas</TabsTrigger>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
          <TabsTrigger value="refused">Recusadas</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-6">
          {bookings.map((booking) => (
            <BookingCard key={booking.publicId} booking={booking} />
          ))}
        </TabsContent>
        <TabsContent value="approved" className="space-y-6">
          {bookings.map((booking) => (
            <BookingCard key={booking.publicId} booking={booking} />
          ))}
        </TabsContent>
        <TabsContent value="pending" className="space-y-6">
          {bookings.map((booking) => (
            <BookingCard key={booking.publicId} booking={booking} />
          ))}
        </TabsContent>
        <TabsContent value="refused" className="space-y-6">
          {bookings.map((booking) => (
            <BookingCard key={booking.publicId} booking={booking} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
