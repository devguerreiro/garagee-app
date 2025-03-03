"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";

import { z } from "@/lib/zod";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import dayjs from "@/lib/dayjs";

const formSchema = z
  .object({
    from_date: z.date(),
    from_time: z.coerce.number().min(0).max(23),
    to_date: z.date(),
    to_time: z.coerce.number().min(0).max(23),
  })
  .superRefine((val, ctx) => {
    const now = dayjs();
    const fromDateTime = dayjs(val.from_date).set("hour", val.from_time);
    const toDateTime = dayjs(val.to_date).set("hour", val.to_time);

    if (fromDateTime.isBefore(now, "date")) {
      ctx.addIssue({
        code: "invalid_date",
        path: ["from_date"],
        message: "A data de início não pode ser no passado",
      });
    }

    if (fromDateTime.isBefore(now, "minute")) {
      ctx.addIssue({
        code: "invalid_date",
        path: ["from_time"],
        message: "A hora de início não pode ser no passado",
      });
    }

    if (toDateTime.isBefore(fromDateTime, "date")) {
      ctx.addIssue({
        code: "invalid_date",
        path: ["to_date"],
        message: "A data de fim não pode anteceder a data de início",
      });
    }

    if (
      toDateTime.isSame(fromDateTime, "date") &&
      toDateTime.isBefore(fromDateTime, "hour")
    ) {
      ctx.addIssue({
        code: "invalid_date",
        path: ["to_time"],
        message: "A hora de fim não pode anteceder a hora de início",
      });
    }

    if (toDateTime.isSame(fromDateTime, "hour")) {
      ctx.addIssue({
        code: "invalid_date",
        path: ["to_time"],
        message: "A hora de fim não pode ser igual à hora de início",
      });
    }
  });

type Props = {
  onCancel: () => void;
  onSubmit: () => void;
};

export default function BorrowForm({ onCancel, onSubmit }: Readonly<Props>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from_date: undefined,
      from_time: 0,
      to_date: undefined,
      to_time: 0,
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success("Vaga solicitada com sucesso!");
    onSubmit();
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
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full font-normal justify-between gap-4 bg-card",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          dayjs(field.value).format("L")
                        ) : (
                          <span className="overflow-hidden text-ellipsis">
                            Selecione uma data
                          </span>
                        )}
                        <CalendarIcon className="h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger disabled={!formState.dirtyFields.from_date}>
                      <SelectValue placeholder="Selecione o horário" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array(24)
                      .fill(0)
                      .map((_, index) => (
                        <SelectItem
                          key={index}
                          value={index.toString()}
                        >{`${index}:00`}</SelectItem>
                      ))}
                  </SelectContent>
                </Select>
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
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full font-normal justify-between gap-4 bg-card",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          dayjs(field.value).format("L")
                        ) : (
                          <span className="overflow-hidden text-ellipsis">
                            Selecione uma data
                          </span>
                        )}
                        <CalendarIcon className="h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger disabled={!formState.dirtyFields.to_date}>
                      <SelectValue placeholder="Selecione o horário" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array(24)
                      .fill(0)
                      .map((_, index) => (
                        <SelectItem
                          key={index}
                          value={index.toString()}
                        >{`${index}:00`}</SelectItem>
                      ))}
                  </SelectContent>
                </Select>
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
