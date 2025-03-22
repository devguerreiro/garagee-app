"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { z } from "@/lib/zod";

import { ParkingSpaceDetailDTO } from "@/app/dtos";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";

import { updateParkingSpace } from "@/app/actions";
import { LoaderCircle } from "lucide-react";

const schema = z.object({
  identifier: z.string().min(1).max(5),
  guidance: z.string().min(15).max(100),
  isCovered: z.boolean(),
});

type Schema = z.infer<typeof schema>;

type Props = {
  parkingSpace: ParkingSpaceDetailDTO;
};

export default function ParkingSpaceEditDialog({
  parkingSpace,
}: Readonly<Props>) {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      identifier: parkingSpace.identifier,
      guidance: parkingSpace.guidance,
      isCovered: parkingSpace.is_covered,
    },
  });

  const [open, setOpen] = useState(false);

  async function handleSubmit(values: Schema) {
    const response = await updateParkingSpace(parkingSpace.public_id, {
      ...values,
      is_covered: values.isCovered,
    });
    if (response.errors === null) {
      toast.success("Vaga atualizada com sucesso!");
    }
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full h-8 px-2 py-1 flex justify-start items-center bg-card shadow-none text-inherit font-normal">
        Editar vaga
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-start hidden">
          <DialogTitle>Dados da vaga</DialogTitle>
          <DialogDescription>
            Preencha as informações abaixo para atualizar os dados da sua vaga.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="p-6 bg-card rounded-lg shadow space-y-4"
          >
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="required">
                    Identificador da vaga
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ex.: 13B" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="guidance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="required">Observação</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Ex.: Terceira vaga à esquerda"
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Ajude a encontrarem sua vaga mais facilmente
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isCovered"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="required">É coberta?</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="!mt-10 flex gap-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-card"
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="flex-1"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <LoaderCircle className="animate-spin" />
                    Atualizando...
                  </>
                ) : (
                  "Atualizar"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
