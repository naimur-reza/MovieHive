"use client";

import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

export default function DynamicSearchParams({
  children,
}: {
  children: ReactNode;
}) {
  useSearchParams();
  return <>{children}</>;
}
