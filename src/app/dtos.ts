export enum BookingStatusDTO {
  APPROVED = "Aprovada",
  REFUSED = "Reprovada",
  PENDING = "Pendente",
}

export interface TokenDTO {
  sub: string;
  iat: number;
  exp: number;
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

export interface TowerListDTO {
  public_id: string;
  identifier: string;
}

export interface ApartmentListDTO {
  public_id: string;
  identifier: string;
}

export interface LoginDTO {
  access_token: string;
}

export interface ParkingSpacesDTO {
  public_id: string;
  identifier: string;
  owner: {
    public_id: string;
    name: string;
    apartment: string;
    building: {
      public_id: string;
      name: string;
    };
  };
}

export interface ParkingSpaceDetailDTO {
  public_id: string;
  identifier: string;
  guidance: string;
  is_covered: boolean;
  is_blocked: boolean;
  owner: {
    public_id: string;
    name: string;
    apartment: string;
    building: {
      public_id: string;
      name: string;
    };
  };
}
