"use client";

import { useRouter } from "next/navigation";

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
import { deleteParkingSpace } from "@/app/actions";

type Props = {
  parkingSpace: ParkingSpaceDetailDTO;
};

export default function ParkingSpaceDeleteAlertDialog({
  parkingSpace,
}: Readonly<Props>) {
  const { back } = useRouter();

  async function handleAction() {
    const response = await deleteParkingSpace(parkingSpace.public_id);
    if (response.errors === null) {
      toast.success("Vaga excluída com sucesso!");
      back();
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full h-8 px-2 py-1 flex justify-start items-center bg-card shadow-none text-destructive font-medium hover:bg-destructive hover:text-white">
        Excluir vaga
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirme sua escolha</AlertDialogTitle>
          <AlertDialogDescription className="text-pretty">
            Você realmente deseja{" "}
            <strong className="text-destructive">excluir</strong> a vaga{" "}
            <strong className="text-secondary">
              &quot;{parkingSpace.identifier}&quot;
            </strong>{" "}
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
