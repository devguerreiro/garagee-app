"use server";

import fetchWrapper from "@/lib/fetch";

import { revalidatePath } from "next/cache";

import {
  CreateUserDTO,
  BuildingListDTO,
  LoginDTO,
  ParkingSpacesDTO,
  ParkingSpaceDetailDTO,
  ApartmentListDTO,
  TowerListDTO,
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
    "register/building?" + params,
    {
      method: "GET",
    }
  );
}

export async function getTowersByBuilding(buildingPublicId: string) {
  const url = `register/building/${buildingPublicId}/tower`;
  return await fetchWrapper<Array<TowerListDTO>>(url, {
    method: "GET",
  });
}

export async function getApartmentsByTower(towerPublicId: string) {
  const url = `register/tower/${towerPublicId}/apartment`;
  return await fetchWrapper<Array<ApartmentListDTO>>(url, {
    method: "GET",
  });
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

export async function blockParkingSpace(publicId: string) {
  const url = `parking-space/${publicId}/block`;
  const response = await fetchWrapper<null>(url, {
    method: "PATCH",
  });
  if (response.errors === null) {
    revalidatePath("/vagas/[publicId]", "page");
  }
  return response;
}

export async function unblockParkingSpace(publicId: string) {
  const url = `parking-space/${publicId}/unblock`;
  const response = await fetchWrapper<null>(url, {
    method: "PATCH",
  });
  if (response.errors === null) {
    revalidatePath("/vagas/[publicId]", "page");
  }
  return response;
}

export async function getMyParkingSpaces() {
  return await fetchWrapper<Array<ParkingSpacesDTO>>("parking-space/my", {
    method: "GET",
  });
}
