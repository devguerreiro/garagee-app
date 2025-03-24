"use client";

import { useEffect, useState } from "react";

import { EllipsisVerticalIcon } from "lucide-react";

import { ParkingSpaceDetailDTO } from "@/app/dtos";

import { decodeTokenFromCookie } from "@/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ParkingSpaceBlockUnblockAlertDialog from "./ParkingSpaceBlockUnblockAlertDialog";

type Props = {
  parkingSpace: ParkingSpaceDetailDTO;
};

export default function ParkingSpaceDetailOptions({
  parkingSpace,
}: Readonly<Props>) {
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const decodedToken = decodeTokenFromCookie();
    setIsOwner(parkingSpace.apartment.occupant.public_id === decodedToken.sub);
  }, [parkingSpace.apartment.occupant]);

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
          <ParkingSpaceBlockUnblockAlertDialog parkingSpace={parkingSpace} />
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}
