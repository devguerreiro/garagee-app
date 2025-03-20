export enum BookingStatusDTO {
  APPROVED = "Aprovada",
  REFUSED = "Reprovada",
  PENDING = "Pendente",
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

export interface ParkingSpacesListDTO {
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
