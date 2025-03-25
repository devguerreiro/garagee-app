"use client";

import { toast } from "sonner";

import { BookingDetailDTO } from "@/app/dtos";

import { cn } from "@/lib/utils";

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

import { approveBooking } from "@/app/actions";

type Props = {
  booking: BookingDetailDTO;
};

export default function BookingApproveAlertDialog({
  booking,
}: Readonly<Props>) {
  async function handleAction() {
    const response = await approveBooking(booking.public_id);
    if (response.errors === null) {
      toast.success("Reserva aprovada com sucesso!");
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={cn(buttonVariants({ variant: "success" }), "w-full ")}
        >
          Aprovar reserva
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirme sua escolha</AlertDialogTitle>
          <AlertDialogDescription className="text-pretty">
            Você realmente deseja{" "}
            <strong className="text-destructive">aprovar</strong> a reserva para
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
