import { ParkingCircleIcon, RadarIcon, UmbrellaIcon } from "lucide-react";

import { MyParkingSpaceDTO } from "@/app/dtos";

import { Badge } from "@/components/ui/badge";

import ParkingSpaceDetailOptions from "./Options";

type Props = {
  parkingSpace: MyParkingSpaceDTO;
};

export default function ParkingSpaceDetail({ parkingSpace }: Readonly<Props>) {
  return (
    <div className="p-8 bg-card shadow rounded-lg space-y-6">
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
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <RadarIcon className="text-secondary w-[1em] h-[1em]" />
            <span className="text-sm">Orientação</span>
          </div>
          <div>
            <strong>{parkingSpace.guidance}</strong>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <UmbrellaIcon className="text-secondary w-[1em] h-[1em]" />
            <span className="text-sm">Coberta?</span>
          </div>
          <div>
            <strong>{parkingSpace.is_covered ? "Sim" : "Não"}</strong>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
