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

export default function ParkingSpaceDeleteAlertDialog({
  parkingSpace,
}: Readonly<Props>) {
  function handleAction() {
    toast.success("Vaga excluída com sucesso!");
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="h-8 flex px-2 py-1 text-sm font-medium text-destructive">
        Excluir vaga
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="text-start">
          <AlertDialogTitle>
            Exclusão da vaga &quot;<strong>{parkingSpace.identifier}</strong>
            &quot;
          </AlertDialogTitle>
          <AlertDialogDescription>
            Você realmente deseja excluir a vaga &quot;
            <strong>{parkingSpace.identifier}</strong>&quot;?
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
