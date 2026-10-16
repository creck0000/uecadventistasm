"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import {
  Zap,
  ArrowRight,
  AlertCircle,
  Shield,
  GraduationCap,
  Users2,
  Lock,
  Sparkles,
} from "lucide-react";

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
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200 px-3.5 py-1 text-xs font-bold mb-2.5 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          Portal Institucional CASM
        </span>
        <h1 className="mb-2 text-3xl md:text-4xl font-black text-[#0f172a]" style={{ fontFamily: "var(--font-title)" }}>
          Iniciar Sesión
        </h1>
        <p className="mb-6 text-sm text-gray-600 font-medium">
          Ingresa con tu Cédula de Identidad o ID según tu rol asignado.
        </p>
      </Reveal>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-700 leading-relaxed flex items-start gap-2.5 shadow-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" />
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
              className="form-select w-full text-sm font-medium pr-10"
            >
              <option value="estudiante">Estudiante / Representante</option>
              <option value="profesor">Personal Docente (Profesor)</option>
              <option value="admin">Administrador General</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#111827]">
            {role === "admin" ? "Cédula o Usuario Admin" : "Cédula de Identidad / Escolar"}
          </label>
          <div className="relative">
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full rounded-lg border border-black/15 p-2.5 pl-3 text-sm focus:border-[--primary] focus:outline-none focus:ring-1 focus:ring-[--primary]"
              placeholder={role === "admin" ? "V-00000001 o admin" : "Ej. V-12345678"}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="fx-btn inline-flex items-center justify-center gap-2 w-full rounded-lg bg-[--primary] px-4 py-3 font-bold text-white shadow hover:opacity-95 disabled:opacity-50 cursor-pointer text-sm"
        >
          <Lock className="w-4 h-4" />
          <span>{loading ? "Comprobando credenciales..." : "Entrar al Sistema"}</span>
        </button>

        <div className="pt-2 text-center text-xs text-gray-500">
          ¿Nuevo estudiante o representante?{" "}
          <Link href="/registro" className="font-bold text-[--primary] underline">
            Solicitar inscripción aquí
          </Link>
        </div>
      </form>

      {/* Cuentas de Acceso Rápido / Demo */}
      <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-xs text-gray-700 shadow-sm">
        <div className="flex items-center gap-1.5 font-bold text-gray-800 mb-2.5">
          <Zap className="w-4 h-4 text-amber-500" />
          <span>Cuentas para pruebas rápidas:</span>
        </div>
        <div className="grid gap-2">
          <button
            type="button"
            onClick={() => setTestAccount("admin", "V-00000001")}
            className="text-left p-2.5 rounded-xl bg-white border border-gray-200 hover:border-[--primary] hover:bg-blue-50/50 transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-600" />
              <span><strong>Administrador:</strong> <code className="bg-gray-100 px-1 py-0.5 rounded text-[11px]">V-00000001</code></span>
            </div>
            <span className="text-[--primary] font-semibold flex items-center gap-1 text-[11px] group-hover:translate-x-0.5 transition-transform">
              Usar <ArrowRight className="w-3 h-3" />
            </span>
          </button>
          <button
            type="button"
            onClick={() => setTestAccount("profesor", "V-87654321")}
            className="text-left p-2.5 rounded-xl bg-white border border-gray-200 hover:border-[--primary] hover:bg-blue-50/50 transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Users2 className="w-4 h-4 text-emerald-600" />
              <span><strong>Profesor:</strong> José Pérez (<code className="bg-gray-100 px-1 py-0.5 rounded text-[11px]">V-87654321</code>)</span>
            </div>
            <span className="text-[--primary] font-semibold flex items-center gap-1 text-[11px] group-hover:translate-x-0.5 transition-transform">
              Usar <ArrowRight className="w-3 h-3" />
            </span>
          </button>
          <button
            type="button"
            onClick={() => setTestAccount("estudiante", "V-12345678")}
            className="text-left p-2.5 rounded-xl bg-white border border-gray-200 hover:border-[--primary] hover:bg-blue-50/50 transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span><strong>Estudiante:</strong> María González (<code className="bg-gray-100 px-1 py-0.5 rounded text-[11px]">V-12345678</code>)</span>
            </div>
            <span className="text-[--primary] font-semibold flex items-center gap-1 text-[11px] group-hover:translate-x-0.5 transition-transform">
              Usar <ArrowRight className="w-3 h-3" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
