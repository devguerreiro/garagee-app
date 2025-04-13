"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import fetchWrapper from "@/lib/fetch";

import {
  CreateUserDTO,
  BuildingListDTO,
  LoginDTO,
  ParkingSpaceDTO,
  ParkingSpaceDetailDTO,
  ApartmentListDTO,
  TowerListDTO,
  BookingDTO,
  BookingDetailDTO,
  CreateBookingDTO,
  MyParkingSpaceDTO,
  UserProfileDTO,
  ParkingSpaceBookingsDTO,
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

export async function signOut() {
  (await cookies()).delete("token");
  redirect("/login");
}

export async function getParkingSpaces(params: Record<string, string>) {
  const url =
    Object.keys(params).length > 0
      ? "parking-space?" + new URLSearchParams(params)
      : "parking-space";
  return await fetchWrapper<Array<ParkingSpaceDTO>>(url, {
    method: "GET",
  });
}

export async function getParkingSpaceDetail(
  publicId: string,
  timezoneOffset: number
) {
  const url = `parking-space/${publicId}?timezoneOffset=${timezoneOffset}`;
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

export async function getMyParkingSpace() {
  return await fetchWrapper<MyParkingSpaceDTO>("parking-space/my", {
    method: "GET",
  });
}

export async function createBooking(data: CreateBookingDTO) {
  return await fetchWrapper<null>("booking", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getMyBookings(params: Record<string, string>) {
  const url =
    Object.keys(params).length > 0
      ? "booking/my?" + new URLSearchParams(params)
      : "booking/my";
  return await fetchWrapper<Array<BookingDTO>>(url, {
    method: "GET",
  });
}

export async function getBookingDetail(publicId: string) {
  const url = `booking/${publicId}`;
  return await fetchWrapper<BookingDetailDTO>(url, {
    method: "GET",
  });
}

export async function revokeBooking(publicId: string) {
  const url = `booking/${publicId}/revoke`;
  const response = await fetchWrapper<null>(url, {
    method: "PATCH",
  });
  if (response.errors === null) {
    revalidatePath("/minhas-vagas/[publicId]", "page");
  }
  return response;
}

export async function approveBooking(publicId: string) {
  const url = `booking/${publicId}/approve`;
  const response = await fetchWrapper<null>(url, {
    method: "PATCH",
  });
  if (response.errors === null) {
    revalidatePath("/minhas-vagas/[publicId]", "page");
  }
  return response;
}

export async function refuseBooking(publicId: string) {
  const url = `booking/${publicId}/refuse`;
  const response = await fetchWrapper<null>(url, {
    method: "PATCH",
  });
  if (response.errors === null) {
    revalidatePath("/minhas-vagas/[publicId]", "page");
  }
  return response;
}

export async function getUserProfile() {
  return await fetchWrapper<UserProfileDTO>("user/profile", {
    method: "GET",
  });
}

export async function getParkingSpaceBookings(
  parkingSpacePublicId: string,
  params: Record<string, string>
) {
  const url =
    Object.keys(params).length > 0
      ? `parking-space/${parkingSpacePublicId}/bookings?` +
        new URLSearchParams(params)
      : `parking-space/${parkingSpacePublicId}/bookings`;
  console.log(url);
  return await fetchWrapper<Array<ParkingSpaceBookingsDTO>>(url, {
    method: "GET",
  });
}
