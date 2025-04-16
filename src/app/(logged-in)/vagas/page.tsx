import fetchWrapper from "@/lib/fetch";

import { ParkingSpaceDTO } from "@/app/dtos";

import Feed from "./components/Feed";

type Props = {
  searchParams: Promise<{ isCovered: string | undefined }>;
};

export default async function Page(props: Readonly<Props>) {
  const searchParams = await props.searchParams;

  const isCovered = searchParams.isCovered;

  const parkingSpaces = await fetchWrapper<Array<ParkingSpaceDTO>>(
    isCovered ? `parking-space?isCovered=${isCovered}` : "parking-space"
  );

  if (!parkingSpaces) return;

  return (
    <div className="container py-8 space-y-4">
      <h1 className="text-lg font-semibold text-foreground">
        Vagas disponíveis para você
      </h1>
      <hr />
      <Feed isCovered={isCovered} parkingSpaces={parkingSpaces} />
    </div>
  );
}
