"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { DateInput, TimeInput } from "@/components/ui/input";

import dayjs from "@/lib/dayjs";

import formSchema, { FormSchema } from "./schema";
import { useRef } from "react";

type Props = {
  onCancel: () => void;
  onSubmit: () => void;
};

export default function BorrowForm({ onCancel, onSubmit }: Readonly<Props>) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from_date: undefined,
      from_time: 0,
      to_date: undefined,
      to_time: 0,
    },
  });

  const now = useRef(dayjs());

  function handleSubmit(values: FormSchema) {
    console.log(values);
    toast.success("Vaga solicitada com sucesso!");
    onSubmit();
  }

  function disableDate(date: Date | undefined) {
    if (date !== undefined) {
      return dayjs(date).isBefore(now.current, "date");
    }
    return false;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-12 gap-4">
          <FormField
            control={form.control}
            name="from_date"
            render={({ field }) => (
              <FormItem className="col-span-7">
                <FormLabel>A partir de</FormLabel>
                <DateInput
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disableDate}
                  fromDate={now.current.toDate()}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="from_time"
            render={({ field, formState }) => (
              <FormItem className="col-span-5">
                <FormLabel>Das</FormLabel>
                <TimeInput
                  value={field.value}
                  onChange={field.onChange}
                  disabled={!formState.dirtyFields.from_date}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-12 gap-4">
          <FormField
            control={form.control}
            name="to_date"
            render={({ field }) => (
              <FormItem className="col-span-7">
                <FormLabel>Até</FormLabel>
                <DateInput
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disableDate}
                  fromDate={now.current.toDate()}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="to_time"
            render={({ field, formState }) => (
              <FormItem className="col-span-5">
                <FormLabel>Às</FormLabel>
                <TimeInput
                  value={field.value}
                  onChange={field.onChange}
                  disabled={!formState.dirtyFields.from_date}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="!mt-12 flex justify-between">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">Solicitar</Button>
        </div>
      </form>
    </Form>
  );
}
