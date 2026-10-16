import Link from "next/link";
import { cookies } from "next/headers";
import { profesores, estudiantes } from "@/lib/mock";

export default async function ProfesorPanel() {
  const c = await cookies();
  const id = c.get("userId")?.value ?? "";
  const prof = profesores.find((p) => p.cedula === id) ?? profesores[0];
  const listado = estudiantes.filter((e) =>
    prof.gradosSecciones.some((gs) => gs.grado === e.grado && gs.seccion === e.seccion)
  );

  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[--primary]" style={{ fontFamily: "var(--font-title)" }}>
          Panel de Profesor
        </h1>
        <form action="/api/logout" method="post">
          <button className="fx-btn rounded bg-[--accent] px-3 py-1.5 font-semibold text-black">Salir</button>
        </form>
      </div>

      <div className="rounded-lg border border-black/10 p-4">
        <h2 className="mb-2 text-lg font-semibold">Perfil</h2>
        <ul className="text-sm text-[--muted-foreground]">
          <li><strong>Nombres:</strong> {prof.nombres}</li>
          <li><strong>Apellidos:</strong> {prof.apellidos}</li>
          <li><strong>Cédula:</strong> {prof.cedula}</li>
          <li><strong>Título:</strong> {prof.titulo}</li>
          <li><strong>Asignaturas:</strong> {prof.asignaturas.join(", ")}</li>
        </ul>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-black/10 p-4">
          <h2 className="mb-2 text-lg font-semibold">Listado de Alumnos</h2>
          <table className="w-full text-sm">
            <thead className="bg-[--muted]">
              <tr>
                <th className="p-2 text-left">Cédula</th>
                <th className="p-2 text-left">Nombres</th>
                <th className="p-2 text-left">Grado/Sección</th>
              </tr>
            </thead>
            <tbody>
              {listado.map((e) => (
                <tr key={e.id} className="border-t">
                  <td className="p-2">{e.cedula}</td>
                  <td className="p-2">
                    {e.nombres} {e.apellidos}
                  </td>
                  <td className="p-2">
                    {e.grado} {e.seccion}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-lg border border-black/10 p-4">
          <h2 className="mb-2 text-lg font-semibold">Carga de Notas</h2>
          <form className="grid gap-3">
            <select className="form-select w-full">
              {listado.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.nombres} {e.apellidos}
                </option>
              ))}
            </select>
            <input className="rounded border border-black/10 p-2" placeholder="Asignatura" />
            <input className="rounded border border-black/10 p-2" placeholder="Lapso (I/II/III)" />
            <input type="number" className="rounded border border-black/10 p-2" placeholder="Calificación" />
            <button type="button" className="fx-btn rounded bg-[--primary] px-4 py-2 font-semibold text-white">
              Guardar (demo)
            </button>
          </form>
          <p className="mt-2 text-xs text-[--muted-foreground]">Demostración sin persistencia.</p>
        </div>
      </div>

      <div className="mt-6 text-sm">
        <Link className="text-[--primary] underline" href="/">Volver al inicio</Link>
      </div>
    </section>
  );
}
