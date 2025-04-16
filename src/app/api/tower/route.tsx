import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const building = params.get("building");
  const url = `register/building/${building}/tower`;
  return await fetch(url);
}
