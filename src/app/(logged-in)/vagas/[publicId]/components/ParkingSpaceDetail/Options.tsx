"use client";

import { EllipsisVerticalIcon } from "lucide-react";

import { ParkingSpaceDetailDTO } from "@/app/dtos";

import { useCurrentUser } from "@/hooks/use-current-user";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ParkingSpaceBlockUnblockAlertDialog from "./BlockUnblockAlertDialog";

type Props = {
  parkingSpace: ParkingSpaceDetailDTO;
};

export default function Options({ parkingSpace }: Readonly<Props>) {
  const parkingSpaceOwner = parkingSpace.apartment.occupant.public_id;

  const { isCurrentUser: isParkingSpaceOwner } =
    useCurrentUser(parkingSpaceOwner);

  return (
    isParkingSpaceOwner && (
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
