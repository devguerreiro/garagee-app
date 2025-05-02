import { NextRequest, NextResponse } from "next/server";

import { TowerListDTO } from "@/app/dtos";

import fetchWrapper from "@/lib/fetch";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const building = params.get("building");
  const url = `register/building/${building}/tower`;
  const response = await fetchWrapper<TowerListDTO>(url);
  return NextResponse.json(response);
}
