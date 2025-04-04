"use client";

import { useState } from "react";

import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

import { ParkingSpaceDetailDTO } from "@/app/dtos";

import { useCurrentUser } from "@/hooks/use-current-user";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import BorrowForm from "./BorrowForm";

type Props = {
  parkingSpace: ParkingSpaceDetailDTO;
};

export default function BorrowDialog({ parkingSpace }: Readonly<Props>) {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const parkingSpaceOwner = parkingSpace.apartment.occupant.public_id;

  const { isCurrentUser: isParkingSpaceOwner } =
    useCurrentUser(parkingSpaceOwner);

  return (
    isParkingSpaceOwner !== null &&
    !isParkingSpaceOwner && (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full">Pedir emprestado</DialogTrigger>
        <DialogContent>
          <DialogHeader className="hidden">
            <DialogTitle>Solicitação da vaga</DialogTitle>
            <DialogDescription>
              Informe o período que você gostaria de utilizá-la
            </DialogDescription>
          </DialogHeader>
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Solicitação da vaga</CardTitle>
              <CardDescription>
                Informe o período que você gostaria de utilizá-la
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BorrowForm
                parkingSpace={parkingSpace}
                onCancel={close}
                onSubmit={close}
              />
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    )
  );
}
