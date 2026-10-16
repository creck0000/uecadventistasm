"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo01 from "@/images/01.jpeg";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/oferta-academica", label: "Oferta Académica" },
  { href: "/admisiones", label: "Admisiones" },
  { href: "/registro", label: "Registro" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="border-b border-black/10 bg-white sticky top-0 z-40">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={logo01}
            width={40}
            height={40}
            alt="Colegio Adventista Sierra Maestra"
            className="h-9 w-9 rounded-md object-cover border border-black/10 shadow-sm"
          />
          <span
            className="text-xl font-black tracking-tight text-[#111827]"
            style={{ fontFamily: "var(--font-title)" }}
          >
            Colegio Adventista Sierra Maestra
          </span>
        </Link>
        <div className="hidden gap-5 md:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                className={
                  active
                    ? "text-[#111827] font-semibold"
                    : "text-[#111827] hover:opacity-80 transition-opacity"
                }
                href={l.href}
              >
                {l.label}
              </Link>
            );
          })}
          <Link className="fx-btn rounded bg-[--primary] px-4 py-2 text-white" href="/login">
            Ingresar
          </Link>
        </div>
        <button
          aria-label="Abrir menú"
          aria-expanded={open}
          className="inline-flex h-11 w-11 items-center justify-center rounded border border-[#111827]/30 bg-white hover:bg-black/5 transition-colors"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-6 w-7">
            <span
              className={`absolute left-0 top-0 h-[3px] w-full bg-[#111827] transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-3 h-[3px] w-full bg-[#111827] transition-opacity ${open ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute left-0 top-5 h-[3px] w-full bg-[#111827] transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </nav>
      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-black/30 backdrop-fade" onClick={() => setOpen(false)} />
          <div className="fixed right-0 top-0 z-50 h-full w-72 max-w-[85vw] bg-white text-[#2b2b2b] shadow-xl slide-in-right">
            <div className="flex items-center justify-between border-b border-black/10 px-4 h-16">
              <span className="text-[#111827] font-bold" style={{ fontFamily: "var(--font-title)" }}>Menú</span>
              <button className="h-9 w-9 rounded hover:bg-black/5" onClick={() => setOpen(false)} aria-label="Cerrar menú">✕</button>
            </div>
            <div className="flex flex-col gap-1 p-3">
              {links.map((l) => {
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    className={`rounded px-3 py-3 transition-colors ${active ? "bg-[--secondary] text-[#111827] font-semibold" : "hover:bg-black/5 text-[#111827]"}`}
                    href={l.href}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                );
              })}
              <Link className="fx-btn mt-2 rounded bg-[--primary] px-3 py-3 text-center text-white" href="/login" onClick={() => setOpen(false)}>
                Ingresar
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
