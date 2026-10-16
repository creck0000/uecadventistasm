"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo01 from "@/images/01.jpeg";
import { Menu, X, LogIn } from "lucide-react";

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
    <header className="border-b border-black/10 bg-white/95 backdrop-blur-md sticky top-0 z-40 transition-all shadow-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src={logo01}
            width={40}
            height={40}
            alt="Colegio Adventista Sierra Maestra"
            className="h-10 w-10 rounded-lg object-cover border border-black/10 shadow-sm transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span
              className="text-lg md:text-xl font-black tracking-tight text-[#111827] leading-none"
              style={{ fontFamily: "var(--font-title)" }}
            >
              Colegio Adventista Sierra Maestra
            </span>
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mt-0.5">
              Maracaibo • Excelencia y Valores
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1.5 lg:gap-3 md:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                className={`rounded-lg px-3 py-2 text-xs md:text-sm font-semibold transition-all ${
                  active
                    ? "bg-[--secondary]/20 text-[--primary] font-bold"
                    : "text-gray-700 hover:text-[--primary] hover:bg-gray-50"
                }`}
                href={l.href}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            className="fx-btn ml-2 inline-flex items-center gap-2 rounded-lg bg-[--primary] px-4 py-2 text-xs md:text-sm font-bold text-white shadow hover:opacity-95 transition-all"
            href="/login"
          >
            <LogIn className="h-4 w-4" />
            <span>Ingresar</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button - Strictly hidden on medium and large screens */}
        <button
          aria-label="Abrir menú"
          aria-expanded={open}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[--primary]"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setOpen(false)}
          />
          <div className="fixed right-0 top-0 z-50 h-full w-72 max-w-[85vw] bg-white text-[#2b2b2b] shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-black/10 px-5 h-16">
                <span className="text-[#111827] font-bold text-base" style={{ fontFamily: "var(--font-title)" }}>
                  Menú Principal
                </span>
                <button
                  className="h-8 w-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500"
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar menú"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col gap-1 p-4">
                {links.map((l) => {
                  const active = pathname === l.href;
                  return (
                    <Link
                      key={l.href}
                      className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                        active
                          ? "bg-[--secondary]/20 text-[--primary] font-bold"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                      href={l.href}
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="p-4 border-t border-gray-100">
              <Link
                className="fx-btn flex items-center justify-center gap-2 rounded-lg bg-[--primary] px-4 py-3 text-center text-sm font-bold text-white shadow w-full"
                href="/login"
                onClick={() => setOpen(false)}
              >
                <LogIn className="h-4 w-4" />
                <span>Ingresar al Portal</span>
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
