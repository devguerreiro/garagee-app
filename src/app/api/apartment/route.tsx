import { NextRequest, NextResponse } from "next/server";

import { ApartmentListDTO } from "@/app/dtos";

import fetchWrapper from "@/lib/fetch";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const tower = params.get("tower");
  const url = `register/tower/${tower}/apartment`;
  const response = await fetchWrapper<ApartmentListDTO>(url);
  return NextResponse.json(response);
}
