"use server";

import fetchWrapper from "@/lib/fetch";

import {
  CreateUserDTO,
  BuildingListDTO,
  LoginDTO,
  ParkingSpacesDTO,
  ParkingSpaceDetailDTO,
} from "./dtos";

export async function createUser(data: CreateUserDTO) {
  return await fetchWrapper<null>("register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getBuildingsByName(name: string) {
  const params = new URLSearchParams({ name });
  return await fetchWrapper<Array<BuildingListDTO>>(
    "register/buildings?" + params,
    {
      method: "GET",
    }
  );
}

export async function signIn(username: string, password: string) {
  return await fetchWrapper<LoginDTO>("auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function getParkingSpaces() {
  return await fetchWrapper<Array<ParkingSpacesDTO>>("parking-space", {
    method: "GET",
  });
}

export async function getParkingSpaceDetail(publicId: string) {
  const url = `parking-space/${publicId}`;
  return await fetchWrapper<ParkingSpaceDetailDTO>(url, {
    method: "GET",
  });
}
