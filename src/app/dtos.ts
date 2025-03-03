export interface ParkingSpaceListDTO {
  publicId: string;
  identifier: string;
  available: boolean;
  building: {
    name: string;
  };
  owner: {
    name: string;
    apartment: string;
  };
}

export interface ParkingSpaceDetailDTO {
  publicId: string;
  identifier: string;
  guidance: string;
  available: boolean;
  building: {
    name: string;
  };
  owner: {
    name: string;
    apartment: string;
  };
  isCovered: boolean;
}

export enum ReservationStatusDTO {
  APPROVED,
}

export interface ReservationListDTO {
  publicId: string;
  parkingSpace: ParkingSpaceListDTO;
  status: ReservationStatusDTO;
}
