import { getMyParkingSpace } from "@/app/actions";

import ParkingSpaceDetail from "@/components/ParkingSpaceDetail";

export default async function Page() {
  const response = await getMyParkingSpace();

  if (!response.data) return;

  const parkingSpace = response.data;

  return (
    <div className="px-4 py-8 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Garagem</h1>
      </div>
      <hr />
      <ParkingSpaceDetail parkingSpace={parkingSpace} />
    </div>
  );
}
