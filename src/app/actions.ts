"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import fetchWrapper from "@/lib/fetch";

import { CreateUserDTO, LoginDTO, CreateBookingDTO } from "./dtos";

export async function createUser(data: CreateUserDTO) {
  return await fetchWrapper<undefined>("register", {
    method: "POST",
    body: JSON.stringify(data),
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

export async function blockParkingSpace(publicId: string) {
  const url = `parking-space/${publicId}/block`;

  const data = await fetchWrapper<undefined>(url, {
    method: "PATCH",
  });

  if (data === undefined) revalidatePath("/vagas/[publicId]", "page");

  return data;
}

export async function unblockParkingSpace(publicId: string) {
  const url = `parking-space/${publicId}/unblock`;

  const data = await fetchWrapper<undefined>(url, {
    method: "PATCH",
  });

  if (data === undefined) revalidatePath("/vagas/[publicId]", "page");

  return data;
}

export async function createBooking(data: CreateBookingDTO) {
  return await fetchWrapper<undefined>("booking", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function revokeBooking(publicId: string) {
  const url = `booking/${publicId}/revoke`;

  const data = await fetchWrapper<undefined>(url, {
    method: "PATCH",
  });

  if (data === undefined) revalidatePath("/minhas-vagas/[publicId]", "page");

  return data;
}

export async function approveBooking(publicId: string) {
  const url = `booking/${publicId}/approve`;

  const data = await fetchWrapper<undefined>(url, {
    method: "PATCH",
  });

  if (data === undefined) revalidatePath("/minhas-vagas/[publicId]", "page");

  return data;
}

export async function refuseBooking(publicId: string) {
  const url = `booking/${publicId}/refuse`;

  const data = await fetchWrapper<undefined>(url, {
    method: "PATCH",
  });

  if (data === undefined) revalidatePath("/minhas-vagas/[publicId]", "page");

  return data;
}
