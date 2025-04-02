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

export interface ParkingSpaceDTO {
  public_id: string;
  identifier: string;
  apartment: {
    identifier: string;
    tower: {
      building: {
        name: string;
      };
    };
    occupant: {
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
  apartment: {
    identifier: string;
    tower: {
      building: {
        name: string;
      };
    };
    occupant: {
      public_id: string;
      name: string;
    };
  };
  bookings: Record<string, Array<number>>;
}

export interface MyParkingSpaceDTO {
  public_id: string;
  identifier: string;
  guidance: string;
  is_covered: boolean;
  is_blocked: boolean;
  apartment: {
    identifier: string;
    tower: {
      building: {
        name: string;
      };
    };
    occupant: {
      public_id: string;
      name: string;
    };
  };
}

export enum BookingStatusDTO {
  PENDING = "Pendente",
  APPROVED = "Aprovada",
  REFUSED = "Reprovada",
  REVOKED = "Cancelada",
}

export interface CreateBookingDTO {
  parking_space: string;
  booked_from: Date;
  booked_to: Date;
}

export interface BookingDTO {
  public_id: string;
  status: keyof typeof BookingStatusDTO;
  booked_from: Date;
  booked_to: Date;
  parking_space: {
    identifier: true;
    apartment: {
      tower: {
        building: { name: true };
      };
    };
  };
}

export interface BookingDetailDTO {
  public_id: string;
  status: keyof typeof BookingStatusDTO;
  booked_from: Date;
  booked_to: Date;
  parking_space: {
    identifier: true;
    guidance: true;
    is_covered: true;
    apartment: {
      identifier: true;
      tower: {
        building: { name: true };
      };
      occupant: {
        public_id: string;
        name: string;
      };
    };
  };
  claimant_id: string;
}
