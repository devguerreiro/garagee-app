"use client";

import { toast } from "sonner";

import { BookingDetailDTO } from "@/app/dtos";

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
import { Button, buttonVariants } from "@/components/ui/button";

import { refuseBooking } from "@/app/actions";
import { cn } from "@/lib/utils";

type Props = {
  booking: BookingDetailDTO;
};

export default function BookingRefuseAlertDialog({ booking }: Readonly<Props>) {
  async function handleAction() {
    const data = await refuseBooking(booking.public_id);
    if (data === null) {
      toast.success("Reserva recusada com sucesso!");
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-full bg-transparent border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
          )}
        >
          Recusar reserva
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirme sua escolha</AlertDialogTitle>
          <AlertDialogDescription className="text-pretty">
            Você realmente deseja <strong>recusar</strong> a reserva para
            empréstimo da sua vaga?
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
