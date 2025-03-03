"use server";

import {
  ParkingSpaceListDTO,
  ParkingSpaceDetailDTO,
  ReservationListDTO,
  ReservationStatusDTO,
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

export async function getReservationList() {
  const reservations: Array<ReservationListDTO> = Array(4)
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
      status: ReservationStatusDTO.APPROVED,
    }));

  return Promise.resolve(reservations);
}
