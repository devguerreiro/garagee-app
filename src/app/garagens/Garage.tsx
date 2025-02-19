import { BuildingIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function Garage() {
  return (
    <div className="px-6 py-4 bg-card rounded-lg shadow space-y-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-xs">
            <span>Luis Guerreiro</span>
            <span>AP 501</span>
          </div>
        </div>
        <div>
          <span className="font-medium">Vaga 13A</span>
        </div>
      </div>
      <hr />
      <div className="text-sm flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BuildingIcon className="text-primary w-[1rem] h-[1rem]" />
          <span>Lago da constança</span>
        </div>
        <Badge>Disponível</Badge>
      </div>
    </div>
  );
}
