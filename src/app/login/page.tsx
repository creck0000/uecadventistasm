"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export default function Login() {
  const router = useRouter();
  const [role, setRole] = useState<"estudiante" | "profesor" | "admin">("estudiante");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, id }),
      });
      const data = await res.json();

      if (res.ok) {
        router.push(`/${role}`);
        router.refresh();
      } else {
        setError(data.error || "No fue posible iniciar sesión. Verifica los datos.");
      }
    } catch {
      setError("Error de conexión con el servidor escolar.");
    } finally {
      setLoading(false);
    }
  };

  const setTestAccount = (testRole: "estudiante" | "profesor" | "admin", testId: string) => {
    setRole(testRole);
    setId(testId);
    setError("");
  };

  return (
    <section className="mx-auto max-w-md px-4 py-12">
      <Reveal>
        <div className="mb-2 inline-block rounded-full bg-[#FFE58A]/30 px-3 py-1 text-xs font-bold text-[#1f2937]">
          Portal Institucional CASM
        </div>
        <h1 className="mb-2 text-3xl font-extrabold text-[#111827]" style={{ fontFamily: "var(--font-title)" }}>
          Iniciar Sesión
        </h1>
        <p className="mb-6 text-sm text-[#4b5563]">
          Ingresa con tu Cédula de Identidad o ID según tu rol asignado.
        </p>
      </Reveal>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-700 leading-relaxed flex items-start gap-2.5">
          <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>{error}</div>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-black/10 bg-white p-6 md:p-8 shadow-sm">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#111827]">Selecciona tu Rol</label>
          <div className="relative">
            <select
              value={role}
              onChange={(e) => {
                setRole(e.target.value as "estudiante" | "profesor" | "admin");
                setError("");
              }}
              className="form-select w-full text-sm font-medium"
            >
              <option value="estudiante">Estudiante / Representante</option>
              <option value="profesor">Personal Docente (Profesor)</option>
              <option value="admin">Administrador General</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#111827]">▾</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#111827]">
            {role === "admin" ? "Cédula o Usuario Admin" : "Cédula de Identidad / Escolar"}
          </label>
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full rounded-lg border border-black/15 p-2.5 text-sm focus:border-[--primary] focus:outline-none focus:ring-1 focus:ring-[--primary]"
            placeholder={role === "admin" ? "V-00000001 o admin" : "Ej. V-12345678"}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="fx-btn w-full rounded-lg bg-[--primary] px-4 py-3 font-bold text-white shadow hover:opacity-95 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Comprobando credenciales..." : "Entrar al Sistema"}
        </button>

        <div className="pt-2 text-center text-xs text-gray-500">
          ¿Nuevo estudiante o representante?{" "}
          <Link href="/registro" className="font-bold text-[--primary] underline">
            Solicitar inscripción aquí
          </Link>
        </div>
      </form>

      {/* Cuentas de Acceso Rápido / Demo */}
      <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4 text-xs text-gray-700">
        <p className="font-bold text-gray-800 mb-2">⚡ Cuentas para pruebas rápidas:</p>
        <div className="grid gap-2">
          <button
            type="button"
            onClick={() => setTestAccount("admin", "V-00000001")}
            className="text-left p-2 rounded bg-white border border-gray-200 hover:border-[--primary] hover:bg-blue-50/50 transition-all flex items-center justify-between"
          >
            <span><strong>Administrador:</strong> Cédula: <code className="bg-gray-100 px-1 rounded">V-00000001</code></span>
            <span className="text-[--primary] font-semibold">Usar ➔</span>
          </button>
          <button
            type="button"
            onClick={() => setTestAccount("profesor", "V-87654321")}
            className="text-left p-2 rounded bg-white border border-gray-200 hover:border-[--primary] hover:bg-blue-50/50 transition-all flex items-center justify-between"
          >
            <span><strong>Profesor:</strong> José Pérez (<code className="bg-gray-100 px-1 rounded">V-87654321</code>)</span>
            <span className="text-[--primary] font-semibold">Usar ➔</span>
          </button>
          <button
            type="button"
            onClick={() => setTestAccount("estudiante", "V-12345678")}
            className="text-left p-2 rounded bg-white border border-gray-200 hover:border-[--primary] hover:bg-blue-50/50 transition-all flex items-center justify-between"
          >
            <span><strong>Estudiante:</strong> María González (<code className="bg-gray-100 px-1 rounded">V-12345678</code>)</span>
            <span className="text-[--primary] font-semibold">Usar ➔</span>
          </button>
        </div>
      </div>
    </section>
  );
}
