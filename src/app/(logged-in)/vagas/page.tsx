import { getParkingSpaces } from "@/app/actions";

import Feed from "./components/Feed";

type Props = {
  searchParams: Promise<{ isCovered: string | undefined }>;
};

export default async function Page(props: Readonly<Props>) {
  const searchParams = await props.searchParams;

  const isCovered = searchParams.isCovered;

  const response = await getParkingSpaces(isCovered ? { isCovered } : {});

  if (!response.data) return;

  const parkingSpaces = response.data;

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
