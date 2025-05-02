"use client";

import { ResponseDTO } from "@/app/dtos";

export default function useFetch() {
  async function fetchData<T>(url: string, options?: RequestInit) {
    const response = await fetch(`api/${url}`, options);
    if (response.ok) {
      const data = (await response.json()) as ResponseDTO<T>;
      return data.data;
    }
    return null;
  }

  return {
    fetchData,
  };
}
