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

  return (
    <div className="px-4 py-8 space-y-4">
      <h1 className="text-lg font-semibold">Vagas disponíveis para você</h1>
      <hr />
      <Feed isCovered={isCovered} parkingSpaces={response.data} />
    </div>
  );
}
