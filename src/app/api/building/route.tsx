import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const name = params.get("name");
  const url = `register/building?name=${name}`;
  return await fetch(url);
}
