"use server";

import { cookies } from "next/headers";

import { API_BASE_URL } from "@/env";

import { RequestErrorDTO } from "@/app/dtos";

export default async function fetchWrapper<T>(
  url: string,
  options?: RequestInit
) {
  const headers = new Headers(options ? options.headers : undefined);

  const contentType = headers.get("Content-Type");

  if (!contentType) {
    headers.set("Content-Type", "application/json");
  } else if (contentType === "multipart/form-data") {
    headers.delete("Content-Type");
  }

  if (url !== "auth/login/" || !headers.has("Authorization")) {
    const token = (await cookies()).get("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token.value}`);
    }
  }

  const response = await fetch(`${API_BASE_URL}/${url}`, {
    ...options,
    headers,
  });
  if (response.status !== 204) {
    return (await response.json()) as T | RequestErrorDTO;
  }
}
