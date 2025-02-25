import { ParkingSpaceListDTO, ParkingSpaceDetailDTO } from "./dtos";

export async function getParkingSpaceList(): Promise<
  Array<ParkingSpaceListDTO>
> {
  const spaces = Array(4)
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

export async function getParkingSpaceDetail(
  publicId: string
): Promise<ParkingSpaceDetailDTO> {
  return Promise.resolve({
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
