"use client";

import { toast } from "sonner";

import { ParkingSpaceDetailDTO } from "@/app/dtos";

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

type Props = {
  parkingSpace: ParkingSpaceDetailDTO;
};

export default function ParkingSpaceCloseAlertDialog({
  parkingSpace,
}: Readonly<Props>) {
  function handleAction() {
    toast.success("Vaga fechada com sucesso!");
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full h-8 px-2 py-1 flex justify-start items-center bg-card shadow-none text-inherit font-normal">
        Bloquear vaga
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirme sua escolha</AlertDialogTitle>
          <AlertDialogDescription className="text-pretty">
            Você realmente deseja bloquear a possibilidade de futuros
            empréstimos da vaga &quot;
            <strong className="text-destructive">
              {parkingSpace.identifier}
            </strong>
            &quot;?
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
