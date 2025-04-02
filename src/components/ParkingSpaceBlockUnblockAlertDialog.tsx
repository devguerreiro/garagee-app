"use client";

import { toast } from "sonner";

import { MyParkingSpaceDTO, ParkingSpaceDetailDTO } from "@/app/dtos";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { blockParkingSpace, unblockParkingSpace } from "@/app/actions";

type Props = {
  parkingSpace: ParkingSpaceDetailDTO | MyParkingSpaceDTO;
};

export default function ParkingSpaceBlockUnblockAlertDialog({
  parkingSpace,
}: Readonly<Props>) {
  async function handleAction() {
    if (parkingSpace.is_blocked) {
      const response = await unblockParkingSpace(parkingSpace.public_id);
      if (response.errors === null) {
        toast.success("Vaga liberada com sucesso!");
      }
    } else {
      const response = await blockParkingSpace(parkingSpace.public_id);
      if (response.errors === null) {
        toast.success("Vaga fechada com sucesso!");
      }
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full h-8 px-2 py-1 flex justify-start items-center bg-card shadow-none text-inherit font-normal">
        {parkingSpace.is_blocked ? "Liberar" : "Bloquear"} vaga
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirme sua escolha</AlertDialogTitle>
          <AlertDialogDescription className="text-pretty">
            Você realmente deseja{" "}
            <strong className="text-destructive">
              {parkingSpace.is_blocked ? "liberar" : "bloquear"}
            </strong>{" "}
            a possibilidade de futuros empréstimos da vaga{" "}
            <strong className="text-secondary">
              &quot;{parkingSpace.identifier}&quot;
            </strong>
            ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleAction}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
