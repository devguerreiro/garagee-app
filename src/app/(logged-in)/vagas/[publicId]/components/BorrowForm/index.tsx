"use client";

import { useRef } from "react";

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

import { DateInput, HourInput } from "@/components/ui/input";

import dayjs from "@/lib/dayjs";

import { createBooking } from "@/app/actions";
import { ParkingSpaceDetailDTO } from "@/app/dtos";

import { brazilianDate, createBookingDateTime } from "@/utils";

import formSchema, { FormSchema } from "./schema";

type Props = {
  parkingSpace: ParkingSpaceDetailDTO;
  onCancel: () => void;
  onSubmit: () => void;
};

export default function BorrowForm({
  parkingSpace,
  onCancel,
  onSubmit,
}: Readonly<Props>) {
  const now = useRef(dayjs());

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from_date: undefined,
      from_hour: 0,
      to_date: undefined,
      to_hour: 0,
    },
  });

  const fromDate = form.watch("from_date");
  const toDate = form.watch("to_date");

  async function handleSubmit(values: FormSchema) {
    const bookedFrom = createBookingDateTime(
      values.from_date,
      values.from_hour
    );
    const bookedTo = createBookingDateTime(values.to_date, values.to_hour);
    const response = await createBooking({
      parking_space: parkingSpace.public_id,
      booked_from: bookedFrom,
      booked_to: bookedTo,
    });
    if (response.error === null) {
      toast.success("Vaga solicitada com sucesso!");
      onSubmit();
    } else {
      const error = response.error;
      if (error.message.includes("parking space not available")) {
        toast.error("Vaga indisponível!");
      } else if (error.message.includes("from must not be in past")) {
        toast.error("Período de início não pode ser no passado!");
      } else if (error.message.includes("to must not be in past")) {
        toast.error("Período de fim não pode ser no passado!");
      }
    }
  }

  function disableDate(date: Date | undefined) {
    if (date !== undefined) {
      const isPast = dayjs(date).isBefore(now.current, "date");
      const isUnavailable =
        parkingSpace.bookings[brazilianDate(date)] !== undefined &&
        parkingSpace.bookings[brazilianDate(date)].length === 24;
      return !isPast || isUnavailable;
    }
    return false;
  }

  function showFromHour(hour: number) {
    if (fromDate !== undefined) {
      if (parkingSpace.bookings[brazilianDate(fromDate)] !== undefined) {
        return !parkingSpace.bookings[brazilianDate(fromDate)].includes(hour);
      } else if (dayjs(fromDate).isSame(now.current, "date")) {
        return hour > now.current.get("hour");
      }
    }
    return true;
  }

  function showToHour(hour: number) {
    if (toDate !== undefined) {
      if (parkingSpace.bookings[brazilianDate(toDate)] !== undefined) {
        return !parkingSpace.bookings[brazilianDate(toDate)].includes(hour);
      } else if (dayjs(toDate).isSame(now.current, "date")) {
        return hour > now.current.get("hour") + 1;
      }
    }
    return true;
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
                  // fromDate={now.current.toDate()}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="from_hour"
            render={({ field, formState }) => (
              <FormItem className="col-span-5">
                <FormLabel>Das</FormLabel>
                <HourInput
                  value={field.value}
                  onChange={field.onChange}
                  disabled={!formState.dirtyFields.from_date}
                  showHour={showFromHour}
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
                  // fromDate={now.current.toDate()}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="to_hour"
            render={({ field, formState }) => (
              <FormItem className="col-span-5">
                <FormLabel>Às</FormLabel>
                <HourInput
                  value={field.value}
                  onChange={field.onChange}
                  disabled={!formState.dirtyFields.to_date}
                  showHour={showToHour}
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
