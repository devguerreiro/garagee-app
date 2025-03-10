import dayjs from "@/lib/dayjs";

import { BookingStatusDTO } from "./app/dtos";

export function getAbbreviationName(name: string): string {
  const words = name.split(" ");
  const wordsLength = words.length;
  if (wordsLength === 0) return "";
  else if (wordsLength === 1) return words[0];
  else {
    const firstName = words[0];
    const lastName = words[words.length - 1];
    const initials = `${firstName.charAt(0).toUpperCase()}${lastName
      .charAt(0)
      .toUpperCase()}`;
    return initials;
  }
}

export function brazilianDate(date: Date): string {
  return dayjs(date).format("L");
}

export function brazilianDateTime(date: Date): string {
  return dayjs(date).format("L LT");
}

export function getBookingStatusBadgeVariant(status: BookingStatusDTO) {
  switch (status) {
    case BookingStatusDTO.APPROVED:
      return "success";
    case BookingStatusDTO.REFUSED:
      return "destructive";
    case BookingStatusDTO.PENDING:
      return "warning";
    default:
      return "default";
  }
}

export function createBookingDateTime(date: Date, hour: number) {
  const datetime = dayjs(date).set("hour", hour).set("minute", 0);
  return brazilianDateTime(datetime.toDate());
}
