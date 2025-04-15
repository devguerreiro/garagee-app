"use client";

import { EllipsisVerticalIcon } from "lucide-react";

import { MyParkingSpaceDTO } from "@/app/dtos";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ParkingSpaceBlockUnblockAlertDialog from "./BlockUnblockAlertDialog";

type Props = {
  parkingSpace: MyParkingSpaceDTO;
};

export default function Options({ parkingSpace }: Readonly<Props>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="opções"
        className="focus-visible:outline-primary"
      >
        <EllipsisVerticalIcon className="w-[1em] h-[1em]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2">
        <ParkingSpaceBlockUnblockAlertDialog parkingSpace={parkingSpace} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
