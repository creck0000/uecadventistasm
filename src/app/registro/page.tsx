"use client";
import { useState, FormEvent } from "react";
import Reveal from "@/components/ui/Reveal";

type Role = "estudiante" | "profesor";

export default function Registro() {
  const [role, setRole] = useState<Role>("estudiante");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, data: payload }),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <Reveal>
        <h1 className="mb-4 text-3xl font-bold text-[--foreground]" style={{ fontFamily: "var(--font-title)" }}>
          Registro
        </h1>
      </Reveal>
      <Reveal>
        <div className="mb-3 flex items-center gap-3 text-sm font-medium text-[--foreground]">
          <div className={`flex items-center gap-2 ${role ? "" : ""}`}>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[--primary] text-white text-[11px]">1</span>
            <span>Elige el tipo de cuenta</span>
          </div>
          <div className="h-px w-8 bg-[#cbd5e1]" />
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[--primary] text-white text-[11px]">2</span>
            <span>Completa tus datos</span>
          </div>
        </div>
      </Reveal>
      <Reveal>
        <div className="mb-1 text-base font-semibold text-[--foreground]">Tipo de registro</div>
        <div className="mb-3 text-base font-medium text-[--foreground]">Selecciona una opción para ver los campos correspondientes.</div>
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          <label
            className={`relative cursor-pointer rounded-lg border p-4 pl-5 bg-white transition-all ${
              role === "estudiante" ? "bg-[--highlight] border-black/20 shadow-sm" : "border-black/10 hover:bg-[--highlight]"
            }`}
          >
            <input
              type="radio"
              name="tipo"
              value="estudiante"
              checked={role === "estudiante"}
              onChange={() => setRole("estudiante")}
              className="sr-only"
            />
            {role === "estudiante" ? (
              <>
                <span className="absolute left-0 top-0 h-full w-1.5 bg-[--primary]" aria-hidden="true" />
                <span className="absolute right-3 top-3" aria-hidden="true">
                  <IconCheck className="h-5 w-5 text-[#111827]" />
                </span>
              </>
            ) : null}
            <div className="flex items-center gap-3">
              <IconEstudiante className="h-6 w-6 text-[--primary]" aria-hidden="true" />
              <div>
                <div className="font-semibold text-[#111827]">Estudiante</div>
                <div className="text-xs text-[#334155]">Registro de alumno</div>
              </div>
            </div>
          </label>
          <label
            className={`relative cursor-pointer rounded-lg border p-4 pl-5 bg-white transition-all ${
              role === "profesor" ? "bg-[--highlight] border-black/20 shadow-sm" : "border-black/10 hover:bg-[--highlight]"
            }`}
          >
            <input
              type="radio"
              name="tipo"
              value="profesor"
              checked={role === "profesor"}
              onChange={() => setRole("profesor")}
              className="sr-only"
            />
            {role === "profesor" ? (
              <>
                <span className="absolute left-0 top-0 h-full w-1.5 bg-[--primary]" aria-hidden="true" />
                <span className="absolute right-3 top-3" aria-hidden="true">
                  <IconCheck className="h-5 w-5 text-[#111827]" />
                </span>
              </>
            ) : null}
            <div className="flex items-center gap-3">
              <IconProfesor className="h-6 w-6 text-[--primary]" aria-hidden="true" />
              <div>
                <div className="font-semibold text-[#111827]">Profesor</div>
                <div className="text-xs text-[#334155]">Registro de profesor</div>
              </div>
            </div>
          </label>
        </div>
      </Reveal>

      {status === "ok" && (
        <div className="mb-4 rounded-lg border border-black/10 bg-white p-4 text-sm text-[#14532d]">
          Registro enviado. Esta es una demostración sin persistencia.
        </div>
      )}
      {status === "error" && (
        <div className="mb-4 rounded-lg border border-black/10 bg-white p-4 text-sm text-[#7f1d1d]">
          Ocurrió un error al enviar el registro.
        </div>
      )}

      <form onSubmit={onSubmit} className="rounded-lg border border-black/10 bg-white p-6 text-[#111827]">
        <div className="mb-4 text-lg font-semibold">{role === "estudiante" ? "Datos del Estudiante" : "Datos del Profesor"}</div>
        {role === "estudiante" ? <EstudianteFields /> : <ProfesorFields />}
        <div className="mt-6 border-t border-black/10 pt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="submit"
            className="fx-btn rounded bg-[--highlight] px-6 py-3 font-bold text-[#1f2937] ring-1 ring-black/10 shadow"
          >
            Registrarme
          </button>
          <a href="/login" className="fx-btn rounded bg-black/5 px-4 py-2 font-semibold hover:bg-black/10">
            Ya tengo cuenta
          </a>
        </div>
      </form>
    </section>
  );
}

function Field({ label, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="grid gap-1 text-sm text-[#111827]">
      <span className="font-semibold">
        {label}
        {rest.required ? <span className="ml-1 text-[#b91c1c]">*</span> : null}
      </span>
      <input {...rest} className="rounded border border-black/10 p-2" />
    </label>
  );
}

function EstudianteFields() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Field label="Nombres" name="nombres" required />
      <Field label="Apellidos" name="apellidos" required />
      <Field label="Cédula/ID" name="cedula" required />
      <Field label="Fecha de nacimiento" name="fechaNacimiento" type="date" />
      <Field label="Grado" name="grado" />
      <Field label="Sección" name="seccion" />
      <Field label="Correo" name="email" type="email" />
      <Field label="Teléfono" name="telefono" />
      <label className="sm:col-span-2 grid gap-1 text-sm">
        <span className="font-medium">Dirección</span>
        <input name="direccion" className="rounded border border-black/10 p-2" />
      </label>
    </div>
  );
}

function ProfesorFields() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Field label="Nombres" name="nombres" required />
      <Field label="Apellidos" name="apellidos" required />
      <Field label="Cédula/ID" name="cedula" required />
      <Field label="Título" name="titulo" />
      <Field label="Asignaturas" name="asignaturas" className="sm:col-span-2 rounded border border-black/10 p-2" />
      <Field label="Correo" name="email" type="email" />
      <Field label="Teléfono" name="telefono" />
    </div>
  );
}

function IconEstudiante(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 8l9-5 9 5-9 5-9-5z" />
      <path d="M21 8v6" />
      <path d="M12 13v8" />
      <path d="M6 18c3-2 9-2 12 0" />
    </svg>
  );
}

function IconProfesor(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M7 20h10" />
      <circle cx="9" cy="10" r="1.5" />
      <path d="M7.5 14a3.5 3.5 0 0 1 3 0" />
      <path d="M12 8h6" />
      <path d="M12 11h6" />
    </svg>
  );
}

function IconCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.2 13.3-3.3-3.3 1.4-1.4 1.9 1.9 4.6-4.6 1.4 1.4-6 6z" />
    </svg>
  );
}
