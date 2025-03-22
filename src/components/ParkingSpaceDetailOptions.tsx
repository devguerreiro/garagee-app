"use client";

import { useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";
import { getCookie } from "cookies-next/client";

import { EllipsisVerticalIcon } from "lucide-react";

import { ParkingSpaceDetailDTO, TokenDTO } from "@/app/dtos";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ParkingSpaceEditDialog from "./ParkingSpaceEditDialog";
import ParkingSpaceBlockUnblockAlertDialog from "./ParkingSpaceBlockUnblockAlertDialog";
import ParkingSpaceDeleteAlertDialog from "./ParkingSpaceDeleteAlertDialog";

type Props = {
  parkingSpace: ParkingSpaceDetailDTO;
};

export default function ParkingSpaceDetailOptions({
  parkingSpace,
}: Readonly<Props>) {
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const token = getCookie("token");
    const decodedToken = jwtDecode<TokenDTO>(token ?? "");
    setIsOwner(parkingSpace.owner.public_id === decodedToken.sub);
  }, [parkingSpace.owner.public_id]);

  return (
    isOwner && (
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="opções"
          className="focus-visible:outline-primary"
        >
          <EllipsisVerticalIcon className="text-muted-foreground w-[1em] h-[1em]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2">
          <ParkingSpaceEditDialog parkingSpace={parkingSpace} />
          <ParkingSpaceBlockUnblockAlertDialog parkingSpace={parkingSpace} />
          <ParkingSpaceDeleteAlertDialog parkingSpace={parkingSpace} />
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}
