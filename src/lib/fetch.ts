"use server";

import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { API_BASE_URL } from "@/env";

type ResponseData<T> = {
  data: T | null;
  errors: Array<string> | null;
};

async function handleRequestError(response: Response) {
  if (response.status === 400) {
    const message: string | Array<string> = (await response.json()).message;
    return {
      data: null,
      errors: typeof message === "string" ? [message] : message,
    };
  } else if (response.status === 401) {
    return { data: null, errors: ["Acesso não autorizado"] };
  } else if (response.status === 404) {
    notFound();
  }
  return { data: null, errors: ["Erro desconhecido"] };
}

export default async function fetchWrapper<T>(
  url: string,
  options: RequestInit
): Promise<ResponseData<T>> {
  const headers = new Headers(options.headers);

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
  if (response.ok) {
    try {
      const data = (await response.json()) as T;
      return { data, errors: null };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return { data: null, errors: null };
    }
  }

  return handleRequestError(response);
}
