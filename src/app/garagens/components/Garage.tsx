import Link from "next/link";

import { BuildingIcon, HouseIcon, ParkingCircleIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function Garage() {
  return (
    <Link
      href="/garagens/lago-da-constanca/13A"
      className="block px-6 py-4 bg-card rounded-lg shadow space-y-4"
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5 text-xs">
            <span>Luis Guerreiro</span>
            <div className="flex items-center gap-1">
              <HouseIcon className="text-primary w-[1em] h-[1em]" />
              <span>501</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <ParkingCircleIcon className="w-[1em] h-[1em]" />
          <span className="font-medium">Vaga 13A</span>
        </div>
      </div>
      <hr />
      <div className="text-sm flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <BuildingIcon className="text-primary w-[1em] h-[1em]" />
          <span>Lago da constança</span>
        </div>
        <Badge>Disponível</Badge>
      </div>
    </Link>
  );
}
