"use server";

import dayjs from "dayjs";

import {
  ParkingSpaceListDTO,
  ParkingSpaceDetailDTO,
  BookingListDTO,
  BookingStatusDTO,
} from "./dtos";

export async function getParkingSpaceList() {
  const spaces: Array<ParkingSpaceListDTO> = Array(4)
    .fill(null)
    .map(() => ({
      publicId: "11ef06e4-11d7-40a2-8ac6-0281ad7cf3db",
      identifier: "Vaga 13A",
      available: true,
      building: {
        name: "Condomínio Lago da Constança",
      },
      owner: {
        name: "Luis Guerreiro",
        apartment: "501",
      },
    }));

  return Promise.resolve(spaces);
}

export async function getParkingSpaceDetail(publicId: string) {
  return Promise.resolve<ParkingSpaceDetailDTO>({
    publicId,
    identifier: "Vaga 13A",
    guidance: "Terceira vaga coberta a direita",
    available: true,
    building: {
      name: "Condomínio Lago da Constança",
    },
    owner: {
      name: "Luis Guerreiro",
      apartment: "501",
    },
    isCovered: true,
  });
}

export async function getBookingList() {
  const bookings: Array<BookingListDTO> = Array(4)
    .fill(null)
    .map(() => ({
      publicId: "bf456c82-e1a5-4091-b4d9-afad27f5c2d6",
      parkingSpace: {
        publicId: "11ef06e4-11d7-40a2-8ac6-0281ad7cf3db",
        identifier: "Vaga 13A",
        available: true,
        building: {
          name: "Condomínio Lago da Constança",
        },
        owner: {
          name: "Luis Guerreiro",
          apartment: "501",
        },
      },
      from_date: dayjs().toDate(),
      from_hour: 12,
      to_date: dayjs().toDate(),
      to_hour: 16,
      status: BookingStatusDTO.APPROVED,
      bookedAt: dayjs().toDate(),
    }));

  return Promise.resolve(bookings);
}
