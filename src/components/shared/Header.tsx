"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import logo01 from "@/images/01.jpeg";
import {
  Menu,
  X,
  LogIn,
  Home,
  Info,
  BookOpen,
  GraduationCap,
  UserPlus,
  Phone,
} from "lucide-react";

const links = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/nosotros", label: "Nosotros", icon: Info },
  { href: "/oferta-academica", label: "Oferta Académica", icon: BookOpen },
  { href: "/admisiones", label: "Admisiones", icon: GraduationCap },
  { href: "/registro", label: "Registro", icon: UserPlus },
  { href: "/contacto", label: "Contacto", icon: Phone },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Bloquear scroll de fondo en móviles cuando el menú está abierto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  // Cerrar el menú automáticamente al cambiar de ruta
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="border-b border-black/10 bg-white sticky top-0 z-40 transition-all shadow-xs">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-4">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group min-w-0 mr-2">
            <Image
              src={logo01}
              width={40}
              height={40}
              alt="Colegio Adventista Sierra Maestra"
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg object-cover border border-black/10 shadow-xs shrink-0 transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col min-w-0">
              <span
                className="text-sm sm:text-base md:text-xl font-black tracking-tight text-[#111827] leading-tight truncate"
                style={{ fontFamily: "var(--font-title)" }}
              >
                Colegio Adventista Sierra Maestra
              </span>
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mt-0.5 hidden sm:block truncate">
                Maracaibo • Excelencia y Valores
              </span>
            </div>
          </Link>

          {/* Navegación de Escritorio */}
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

          {/* Botón Hamburguesa Móvil */}
          <button
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="md:hidden inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[--primary] cursor-pointer"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      {/* Menú Móvil Lateral (100% Opaco, fuera del flujo relativo) */}
      {open && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Fondo oscuro traslúcido */}
          <div
            className="fixed inset-0 bg-black/60 transition-opacity"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Panel Lateral con Fondo Blanco Sólido */}
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Menú de Navegación"
            className="fixed top-0 right-0 bottom-0 z-[101] w-[85%] max-w-xs bg-white text-gray-900 shadow-2xl flex flex-col justify-between h-[100dvh] overflow-y-auto"
            style={{ backgroundColor: "#ffffff" }}
          >
            <div>
              {/* Encabezado del Menú Móvil */}
              <div className="flex items-center justify-between border-b border-gray-100 px-5 h-16 bg-white shrink-0">
                <div className="flex items-center gap-2.5">
                  <Image
                    src={logo01}
                    width={32}
                    height={32}
                    alt="CASM"
                    className="h-8 w-8 rounded-md object-cover border border-black/10 shadow-xs"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-gray-900 leading-tight">CASM</span>
                    <span className="text-[10px] text-gray-400 font-semibold">Menú Principal</span>
                  </div>
                </div>
                <button
                  className="h-9 w-9 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors cursor-pointer border border-gray-200"
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar menú"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Enlaces de Navegación Móvil con Iconos */}
              <div className="flex flex-col gap-1 p-3 bg-white">
                {links.map((l) => {
                  const active = pathname === l.href;
                  const Icon = l.icon;
                  return (
                    <Link
                      key={l.href}
                      className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-all ${
                        active
                          ? "bg-blue-50 text-[--primary] font-bold border border-blue-100"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                      href={l.href}
                      onClick={() => setOpen(false)}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${active ? "text-[--primary]" : "text-gray-400"}`} />
                      <span>{l.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Botón de Acceso en Móvil */}
            <div className="p-4 border-t border-gray-100 bg-gray-50/80 shrink-0">
              <Link
                className="fx-btn flex items-center justify-center gap-2 rounded-xl bg-[--primary] px-4 py-3 text-center text-sm font-bold text-white shadow hover:opacity-95 transition-all w-full"
                href="/login"
                onClick={() => setOpen(false)}
              >
                <LogIn className="h-4 w-4" />
                <span>Ingresar al Portal</span>
              </Link>
              <p className="mt-2.5 text-center text-[11px] text-gray-400 font-medium">
                Colegio Adventista Sierra Maestra
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
