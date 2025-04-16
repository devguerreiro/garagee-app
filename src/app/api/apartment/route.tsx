import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const tower = params.get("tower");
  const url = `register/tower/${tower}/apartment`;
  return await fetch(url);
}
