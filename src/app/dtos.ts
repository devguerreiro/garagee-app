export enum BookingStatusDTO {
  APPROVED = "Aprovada",
  REFUSED = "Reprovada",
  PENDING = "Pendente",
}

export interface ParkingSpaceListDTO {
  publicId: string;
  identifier: string;
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
  building: {
    name: string;
  };
  owner: {
    name: string;
    apartment: string;
  };
  isCovered: boolean;
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

export interface BookingDetailDTO {
  publicId: string;
  parkingSpace: ParkingSpaceDetailDTO;
  from_date: Date;
  from_hour: number;
  to_date: Date;
  to_hour: number;
  status: BookingStatusDTO;
  bookedAt: Date;
}

export interface CreateUserDTO {
  name: string;
  building: string;
  apartment: string;
  username: string;
  password: string;
}

export interface BuildingListDTO {
  public_id: string;
  name: string;
  cnpj: string;
}

export interface LoginDTO {
  access_token: string;
}
