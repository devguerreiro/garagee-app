import { NextRequest, NextResponse } from "next/server";

import { BuildingListDTO } from "@/app/dtos";

import fetchWrapper from "@/lib/fetch";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const name = params.get("name");
  const url = `register/building?name=${name}`;
  const response = await fetchWrapper<BuildingListDTO>(url);
  return NextResponse.json(response);
}
