import { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return <div className="rounded-xl border border-black/10 bg-white p-5 shadow-sm">{children}</div>;
}

export function CardHeader({ children }: { children: ReactNode }) {
  return <div className="mb-2 text-lg font-semibold">{children}</div>;
}

export function CardContent({ children }: { children: ReactNode }) {
  return <div className="text-sm text-[--muted-foreground]">{children}</div>;
}
