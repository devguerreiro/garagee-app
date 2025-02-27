"use client";

import { useState } from "react";

import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

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

export default function BorrowDialog() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="!mt-10 w-full">Pedir emprestado</DialogTrigger>
      <DialogContent>
        <DialogHeader className="hidden">
          <DialogTitle>Solicitação da vaga</DialogTitle>
          <DialogDescription>
            Informe o período que você gostaria de utilizá-la
          </DialogDescription>
        </DialogHeader>
        <Card className="mt-4 overflow-hidden">
          <CardHeader>
            <CardTitle>Solicitação da vaga</CardTitle>
            <CardDescription>
              Informe o período que você gostaria de utilizá-la
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BorrowForm onCancel={close} onSubmit={close} />
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
