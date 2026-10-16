"use client";
import { useState, FormEvent } from "react";
import Reveal from "@/components/ui/Reveal";
import Link from "next/link";

type Role = "estudiante" | "profesor";

const TERMINOS_TEXT = `REGLAMENTO INTERNO Y TÉRMINOS DE INSCRIPCIÓN
COLEGIO ADVENTISTA SIERRA MAESTRA (CASM)

1. De la Misión Institucional:
El Colegio Adventista Sierra Maestra tiene como misión ofrecer una educación cristiana e integral, fortaleciendo principios espirituales, morales, cívicos y de excelencia académica para la formación de ciudadanos comprometidos con Dios y la sociedad.

2. Deberes del Representante y Estudiante:
a) Asistir puntualmente a las actividades académicas programadas.
b) Portar el uniforme reglamentario con pulcritud y decoro.
c) Mantener una conducta respetuosa hacia docentes, personal administrativo y compañeros.
d) Cumplir con los plazos de entrega de evaluaciones y actividades formativas.

3. Del Proceso de Admisión e Inscripción:
a) El envío de la solicitud de inscripción no garantiza el cupo de forma automática.
b) La Dirección y Administración del plantel revisarán la documentación consignada y notificarán la aprobación oficial.
c) Toda información suministrada en este portal tiene carácter de declaración jurada.

4. Tratamiento de Datos:
La información personal de los alumnos y representantes será tratada con estricta confidencialidad para fines exclusivamente académicos y administrativos del CASM.`;

