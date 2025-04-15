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

import { revokeBooking } from "@/app/actions";
import { cn } from "@/lib/utils";

type Props = {
  booking: BookingDetailDTO;
};

export default function BookingRevokeAlertDialog({ booking }: Readonly<Props>) {
  async function handleAction() {
    const response = await revokeBooking(booking.public_id);
    if (response.errors === null) {
      toast.success("Reserva cancelada com sucesso!");
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={cn(
            buttonVariants({ variant: "destructive" }),
            "w-full !mt-12"
          )}
        >
          Cancelar reserva
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirme sua escolha</AlertDialogTitle>
          <AlertDialogDescription className="text-pretty">
            Você realmente deseja <strong>cancelar</strong> a reserva para
            empréstimo da vaga{" "}
            <strong className="text-foreground">
              &quot;{booking.parking_space.identifier}&quot;
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
