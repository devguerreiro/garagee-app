"use client";

import { useEffect, useState } from "react";

import { decodeTokenFromCookie } from "@/utils";

export function useCurrentUser(publicId: string) {
  const [isCurrentUser, setIsCurrentUser] = useState<boolean | null>(null);

  useEffect(() => {
    const decodedToken = decodeTokenFromCookie();
    setIsCurrentUser(decodedToken.sub === publicId);
  }, [publicId]);

  return { isCurrentUser };
}