export default function Registro() {
  const [role, setRole] = useState<Role>("estudiante");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [verModalTerminos, setVerModalTerminos] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!aceptaTerminos) {
      setErrorMessage("Debes aceptar los Términos y Condiciones del CASM para continuar.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    payload.terminosAceptados = "true";

    try {
      const res = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, data: payload }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("ok");
        setSuccessMessage(data.message || "Solicitud procesada con éxito.");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Ocurrió un error al procesar el registro.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Error de conexión al enviar el registro.");
    }
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <Reveal>
        <div className="mb-2 inline-block rounded-full bg-[#FFE58A]/30 px-3 py-1 text-xs font-bold text-[#1f2937]">
          Proceso Oficial de Admisión
        </div>
        <h1 className="mb-4 text-3xl md:text-4xl font-extrabold text-[#111827]" style={{ fontFamily: "var(--font-title)" }}>
          Registro de Solicitud Escolar
        </h1>
        <p className="mb-8 text-sm text-[#4b5563]">
          Ingresa los datos para solicitar tu inscripción en el Colegio Adventista Sierra Maestra. Tu solicitud será revisada y activada por el Administrador.
        </p>
      </Reveal>

      {status === "ok" ? (
        <Reveal>
          <div className="rounded-2xl border border-green-200 bg-white p-8 shadow-sm text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Solicitud de Inscripción Radicada!</h2>
            <p className="text-gray-600 max-w-lg mx-auto mb-6 text-sm">
              {successMessage}
            </p>
            <div className="rounded-lg bg-blue-50 border border-blue-100 p-4 mb-6 text-left text-xs text-blue-900">
              <p className="font-semibold mb-1">ℹ️ Próximos pasos:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>El personal administrativo verificará los datos suministrados.</li>
                <li>Una vez aprobada tu cuenta, podrás iniciar sesión con tu cédula en el portal para consultar tu boletín de notas y horarios.</li>
              </ul>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/login" className="fx-btn rounded-lg bg-[--primary] px-6 py-2.5 font-bold text-white">
                Ir a Ingresar
              </Link>
              <Link href="/" className="fx-btn rounded-lg border border-black/15 bg-white px-5 py-2.5 font-semibold text-gray-700 hover:bg-gray-50">
                Volver al Inicio
              </Link>
            </div>
          </div>
        </Reveal>
      ) : (
        <>
          <Reveal>
            <div className="mb-6 grid gap-3 sm:grid-cols-2">
              <label
                className={`relative cursor-pointer rounded-xl border p-4 pl-5 bg-white transition-all ${
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
                {role === "estudiante" && (
                  <>
                    <span className="absolute left-0 top-0 h-full w-1.5 bg-[--primary] rounded-l" aria-hidden="true" />
                    <span className="absolute right-3 top-3 text-[#111827]">
                      <IconCheck className="h-5 w-5" />
                    </span>
                  </>
                )}
                <div className="flex items-center gap-3">
                  <IconEstudiante className="h-6 w-6 text-[--primary]" />
                  <div>
                    <div className="font-semibold text-[#111827]">Estudiante / Representante</div>
                    <div className="text-xs text-[#4b5563]">Solicitud de inscripción de alumno</div>
                  </div>
                </div>
              </label>

              <label
                className={`relative cursor-pointer rounded-xl border p-4 pl-5 bg-white transition-all ${
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
                {role === "profesor" && (
                  <>
                    <span className="absolute left-0 top-0 h-full w-1.5 bg-[--primary] rounded-l" aria-hidden="true" />
                    <span className="absolute right-3 top-3 text-[#111827]">
                      <IconCheck className="h-5 w-5" />
                    </span>
                  </>
                )}
                <div className="flex items-center gap-3">
                  <IconProfesor className="h-6 w-6 text-[--primary]" />
                  <div>
                    <div className="font-semibold text-[#111827]">Personal Docente</div>
                    <div className="text-xs text-[#4b5563]">Registro de profesor</div>
                  </div>
                </div>
              </label>
            </div>
          </Reveal>

          {status === "error" && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700 flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={onSubmit} className="rounded-2xl border border-black/10 bg-white p-6 md:p-8 text-[#111827] shadow-sm">
            <div className="mb-6 flex items-center justify-between border-b border-black/10 pb-3">
              <h2 className="text-lg font-bold text-[#111827]">
                {role === "estudiante" ? "Datos del Estudiante y Representante" : "Datos del Profesor"}
              </h2>
              <span className="text-xs text-red-600 font-medium">* Campos requeridos</span>
            </div>

            {role === "estudiante" ? <EstudianteFields /> : <ProfesorFields />}

            {/* TÉRMINOS Y CONDICIONES OBLIGATORIOS */}
            <div className="mt-8 rounded-xl bg-gray-50 p-4 border border-gray-200">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terminos"
                  checked={aceptaTerminos}
                  onChange={(e) => setAceptaTerminos(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-[--primary] focus:ring-[--primary] cursor-pointer"
                  required
                />
                <label htmlFor="terminos" className="text-xs text-gray-700 leading-relaxed cursor-pointer">
                  He leído, comprendo y acepto los{" "}
                  <button
                    type="button"
                    onClick={() => setVerModalTerminos(true)}
                    className="font-bold text-[--primary] underline hover:opacity-80"
                  >
                    Términos, Condiciones y Reglamento Interno
                  </button>{" "}
                  del Colegio Adventista Sierra Maestra. Declaro bajo juramento que los datos suministrados son fidedignos.
                </label>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-5 sm:flex-row">
              <Link href="/login" className="text-xs text-gray-600 hover:text-[--primary]">
                ¿Ya tienes cuenta activa? <strong className="underline">Inicia sesión aquí</strong>
              </Link>
              <button
                type="submit"
                disabled={status === "loading"}
                className="fx-btn rounded-lg bg-[#FFE58A] px-8 py-3 font-bold text-[#1f2937] ring-1 ring-black/10 shadow hover:brightness-95 disabled:opacity-50"
              >
                {status === "loading" ? "Procesando solicitud..." : "Enviar Solicitud"}
              </button>
            </div>
          </form>
        </>
      )}

      {/* MODAL DE TÉRMINOS Y CONDICIONES */}
      {verModalTerminos && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "var(--font-title)" }}>
                Términos y Reglamento Institucional CASM
              </h3>
              <button
                onClick={() => setVerModalTerminos(false)}
                className="h-8 w-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>
            <div className="prose prose-sm max-w-none text-xs text-gray-700 leading-relaxed whitespace-pre-wrap font-sans bg-gray-50 p-4 rounded-lg border">
              {TERMINOS_TEXT}
            </div>
            <div className="mt-5 flex justify-end gap-3 border-t pt-4">
              <button
                type="button"
                onClick={() => {
                  setAceptaTerminos(true);
                  setVerModalTerminos(false);
                }}
                className="rounded-lg bg-[--primary] px-5 py-2 text-xs font-bold text-white hover:opacity-90"
              >
                Aceptar Términos y Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Field({ label, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="grid gap-1 text-xs text-[#111827]">
      <span className="font-semibold">
        {label}
        {rest.required ? <span className="ml-1 text-red-600">*</span> : null}
      </span>
      <input
        {...rest}
        className="rounded-lg border border-black/15 p-2.5 text-sm focus:border-[--primary] focus:outline-none focus:ring-1 focus:ring-[--primary]"
      />
    </label>
  );
}

function EstudianteFields() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Nombres del Estudiante" name="nombres" placeholder="Ej. Carlos Eduardo" required />
      <Field label="Apellidos del Estudiante" name="apellidos" placeholder="Ej. Mendoza Silva" required />
      <Field label="Cédula de Identidad o Escolar" name="cedula" placeholder="Ej. V-31222333" required />
      <Field label="Fecha de Nacimiento" name="fechaNacimiento" type="date" required />

      <label className="grid gap-1 text-xs text-[#111827]">
        <span className="font-semibold">Grado / Año que Cursará <span className="text-red-600">*</span></span>
        <select name="grado" className="form-select w-full rounded-lg border border-black/15 p-2.5 text-sm" required>
          <option value="1° Año">1° Año de Educación Media</option>
          <option value="2° Año">2° Año de Educación Media</option>
          <option value="3° Año">3° Año de Educación Media</option>
          <option value="4° Año">4° Año de Educación Media</option>
          <option value="5° Año">5° Año de Educación Media</option>
          <option value="Primaria">Educación Primaria</option>
          <option value="Inicial">Educación Inicial</option>
        </select>
      </label>

      <label className="grid gap-1 text-xs text-[#111827]">
        <span className="font-semibold">Turno Preferente <span className="text-red-600">*</span></span>
        <select name="turno" className="form-select w-full rounded-lg border border-black/15 p-2.5 text-sm" required>
          <option value="Mañana">Turno Mañana (7:00 AM - 1:00 PM)</option>
          <option value="Tarde">Turno Tarde (1:00 PM - 6:00 PM)</option>
        </select>
      </label>

      <Field label="Correo Electrónico de Contacto" name="email" type="email" placeholder="contacto@ejemplo.com" required />
      <Field label="Nombre del Representante Legal" name="nombreRepresentante" placeholder="Ej. Carmen de Mendoza" required />
      <Field label="Teléfono del Representante" name="telefonoRepresentante" placeholder="Ej. +58 412-1234567" required />
      <Field label="Dirección de Habitación" name="direccion" placeholder="Ej. Urb. San Francisco, Calle 12" />
    </div>
  );
}

function ProfesorFields() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Nombres" name="nombres" required />
      <Field label="Apellidos" name="apellidos" required />
      <Field label="Cédula de Identidad" name="cedula" placeholder="V-12345678" required />
      <Field label="Título Docente / Especialidad" name="titulo" placeholder="Ej. Lic. en Educación mención Física" required />
      <Field label="Asignaturas que Dicta" name="asignaturas" placeholder="Ej. Física, Matemática" className="sm:col-span-2 rounded-lg border border-black/15 p-2.5 text-sm" required />
      <Field label="Correo Institucional / Personal" name="email" type="email" required />
      <Field label="Teléfono de Contacto" name="telefono" required />
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
