"use client";
import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { Estudiante, Profesor, SolicitudInscripcion, Nota } from "@/lib/types";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<"solicitudes" | "calificaciones" | "usuarios" | "terminos">("calificaciones");
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ type: "ok" | "error"; msg: string } | null>(null);

  // Datos
  const [solicitudes, setSolicitudes] = useState<SolicitudInscripcion[]>([]);
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [profesores, setProfesores] = useState<Profesor[]>([]);

  // Estados para Carga de Notas
  const [selectedEstudianteId, setSelectedEstudianteId] = useState<string>("");
  const [asignatura, setAsignatura] = useState("Matemática");
  const [lapso, setLapso] = useState<"I" | "II" | "III">("I");
  const [calificacion, setCalificacion] = useState<string>("18");
  const [observacion, setObservacion] = useState("");
  const [editandoNotaId, setEditandoNotaId] = useState<string | null>(null);

  // Filtros
  const [filtroUsuario, setFiltroUsuario] = useState("");
  const [tipoUsuarioVer, setTipoUsuarioVer] = useState<"estudiantes" | "profesores">("estudiantes");

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/usuarios");
      const data = await res.json();
      if (data.ok) {
        setEstudiantes(data.estudiantes || []);
        setProfesores(data.profesores || []);
        setSolicitudes(data.solicitudes || []);
        if (data.estudiantes && data.estudiantes.length > 0 && !selectedEstudianteId) {
          setSelectedEstudianteId(data.estudiantes[0].id);
        }
      }
    } catch {
      setFeedback({ type: "error", msg: "No se pudieron cargar los datos del servidor." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const showMsg = (type: "ok" | "error", msg: string) => {
    setFeedback({ type, msg });
    setTimeout(() => setFeedback(null), 4500);
  };

  // --- SOLICITUDES ---
  const handleAprobarSolicitud = async (id: string) => {
    try {
      const res = await fetch("/api/admin/solicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "aprobar" }),
      });
      const data = await res.json();
      if (res.ok) {
        showMsg("ok", data.message || "Solicitud aprobada y estudiante registrado con éxito.");
        cargarDatos();
      } else {
        showMsg("error", data.error || "Error al aprobar.");
      }
    } catch {
      showMsg("error", "Error de conexión.");
    }
  };

  const handleRechazarSolicitud = async (id: string) => {
    const motivo = prompt("Motivo del rechazo (opcional):", "Documentación incompleta");
    if (motivo === null) return;

    try {
      const res = await fetch("/api/admin/solicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "rechazar", motivo }),
      });
      const data = await res.json();
      if (res.ok) {
        showMsg("ok", "Solicitud rechazada correctamente.");
        cargarDatos();
      } else {
        showMsg("error", data.error || "Error al rechazar.");
      }
    } catch {
      showMsg("error", "Error de conexión.");
    }
  };

  // --- CALIFICACIONES (SOLO ADMIN) ---
  const handleGuardarNota = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedEstudianteId) {
      showMsg("error", "Selecciona un estudiante primero.");
      return;
    }

    try {
      if (editandoNotaId) {
        // Actualizar
        const res = await fetch("/api/admin/notas", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            estudianteId: selectedEstudianteId,
            notaId: editandoNotaId,
            lapso,
            asignatura,
            calificacion: Number(calificacion),
            observacion,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          showMsg("ok", "Calificación actualizada exitosamente.");
          setEditandoNotaId(null);
          setObservacion("");
          cargarDatos();
        } else {
          showMsg("error", data.error);
        }
      } else {
        // Crear
        const res = await fetch("/api/admin/notas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            estudianteId: selectedEstudianteId,
            lapso,
            asignatura,
            calificacion: Number(calificacion),
            observacion,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          showMsg("ok", "Calificación registrada exitosamente en el expediente del alumno.");
          setObservacion("");
          cargarDatos();
        } else {
          showMsg("error", data.error);
        }
      }
    } catch {
      showMsg("error", "Error al guardar la calificación.");
    }
  };

  const handleEliminarNota = async (notaId: string) => {
    if (!confirm("¿Estás seguro de eliminar permanentemente esta calificación?")) return;

    try {
      const res = await fetch(
        `/api/admin/notas?estudianteId=${encodeURIComponent(selectedEstudianteId)}&notaId=${encodeURIComponent(notaId)}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (res.ok) {
        showMsg("ok", "Calificación eliminada correctamente.");
        cargarDatos();
      } else {
        showMsg("error", data.error);
      }
    } catch {
      showMsg("error", "Error al eliminar nota.");
    }
  };

  const handleIniciarEdicionNota = (n: Nota) => {
    setEditandoNotaId(n.id);
    setAsignatura(n.asignatura);
    setLapso(n.lapso);
    setCalificacion(n.calificacion.toString());
    setObservacion(n.observacion || "");
  };

  // --- ELIMINAR CUENTAS ---
  const handleEliminarCuenta = async (tipo: "estudiante" | "profesor", id: string, nombre: string) => {
    if (!confirm(`¿CONFIRMAR ELIMINACIÓN?\n\nSe eliminará de forma irreversible la cuenta de ${nombre} (${id}) y todo su historial.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/usuarios?tipo=${tipo}&id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        showMsg("ok", data.message || "Cuenta eliminada del sistema.");
        cargarDatos();
      } else {
        showMsg("error", data.error);
      }
    } catch {
      showMsg("error", "Error al procesar la eliminación de la cuenta.");
    }
  };

  const estudianteSeleccionado = estudiantes.find((e) => e.id === selectedEstudianteId || e.cedula === selectedEstudianteId);

  const solicitudesPendientes = solicitudes.filter((s) => s.estado === "pendiente");

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      {/* Encabezado del Panel */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-black/10 pb-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[--primary] text-white font-bold text-sm shadow">
              ⚙️
            </span>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#111827]" style={{ fontFamily: "var(--font-title)" }}>
                Panel de Administración General
              </h1>
              <p className="text-xs text-gray-500">
                Colegio Adventista Sierra Maestra • Gestión de Inscripciones, Calificaciones y Cuentas
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={cargarDatos}
            disabled={loading}
            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-1.5"
          >
            <span>🔄</span> Refrescar
          </button>
          <form action="/api/logout" method="post">
            <button className="fx-btn rounded-lg bg-red-600 px-4 py-1.5 text-xs font-bold text-white shadow hover:bg-red-700 transition-all">
              Cerrar Sesión
            </button>
          </form>
        </div>
      </div>

      {/* Alertas y Notificaciones */}
      {feedback && (
        <div
          className={`mb-6 rounded-xl p-4 text-xs font-semibold flex items-center gap-2 transition-all ${
            feedback.type === "ok"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <span>{feedback.type === "ok" ? "✅" : "⚠️"}</span>
          <span>{feedback.msg}</span>
        </div>
      )}

      {/* Estadísticas Rápidas */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <div className="rounded-xl border border-black/10 bg-white p-4 shadow-sm">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Estudiantes Activos</div>
          <div className="text-2xl font-extrabold text-[--primary] mt-1">{estudiantes.length}</div>
          <div className="text-[11px] text-gray-400 mt-1">Con expediente oficial</div>
        </div>

        <div className="rounded-xl border border-black/10 bg-white p-4 shadow-sm">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Profesores</div>
          <div className="text-2xl font-extrabold text-[--primary] mt-1">{profesores.length}</div>
          <div className="text-[11px] text-gray-400 mt-1">Plantilla docente</div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 shadow-sm">
          <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider">Solicitudes Pendientes</div>
          <div className="text-2xl font-extrabold text-amber-600 mt-1">{solicitudesPendientes.length}</div>
          <div className="text-[11px] text-amber-700 mt-1">Por revisar y aprobar</div>
        </div>

        <div className="rounded-xl border border-black/10 bg-white p-4 shadow-sm">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Lapsos Académicos</div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">3 Lapsos</div>
          <div className="text-[11px] text-gray-400 mt-1">Año Escolar 2025-2026</div>
        </div>
      </div>

      {/* Navegación por Pestañas */}
      <div className="mb-6 flex flex-wrap gap-2 border-b border-black/10 pb-2">
        <button
          onClick={() => setActiveTab("calificaciones")}
          className={`rounded-lg px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
            activeTab === "calificaciones"
              ? "bg-[--primary] text-white shadow"
              : "bg-white text-gray-600 border hover:bg-gray-50"
          }`}
        >
          📊 Carga de Calificaciones (Exclusivo Admin)
        </button>

        <button
          onClick={() => setActiveTab("solicitudes")}
          className={`relative rounded-lg px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
            activeTab === "solicitudes"
              ? "bg-[--primary] text-white shadow"
              : "bg-white text-gray-600 border hover:bg-gray-50"
          }`}
        >
          📝 Solicitudes de Inscripción
          {solicitudesPendientes.length > 0 && (
            <span className="ml-1.5 rounded-full bg-amber-500 px-1.5 py-0.5 text-[10px] text-white font-extrabold">
              {solicitudesPendientes.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("usuarios")}
          className={`rounded-lg px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
            activeTab === "usuarios"
              ? "bg-[--primary] text-white shadow"
              : "bg-white text-gray-600 border hover:bg-gray-50"
          }`}
        >
          👥 Directorio y Eliminación de Cuentas
        </button>

        <button
          onClick={() => setActiveTab("terminos")}
          className={`rounded-lg px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
            activeTab === "terminos"
              ? "bg-[--primary] text-white shadow"
              : "bg-white text-gray-600 border hover:bg-gray-50"
          }`}
        >
          📜 Términos y Reglamento
        </button>
      </div>

      {/* CONTENIDO 1: CARGA DE CALIFICACIONES */}
      {activeTab === "calificaciones" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-xs text-blue-900 flex items-start gap-2">
            <span className="text-base">🔒</span>
            <div>
              <strong>Control Exclusivo de Administración:</strong> Únicamente el Administrador tiene autorización para registrar, modificar o suprimir calificaciones oficiales en la base de datos escolar. Los estudiantes las consultan en tiempo real.
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Formulario de Carga */}
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm lg:col-span-1">
              <h2 className="mb-4 text-base font-bold text-gray-900 border-b pb-2">
                {editandoNotaId ? "✏️ Modificar Calificación" : "➕ Registrar Nueva Calificación"}
              </h2>

              <form onSubmit={handleGuardarNota} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Seleccionar Estudiante *</label>
                  <select
                    value={selectedEstudianteId}
                    onChange={(e) => {
                      setSelectedEstudianteId(e.target.value);
                      setEditandoNotaId(null);
                    }}
                    className="form-select w-full text-xs font-medium"
                    required
                  >
                    {estudiantes.map((est) => (
                      <option key={est.id} value={est.id}>
                        {est.cedula} - {est.nombres} {est.apellidos} ({est.grado})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Lapso Escolar *</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["I", "II", "III"] as const).map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => setLapso(l)}
                        className={`rounded-lg py-2 text-xs font-bold border transition-all ${
                          lapso === l
                            ? "bg-[--primary] text-white border-[--primary]"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        Lapso {l}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Asignatura / Materia *</label>
                  <input
                    value={asignatura}
                    onChange={(e) => setAsignatura(e.target.value)}
                    placeholder="Ej. Matemática, Castellano, Física, Inglés"
                    className="w-full rounded-lg border border-black/15 p-2 text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Calificación (Escala 01 - 20) *</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    step="1"
                    value={calificacion}
                    onChange={(e) => setCalificacion(e.target.value)}
                    className="w-full rounded-lg border border-black/15 p-2 text-xs font-bold text-lg"
                    required
                  />
                  <span className="text-[11px] text-gray-400">Escala de 1 a 20 puntos oficial de Venezuela.</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Observación Pedagógica (Opcional)</label>
                  <textarea
                    value={observacion}
                    onChange={(e) => setObservacion(e.target.value)}
                    rows={2}
                    placeholder="Ej. Excelente participación, entrega a tiempo."
                    className="w-full rounded-lg border border-black/15 p-2 text-xs"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="submit"
                    className="fx-btn flex-1 rounded-lg bg-[--primary] py-2.5 text-xs font-bold text-white shadow hover:opacity-95"
                  >
                    {editandoNotaId ? "Guardar Cambios" : "Cargar Nota"}
                  </button>
                  {editandoNotaId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditandoNotaId(null);
                        setObservacion("");
                      }}
                      className="rounded-lg border px-3 text-xs text-gray-600 hover:bg-gray-100"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Visualización de Boletín del Estudiante Seleccionado */}
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm lg:col-span-2">
              <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-3 gap-2">
                <div>
                  <h2 className="text-base font-bold text-gray-900">
                    Boletín de Calificaciones Oficial
                  </h2>
                  {estudianteSeleccionado && (
                    <p className="text-xs text-gray-600">
                      Alumno: <strong>{estudianteSeleccionado.nombres} {estudianteSeleccionado.apellidos}</strong> • Cédula: <strong>{estudianteSeleccionado.cedula}</strong> • {estudianteSeleccionado.grado} {estudianteSeleccionado.seccion}
                    </p>
                  )}
                </div>
                {estudianteSeleccionado && estudianteSeleccionado.notas && estudianteSeleccionado.notas.length > 0 && (
                  <div className="rounded-lg bg-emerald-50 px-3 py-1.5 border border-emerald-200 text-right">
                    <span className="text-[10px] uppercase font-bold text-emerald-800 block">Promedio Actual</span>
                    <span className="text-base font-extrabold text-emerald-700">
                      {(
                        estudianteSeleccionado.notas.reduce((acc, n) => acc + n.calificacion, 0) /
                        estudianteSeleccionado.notas.length
                      ).toFixed(2)}{" "}
                      / 20
                    </span>
                  </div>
                )}
              </div>

              {!estudianteSeleccionado || !estudianteSeleccionado.notas || estudianteSeleccionado.notas.length === 0 ? (
                <div className="p-8 text-center text-xs text-gray-500 bg-gray-50 rounded-xl border border-dashed">
                  No hay calificaciones cargadas aún para este estudiante. Utiliza el formulario lateral para agregar la primera.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gray-100 text-gray-700 uppercase font-bold text-[10px]">
                        <th className="p-2.5 text-left rounded-l">Lapso</th>
                        <th className="p-2.5 text-left">Asignatura</th>
                        <th className="p-2.5 text-center">Nota</th>
                        <th className="p-2.5 text-left">Observación</th>
                        <th className="p-2.5 text-center">Fecha</th>
                        <th className="p-2.5 text-right rounded-r">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {estudianteSeleccionado.notas.map((n) => (
                        <tr key={n.id} className="hover:bg-blue-50/40 transition-colors">
                          <td className="p-2.5 font-bold text-[--primary]">Lapso {n.lapso}</td>
                          <td className="p-2.5 font-medium text-gray-900">{n.asignatura}</td>
                          <td className="p-2.5 text-center">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full font-extrabold ${
                                n.calificacion >= 16
                                  ? "bg-green-100 text-green-800"
                                  : n.calificacion >= 10
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {n.calificacion} / 20
                            </span>
                          </td>
                          <td className="p-2.5 text-gray-500 max-w-xs truncate" title={n.observacion}>
                            {n.observacion || "—"}
                          </td>
                          <td className="p-2.5 text-center text-gray-400 text-[11px]">{n.fechaRegistro}</td>
                          <td className="p-2.5 text-right space-x-1">
                            <button
                              onClick={() => handleIniciarEdicionNota(n)}
                              title="Editar calificación"
                              className="rounded px-2 py-1 text-[11px] font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleEliminarNota(n.id)}
                              title="Eliminar calificación"
                              className="rounded px-2 py-1 text-[11px] font-semibold bg-red-50 hover:bg-red-100 text-red-600"
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CONTENIDO 2: SOLICITUDES DE INSCRIPCIÓN */}
      {activeTab === "solicitudes" && (
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-3 gap-2">
            <div>
              <h2 className="text-base font-bold text-gray-900">Bandeja de Solicitudes de Inscripción</h2>
              <p className="text-xs text-gray-500">
                Alumnos que se han registrado aceptando los términos y esperan aprobación oficial.
              </p>
            </div>
          </div>

          {solicitudes.length === 0 ? (
            <div className="p-8 text-center text-xs text-gray-500 bg-gray-50 rounded-xl">
              No hay solicitudes registradas en este momento.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 uppercase font-bold text-[10px]">
                    <th className="p-2.5 text-left">Fecha</th>
                    <th className="p-2.5 text-left">Aspirante</th>
                    <th className="p-2.5 text-left">Cédula</th>
                    <th className="p-2.5 text-left">Grado y Turno</th>
                    <th className="p-2.5 text-left">Representante</th>
                    <th className="p-2.5 text-center">Términos</th>
                    <th className="p-2.5 text-center">Estado</th>
                    <th className="p-2.5 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {solicitudes.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="p-2.5 text-gray-500 text-[11px]">{s.fechaSolicitud}</td>
                      <td className="p-2.5 font-bold text-gray-900">{s.nombres} {s.apellidos}</td>
                      <td className="p-2.5 font-medium">{s.cedula}</td>
                      <td className="p-2.5 text-gray-600">{s.grado} ({s.turno})</td>
                      <td className="p-2.5 text-gray-600">
                        <div>{s.nombreRepresentante}</div>
                        <div className="text-[10px] text-gray-400">{s.telefonoRepresentante}</div>
                      </td>
                      <td className="p-2.5 text-center">
                        <span className="inline-block rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-800">
                          ✓ Aceptados
                        </span>
                      </td>
                      <td className="p-2.5 text-center">
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            s.estado === "activo"
                              ? "bg-green-100 text-green-800"
                              : s.estado === "rechazado"
                              ? "bg-red-100 text-red-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {s.estado === "activo" ? "Aprobada" : s.estado === "rechazado" ? "Rechazada" : "Pendiente"}
                        </span>
                      </td>
                      <td className="p-2.5 text-right space-x-1.5">
                        {s.estado === "pendiente" ? (
                          <>
                            <button
                              onClick={() => handleAprobarSolicitud(s.id)}
                              className="rounded-lg bg-green-600 px-3 py-1 font-bold text-white text-[11px] hover:bg-green-700 shadow-sm"
                            >
                              Aprobar
                            </button>
                            <button
                              onClick={() => handleRechazarSolicitud(s.id)}
                              className="rounded-lg bg-red-100 px-2.5 py-1 font-semibold text-red-700 text-[11px] hover:bg-red-200"
                            >
                              Rechazar
                            </button>
                          </>
                        ) : (
                          <span className="text-[11px] text-gray-400 italic">Procesada</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* CONTENIDO 3: DIRECTORIO Y ELIMINACIÓN DE CUENTAS */}
      {activeTab === "usuarios" && (
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-3 gap-3">
            <div>
              <h2 className="text-base font-bold text-gray-900">Directorio General de Cuentas</h2>
              <p className="text-xs text-gray-500">
                Consulta y gestiona las cuentas autorizadas. El admin puede eliminar cuentas permanentemente.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex rounded-lg border p-1 bg-gray-50">
                <button
                  onClick={() => setTipoUsuarioVer("estudiantes")}
                  className={`rounded-md px-3 py-1 text-xs font-bold transition-all ${
                    tipoUsuarioVer === "estudiantes" ? "bg-white shadow text-[--primary]" : "text-gray-500"
                  }`}
                >
                  Estudiantes ({estudiantes.length})
                </button>
                <button
                  onClick={() => setTipoUsuarioVer("profesores")}
                  className={`rounded-md px-3 py-1 text-xs font-bold transition-all ${
                    tipoUsuarioVer === "profesores" ? "bg-white shadow text-[--primary]" : "text-gray-500"
                  }`}
                >
                  Profesores ({profesores.length})
                </button>
              </div>
              <input
                value={filtroUsuario}
                onChange={(e) => setFiltroUsuario(e.target.value)}
                placeholder="Buscar por cédula o nombre..."
                className="rounded-lg border border-black/15 px-3 py-1 text-xs w-48"
              />
            </div>
          </div>

          {tipoUsuarioVer === "estudiantes" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 uppercase font-bold text-[10px]">
                    <th className="p-2.5 text-left">Cédula</th>
                    <th className="p-2.5 text-left">Estudiante</th>
                    <th className="p-2.5 text-left">Grado / Sección</th>
                    <th className="p-2.5 text-left">Turno</th>
                    <th className="p-2.5 text-center">Notas Cargadas</th>
                    <th className="p-2.5 text-center">Estado</th>
                    <th className="p-2.5 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {estudiantes
                    .filter(
                      (e) =>
                        e.nombres.toLowerCase().includes(filtroUsuario.toLowerCase()) ||
                        e.apellidos.toLowerCase().includes(filtroUsuario.toLowerCase()) ||
                        e.cedula.toLowerCase().includes(filtroUsuario.toLowerCase())
                    )
                    .map((est) => (
                      <tr key={est.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-2.5 font-mono font-bold text-[--primary]">{est.cedula}</td>
                        <td className="p-2.5 font-bold text-gray-900">{est.nombres} {est.apellidos}</td>
                        <td className="p-2.5 text-gray-600">{est.grado} - Sec. {est.seccion}</td>
                        <td className="p-2.5 text-gray-500">{est.turno}</td>
                        <td className="p-2.5 text-center font-semibold text-gray-700">
                          {est.notas ? est.notas.length : 0} asignaturas
                        </td>
                        <td className="p-2.5 text-center">
                          <span className="inline-block rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-800">
                            Activo
                          </span>
                        </td>
                        <td className="p-2.5 text-right">
                          <button
                            onClick={() =>
                              handleEliminarCuenta("estudiante", est.id, `${est.nombres} ${est.apellidos}`)
                            }
                            className="rounded-lg bg-red-50 hover:bg-red-600 hover:text-white px-3 py-1 font-bold text-red-600 transition-all text-[11px]"
                          >
                            Eliminar Cuenta
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 uppercase font-bold text-[10px]">
                    <th className="p-2.5 text-left">Cédula</th>
                    <th className="p-2.5 text-left">Profesor</th>
                    <th className="p-2.5 text-left">Título / Especialidad</th>
                    <th className="p-2.5 text-left">Asignaturas</th>
                    <th className="p-2.5 text-center">Estado</th>
                    <th className="p-2.5 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {profesores
                    .filter(
                      (p) =>
                        p.nombres.toLowerCase().includes(filtroUsuario.toLowerCase()) ||
                        p.apellidos.toLowerCase().includes(filtroUsuario.toLowerCase()) ||
                        p.cedula.toLowerCase().includes(filtroUsuario.toLowerCase())
                    )
                    .map((prof) => (
                      <tr key={prof.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-2.5 font-mono font-bold text-[--primary]">{prof.cedula}</td>
                        <td className="p-2.5 font-bold text-gray-900">{prof.nombres} {prof.apellidos}</td>
                        <td className="p-2.5 text-gray-600">{prof.titulo}</td>
                        <td className="p-2.5 text-gray-600 font-medium">{prof.asignaturas.join(", ")}</td>
                        <td className="p-2.5 text-center">
                          <span className="inline-block rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-800">
                            Activo
                          </span>
                        </td>
                        <td className="p-2.5 text-right">
                          <button
                            onClick={() =>
                              handleEliminarCuenta("profesor", prof.id, `${prof.nombres} ${prof.apellidos}`)
                            }
                            className="rounded-lg bg-red-50 hover:bg-red-600 hover:text-white px-3 py-1 font-bold text-red-600 transition-all text-[11px]"
                          >
                            Eliminar Cuenta
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* CONTENIDO 4: TÉRMINOS Y CONDICIONES */}
      {activeTab === "terminos" && (
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-base font-bold text-gray-900">
            Reglamento Interno y Términos Oficiales del CASM
          </h2>
          <p className="mb-4 text-xs text-gray-500">
            Este texto es el que se le presenta obligatoriamente a cada estudiante y representante al registrarse.
          </p>
          <div className="rounded-xl border bg-gray-50 p-6 text-xs text-gray-700 leading-relaxed font-sans whitespace-pre-wrap">
{`REGLAMENTO INTERNO Y TÉRMINOS DE INSCRIPCIÓN - COLEGIO ADVENTISTA SIERRA MAESTRA (CASM)

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
La información personal de los alumnos y representantes será tratada con estricta confidencialidad para fines exclusivamente académicos y administrativos del CASM.`}
          </div>
        </div>
      )}

      <div className="mt-8 text-xs text-gray-500 flex items-center justify-between border-t pt-4">
        <span>© {new Date().getFullYear()} Colegio Adventista Sierra Maestra • Sistema de Gestión Académica</span>
        <Link className="text-[--primary] font-semibold underline" href="/">
          Volver a la Página Principal
        </Link>
      </div>
    </section>
  );
}
