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

export enum BookingStatusDTO {
  APPROVED = "Aprovada",
}

export interface BookingListDTO {
  publicId: string;
  parkingSpace: ParkingSpaceListDTO;
  from_date: Date;
  from_hour: number;
  to_date: Date;
  to_hour: number;
  status: BookingStatusDTO;
  bookedAt: Date;
}
