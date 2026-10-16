import Link from "next/link";
import { cookies } from "next/headers";
import { db } from "@/lib/dataStore";
import {
  User,
  BookOpen,
  GraduationCap,
  Mail,
  Users2,
  Info,
  LogOut,
} from "lucide-react";

export default async function ProfesorPanel() {
  const c = await cookies();
  const id = c.get("userId")?.value ?? "";
  
  const profesores = db.getProfesores();
  const prof = profesores.find((p) => p.cedula.toLowerCase() === id.toLowerCase()) || profesores[0];
  const estudiantes = db.getEstudiantes();

  if (!prof) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="text-xl font-bold text-gray-800">Docente no encontrado</h1>
        <Link href="/login" className="mt-4 inline-block rounded-lg bg-[--primary] px-4 py-2 text-white text-xs font-bold">
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  const listado = estudiantes.filter((e) =>
    prof.gradosSecciones.some((gs) => gs.grado === e.grado)
  );

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      {/* Encabezado */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b pb-4">
        <div>
          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-bold text-[--primary]">
            Portal del Docente
          </span>
          <h1 className="mt-1 text-2xl md:text-3xl font-extrabold text-[#111827]" style={{ fontFamily: "var(--font-title)" }}>
            Panel de Profesorado
          </h1>
          <p className="text-xs text-gray-500">
            Colegio Adventista Sierra Maestra • Gestión de Cursos y Estudiantes
          </p>
        </div>

        <form action="/api/logout" method="post">
          <button className="fx-btn inline-flex items-center gap-1.5 rounded-lg bg-gray-100 hover:bg-red-50 hover:text-red-600 px-4 py-2 text-xs font-bold text-gray-700 transition-all border border-gray-200 cursor-pointer">
            <LogOut className="w-3.5 h-3.5" />
            <span>Cerrar Sesión</span>
          </button>
        </form>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {/* Perfil del Profesor */}
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm md:col-span-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-gray-400 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Perfil Académico</span>
              <User className="w-4 h-4 text-gray-400" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">{prof.nombres} {prof.apellidos}</h2>
            <div className="text-xs font-mono font-bold text-[--primary] mb-4">{prof.cedula}</div>
            <div className="text-xs text-gray-600 space-y-2 pt-3 border-t">
              <div className="flex items-start gap-2">
                <GraduationCap className="w-4 h-4 text-[--primary] flex-shrink-0 mt-0.5" />
                <span><strong>Especialidad:</strong> {prof.titulo}</span>
              </div>
              <div className="flex items-start gap-2">
                <BookOpen className="w-4 h-4 text-[--primary] flex-shrink-0 mt-0.5" />
                <span><strong>Asignaturas:</strong> {prof.asignaturas.join(", ")}</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[--primary] flex-shrink-0 mt-0.5" />
                <span><strong>Correo:</strong> {prof.email || "No registrado"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cursos y Secciones */}
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm md:col-span-2">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Grados y Secciones a Cargo</span>
            <Users2 className="w-4 h-4 text-gray-400" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 mt-3">
            {prof.gradosSecciones.map((gs, idx) => (
              <div key={idx} className="rounded-xl border border-blue-100 bg-blue-50/50 p-3.5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-[--primary]">{gs.grado}</div>
                  <div className="text-xs text-gray-500">Sección &quot;{gs.seccion}&quot;</div>
                </div>
                <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-gray-700 shadow-sm border">
                  Activo
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <strong>Políticas de Calificaciones CASM:</strong> La carga, edición y publicación final de actas y calificaciones oficiales de los estudiantes es gestionada de forma centralizada por el <strong>Panel de Administración General</strong>.
            </div>
          </div>
        </div>
      </div>

      {/* Listado de Alumnos */}
      <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-3 gap-2">
          <div>
            <h2 className="text-base font-bold text-gray-900">Nómina de Alumnos en tus Asignaturas</h2>
            <p className="text-xs text-gray-500">Estudiantes regulares pertenecientes a tus secciones asignadas.</p>
          </div>
          <div className="rounded-lg bg-gray-50 px-3 py-1 text-xs text-gray-600 border">
            Total alumnos: <strong>{listado.length}</strong>
          </div>
        </div>

        {listado.length === 0 ? (
          <div className="p-8 text-center text-xs text-gray-500 bg-gray-50 rounded-xl">
            No hay alumnos inscritos en tus secciones en este momento.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-100 text-gray-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5 text-left rounded-l">Cédula</th>
                  <th className="p-2.5 text-left">Nombres y Apellidos</th>
                  <th className="p-2.5 text-left">Grado y Sección</th>
                  <th className="p-2.5 text-left">Turno</th>
                  <th className="p-2.5 text-center">Notas Asentadas</th>
                  <th className="p-2.5 text-right rounded-r">Representante</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {listado.map((e) => (
                  <tr key={e.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-2.5 font-mono font-bold text-[--primary]">{e.cedula}</td>
                    <td className="p-2.5 font-bold text-gray-900">{e.nombres} {e.apellidos}</td>
                    <td className="p-2.5 text-gray-600">{e.grado} - Sec. {e.seccion}</td>
                    <td className="p-2.5 text-gray-500">{e.turno}</td>
                    <td className="p-2.5 text-center font-bold text-[--primary]">
                      {e.notas ? e.notas.length : 0} registradas
                    </td>
                    <td className="p-2.5 text-right text-gray-600">
                      <div>{e.nombreRepresentante || "—"}</div>
                      <div className="text-[10px] text-gray-400">{e.telefonoRepresentante || ""}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-8 text-xs text-gray-500 flex items-center justify-between border-t pt-4">
        <span>© {new Date().getFullYear()} Colegio Adventista Sierra Maestra • Sistema Académico</span>
        <Link className="text-[--primary] font-semibold underline" href="/">
          Volver a la Página Principal
        </Link>
      </div>
    </section>
  );
}
