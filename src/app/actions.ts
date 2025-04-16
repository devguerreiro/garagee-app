"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import fetchWrapper from "@/lib/fetch";

import { CreateUserDTO, CreateBookingDTO, LoginDTO } from "./dtos";

export async function createUser(data: CreateUserDTO) {
  return await fetchWrapper<null>("register", {
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
  const response = await fetchWrapper<null>(`parking-space/${publicId}/block`, {
    method: "PATCH",
  });

  if (response.error === null) revalidatePath("/vagas/[publicId]", "page");

  return response;
}

export async function unblockParkingSpace(publicId: string) {
  const response = await fetchWrapper<null>(
    `parking-space/${publicId}/unblock`,
    {
      method: "PATCH",
    }
  );

  if (response.error === null) revalidatePath("/vagas/[publicId]", "page");

  return response;
}

export async function createBooking(data: CreateBookingDTO) {
  return await fetchWrapper<null>("booking", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function revokeBooking(publicId: string) {
  const response = await fetchWrapper<null>(`booking/${publicId}/revoke`, {
    method: "PATCH",
  });

  if (response.error === null)
    revalidatePath("/minhas-vagas/[publicId]", "page");

  return response;
}

export async function approveBooking(publicId: string) {
  const response = await fetchWrapper<null>(`booking/${publicId}/approve`, {
    method: "PATCH",
  });

  if (response.error === null)
    revalidatePath("/minhas-vagas/[publicId]", "page");

  return response;
}

export async function refuseBooking(publicId: string) {
  const response = await fetchWrapper<null>(`booking/${publicId}/refuse`, {
    method: "PATCH",
  });

  if (response.error === null)
    revalidatePath("/minhas-vagas/[publicId]", "page");

  return response;
}
