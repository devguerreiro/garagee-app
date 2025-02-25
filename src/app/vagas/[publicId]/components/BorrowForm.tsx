"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DateTimePicker } from "@/components/ui/date-time-picker";

const formSchema = z.object({
  from: z.date(),
  to: z.date(),
});

type Props = {
  onCancel: () => void;
};

export default function BorrowForm({ onCancel }: Readonly<Props>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: undefined,
      to: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem>
                <FormLabel>A partir de</FormLabel>
                <FormControl>
                  <DateTimePicker
                    hourCycle={24}
                    value={field.value}
                    onChange={field.onChange}
                    granularity="minute"
                    placeholder="Selecione uma data e horário"
                    startMonth={new Date()}
                    disabled={{
                      before: new Date(),
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Até</FormLabel>
                <FormControl>
                  <DateTimePicker
                    hourCycle={24}
                    value={field.value}
                    onChange={field.onChange}
                    granularity="minute"
                    placeholder="Selecione uma data e horário"
                    startMonth={new Date()}
                    disabled={{
                      before: new Date(),
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">Solicitar</Button>
        </div>
      </form>
    </Form>
  );
}
