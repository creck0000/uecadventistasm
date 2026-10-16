import Link from "next/link";
import { estudiantes, profesores } from "@/lib/mock";

export default function AdminPanel() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[--primary]" style={{ fontFamily: "var(--font-title)" }}>
          Panel de Administrador
        </h1>
        <form action="/api/logout" method="post">
          <button className="rounded bg-[--accent] px-3 py-1.5 font-semibold text-black">Salir</button>
        </form>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-black/10 p-4">
          <h2 className="mb-2 text-lg font-semibold">Estudiantes</h2>
          <p className="text-sm text-[--muted-foreground]">Total: {estudiantes.length}</p>
        </div>
        <div className="rounded-lg border border-black/10 p-4">
          <h2 className="mb-2 text-lg font-semibold">Profesores</h2>
          <p className="text-sm text-[--muted-foreground]">Total: {profesores.length}</p>
        </div>
        <div className="rounded-lg border border-black/10 p-4">
          <h2 className="mb-2 text-lg font-semibold">Períodos</h2>
          <p className="text-sm text-[--muted-foreground]">I, II y III</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <a className="rounded-lg border border-black/10 p-4 hover:bg-[--muted]" href="#">
          Gestión de Usuarios
        </a>
        <a className="rounded-lg border border-black/10 p-4 hover:bg-[--muted]" href="#">
          Reportes
        </a>
        <a className="rounded-lg border border-black/10 p-4 hover:bg-[--muted]" href="#">
          Configuración
        </a>
      </div>

      <div className="mt-6 text-sm">
        <Link className="text-[--primary] underline" href="/">Volver al inicio</Link>
      </div>
    </section>
  );
}
