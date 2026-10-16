"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [role, setRole] = useState<"estudiante" | "profesor" | "admin">("estudiante");
  const [id, setId] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, id }),
    });
    if (res.ok) {
      router.push(`/${role}`);
    }
  };

  return (
    <section className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-[--primary]" style={{ fontFamily: "var(--font-title)" }}>
        Ingresar
      </h1>
      <form onSubmit={onSubmit} className="space-y-4 rounded-lg border border-black/10 p-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Rol</label>
          <div className="relative">
            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value as "estudiante" | "profesor" | "admin")
              }
              className="form-select w-full"
            >
              <option value="estudiante">Estudiante</option>
              <option value="profesor">Profesor</option>
              <option value="admin">Administrador</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#111827]">▾</span>
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Cédula/ID</label>
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full rounded border border-black/10 p-2"
            placeholder="V-12345678"
            required
          />
        </div>
        <button
          type="submit"
          className="fx-btn w-full rounded bg-[--primary] px-4 py-2 font-semibold text-white"
        >
          Entrar
        </button>
      </form>
      <p className="mt-3 text-xs text-[--muted-foreground]">
        Demo: autenticación de prueba que asigna un rol por sesión.
      </p>
    </section>
  );
}
