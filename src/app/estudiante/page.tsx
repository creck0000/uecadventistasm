import Link from "next/link";
import { cookies } from "next/headers";
import { estudiantes } from "@/lib/mock";

export default async function EstudiantePanel() {
  const c = await cookies();
  const id = c.get("userId")?.value ?? "";
  const est = estudiantes.find((e) => e.cedula === id) ?? estudiantes[0];
  const promedio =
    est.notas.length > 0
      ? (est.notas.reduce((a, n) => a + n.calificacion, 0) / est.notas.length).toFixed(2)
      : "N/A";

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[--primary]" style={{ fontFamily: "var(--font-title)" }}>
          Panel de Estudiante
        </h1>
        <form action="/api/logout" method="post">
          <button className="fx-btn rounded bg-[--accent] px-3 py-1.5 font-semibold text-black">Salir</button>
        </form>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-black/10 p-4 md:col-span-1">
          <h2 className="mb-2 text-lg font-semibold">Perfil</h2>
          <ul className="text-sm text-[--muted-foreground]">
            <li><strong>Nombres:</strong> {est.nombres}</li>
            <li><strong>Apellidos:</strong> {est.apellidos}</li>
            <li><strong>Cédula:</strong> {est.cedula}</li>
            <li><strong>Fecha de Nac.:</strong> {est.fechaNacimiento}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-black/10 p-4 md:col-span-2">
          <h2 className="mb-2 text-lg font-semibold">Académico</h2>
          <ul className="text-sm text-[--muted-foreground]">
            <li><strong>Grado:</strong> {est.grado}</li>
            <li><strong>Sección:</strong> {est.seccion}</li>
            <li><strong>Turno:</strong> {est.turno}</li>
            <li><strong>Promedio General:</strong> {promedio}</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-black/10 p-4">
        <h2 className="mb-2 text-lg font-semibold">Tabla de Notas</h2>
        <table className="w-full text-sm">
          <thead className="bg-[--muted]">
            <tr>
              <th className="p-2 text-left">Lapso</th>
              <th className="p-2 text-left">Asignatura</th>
              <th className="p-2 text-left">Calificación</th>
            </tr>
          </thead>
          <tbody>
            {est.notas.map((n, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{n.lapso}</td>
                <td className="p-2">{n.asignatura}</td>
                <td className="p-2">{n.calificacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-black/10 p-4">
        <h2 className="mb-2 text-lg font-semibold">Asistencia</h2>
        <ul className="text-sm text-[--muted-foreground]">
          {est.asistencia.map((a, i) => (
            <li key={i} className="border-t py-1 first:border-0">
              {a.fecha}: {a.presente ? "Presente" : "Ausente"}
            </li>
          ))}
        </ul>
        </div>
        <div className="rounded-lg border border-black/10 p-4">
          <h2 className="mb-2 text-lg font-semibold">Accesos Rápidos</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <a className="fx-btn rounded bg-[--primary] px-4 py-3 text-center font-semibold text-white" href="/oferta-academica">Oferta</a>
            <a className="fx-btn rounded border border-black/10 px-4 py-3 text-center font-semibold hover:bg-[--muted]" href="/contacto">Contacto</a>
          </div>
        </div>
      </div>

      <div className="mt-6 text-sm">
        <Link className="text-[--primary] underline" href="/">Volver al inicio</Link>
      </div>
    </section>
  );
}
