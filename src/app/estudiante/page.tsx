import Link from "next/link";
import { cookies } from "next/headers";
import { db } from "@/lib/dataStore";
import {
  Award,
  CheckCircle2,
  Clock,
  LogOut,
  GraduationCap,
  Calendar,
  User,
  ClipboardList,
  Check,
  X,
  FileText,
} from "lucide-react";

export default async function EstudiantePanel() {
  const c = await cookies();
  const id = c.get("userId")?.value ?? "";
  
  // Buscar en la base de datos persistente
  const estudiantes = await db.getEstudiantes();
  const est = estudiantes.find((e) => e.cedula.toLowerCase() === id.toLowerCase()) || estudiantes[0];

  if (!est) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="text-xl font-bold text-gray-800">No se encontró información del estudiante</h1>
        <p className="mt-2 text-sm text-gray-500">Inicia sesión nuevamente con tu cédula.</p>
        <Link href="/login" className="mt-4 inline-block rounded-lg bg-[--primary] px-4 py-2 text-white text-xs font-bold">
          Ir al Login
        </Link>
      </div>
    );
  }

  const notas = est.notas || [];
  const promedio =
    notas.length > 0
      ? (notas.reduce((a, n) => a + n.calificacion, 0) / notas.length).toFixed(2)
      : "S/N";

  const totalAsistencias = est.asistencia ? est.asistencia.length : 0;
  const asistenciasPresentes = est.asistencia ? est.asistencia.filter((a) => a.presente).length : 0;
  const porcentajeAsistencia = totalAsistencias > 0
    ? Math.round((asistenciasPresentes / totalAsistencias) * 100)
    : 100;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      {/* Encabezado */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-bold text-[--primary]">
              Portal del Alumno
            </span>
            <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[11px] font-bold text-green-800">
              ● Alumno Regular
            </span>
          </div>
          <h1 className="mt-1 text-2xl md:text-3xl font-extrabold text-[#111827]" style={{ fontFamily: "var(--font-title)" }}>
            Boletín y Consulta de Calificaciones
          </h1>
          <p className="text-xs text-gray-500">
            Colegio Adventista Sierra Maestra • Año Escolar 2025-2026
          </p>
        </div>

        <div className="flex items-center gap-3">
          <form action="/api/logout" method="post">
            <button className="fx-btn inline-flex items-center gap-1.5 rounded-lg bg-gray-100 hover:bg-red-50 hover:text-red-600 px-4 py-2 text-xs font-bold text-gray-700 transition-all border border-gray-200 cursor-pointer">
              <LogOut className="w-3.5 h-3.5" />
              <span>Cerrar Sesión</span>
            </button>
          </form>
        </div>
      </div>

      {/* Tarjetas de Resumen */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Estudiante</span>
            <User className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-base font-bold text-gray-900 truncate">{est.nombres} {est.apellidos}</div>
          <div className="text-xs font-mono text-[--primary] font-semibold mt-0.5">{est.cedula}</div>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Grado y Sección</span>
            <GraduationCap className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-base font-bold text-gray-900">{est.grado} - Sección &quot;{est.seccion}&quot;</div>
          <div className="text-xs text-gray-500 mt-0.5">Turno: {est.turno}</div>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 shadow-sm">
          <div className="flex items-center justify-between text-emerald-800 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Promedio General</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-700">{promedio} <span className="text-xs font-medium text-emerald-600">/ 20</span></div>
          <div className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1 font-semibold">
            {Number(promedio) >= 16 ? (
              <>
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>Rendimiento Sobresaliente</span>
              </>
            ) : Number(promedio) >= 10 ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Promovido</span>
              </>
            ) : (
              <>
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>En curso</span>
              </>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-5 shadow-sm">
          <div className="flex items-center justify-between text-blue-800 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Índice de Asistencia</span>
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-blue-700">{porcentajeAsistencia}%</div>
          <div className="text-[11px] text-blue-700 mt-1">{asistenciasPresentes} de {totalAsistencias} jornadas escolares</div>
        </div>
      </div>

      {/* Tabla Oficial de Calificaciones */}
      <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm mb-8">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-3 gap-2">
          <div>
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[--primary]" />
              Calificaciones Oficiales por Lapso
            </h2>
            <p className="text-xs text-gray-500">
              Notas cargadas y certificadas directamente por la Administración y Control de Estudios del CASM.
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 px-3 py-1 text-xs text-gray-600 border">
            Total asignaturas evaluadas: <strong>{notas.length}</strong>
          </div>
        </div>

        {notas.length === 0 ? (
          <div className="p-10 text-center text-xs text-gray-500 bg-gray-50 rounded-xl border border-dashed">
            <ClipboardList className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="font-semibold text-gray-700">Aún no se han asentado calificaciones en tu expediente escolar para este período.</p>
            <div className="mt-1 text-gray-400">La administración las publicará a medida que culmine cada lapso académico.</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-100 text-gray-700 uppercase font-bold text-[10px]">
                  <th className="p-3 text-left rounded-l">Lapso</th>
                  <th className="p-3 text-left">Asignatura</th>
                  <th className="p-3 text-center">Calificación Obtenida</th>
                  <th className="p-3 text-center">Estado</th>
                  <th className="p-3 text-left">Observaciones Pedagógicas</th>
                  <th className="p-3 text-right rounded-r">Fecha Registro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {notas.map((n) => {
                  const esAprobada = n.calificacion >= 10;
                  return (
                    <tr key={n.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="p-3 font-bold text-[--primary]">Lapso {n.lapso}</td>
                      <td className="p-3 font-semibold text-gray-900 text-sm">{n.asignatura}</td>
                      <td className="p-3 text-center">
                        <span
                          className={`inline-block px-3 py-1 rounded-full font-extrabold text-sm ${
                            n.calificacion >= 16
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : n.calificacion >= 10
                              ? "bg-blue-100 text-blue-800 border border-blue-200"
                              : "bg-red-100 text-red-800 border border-red-200"
                          }`}
                        >
                          {n.calificacion.toString().padStart(2, "0")} / 20
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          esAprobada ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                        }`}>
                          {esAprobada ? "Aprobada" : "En Recuperación"}
                        </span>
                      </td>
                      <td className="p-3 text-gray-600 max-w-xs">
                        {n.observacion ? (
                          <span className="italic">&ldquo;{n.observacion}&rdquo;</span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="p-3 text-right text-gray-400 font-mono text-[11px]">{n.fechaRegistro}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Asistencias y Datos Escolares */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-base font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[--primary]" />
            Historial Reciente de Asistencia
          </h2>
          {est.asistencia && est.asistencia.length > 0 ? (
            <ul className="divide-y divide-gray-100 text-xs">
              {est.asistencia.map((a, i) => (
                <li key={i} className="py-2.5 flex items-center justify-between">
                  <span className="font-mono text-gray-600">{a.fecha}</span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-bold ${
                      a.presente ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {a.presente ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Presente</span>
                      </>
                    ) : (
                      <>
                        <X className="w-3 h-3" />
                        <span>Inasistencia</span>
                      </>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-gray-400 py-4">No hay registros de inasistencias en este período.</p>
          )}
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="mb-2 text-base font-bold text-gray-900">Información del Representante</h2>
            <div className="text-xs text-gray-600 space-y-2 mt-3 bg-gray-50 p-4 rounded-xl border">
              <div><strong>Representante:</strong> {est.nombreRepresentante || "Representante Asignado"}</div>
              <div><strong>Teléfono:</strong> {est.telefonoRepresentante || "No registrado"}</div>
              <div><strong>Fecha de Nacimiento del Alumno:</strong> {est.fechaNacimiento}</div>
              <div><strong>Estado de Inscripción:</strong> <span className="text-green-700 font-bold uppercase">Activa</span></div>
            </div>
          </div>
          <div className="pt-4 border-t mt-4 flex items-center justify-between text-xs">
            <Link href="/" className="text-[--primary] font-semibold underline">
              Volver al Inicio del Portal
            </Link>
            <span className="text-gray-400">Colegio Adventista Sierra Maestra</span>
          </div>
        </div>
      </div>
    </section>
  );
}
