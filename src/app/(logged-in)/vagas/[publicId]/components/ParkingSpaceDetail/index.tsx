import { ParkingCircleIcon, RadarIcon, UmbrellaIcon } from "lucide-react";

import { ParkingSpaceDetailDTO } from "@/app/dtos";

import { Badge } from "@/components/ui/badge";

import ParkingSpaceDetailOptions from "./Options";
import OccupantInfo from "./OccupantInfo";

type Props = {
  parkingSpace: ParkingSpaceDetailDTO;
};

export default function ParkingSpaceDetail({ parkingSpace }: Readonly<Props>) {
  return (
    <div className="p-8 bg-card shadow rounded-lg text-sm space-y-6">
      <div className="text-xl flex justify-between items-center">
        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-foreground">
            <ParkingCircleIcon className="w-[1em] h-[1em]" />
            <h2 className="font-semibold ">{parkingSpace.identifier}</h2>
          </div>
          <Badge variant={parkingSpace.is_blocked ? "destructive" : "success"}>
            {parkingSpace.is_blocked ? "Fechada" : "Aberta"}
          </Badge>
        </div>
        <ParkingSpaceDetailOptions parkingSpace={parkingSpace} />
      </div>
      <hr />
      <div className="space-y-4">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <RadarIcon className="w-[1em] h-[1em] text-secondary" />
            <span className="block">Orientação</span>
          </div>
          <div>
            <strong>{parkingSpace.guidance}</strong>
          </div>
        </div>
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <UmbrellaIcon className="w-[1em] h-[1em] text-secondary" />
            <span className="block">Coberta?</span>
          </div>
          <div>
            <strong>{parkingSpace.is_covered ? "Sim" : "Não"}</strong>
          </div>
        </div>
      </div>
      <hr />
      <OccupantInfo parkingSpace={parkingSpace} />
    </div>
  );
}
