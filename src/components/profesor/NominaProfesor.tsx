"use client";
import { useState, useMemo } from "react";
import { Estudiante } from "@/lib/types";
import { Search, X, Users2, GraduationCap, CheckCircle2 } from "lucide-react";

interface NominaProfesorProps {
  alumnos: Estudiante[];
}

export default function NominaProfesor({ alumnos }: NominaProfesorProps) {
  const [query, setQuery] = useState("");
  const [gradoFiltro, setGradoFiltro] = useState<string>("todos");

  // Obtener grados únicos
  const gradosDisponibles = useMemo(() => {
    const set = new Set<string>();
    alumnos.forEach((a) => {
      if (a.grado) set.add(a.grado);
    });
    return Array.from(set);
  }, [alumnos]);

  // Filtrado reactivo en tiempo real
  const alumnosFiltrados = useMemo(() => {
    return alumnos.filter((e) => {
      const matchGrado = gradoFiltro === "todos" || e.grado === gradoFiltro;
      if (!matchGrado) return false;

      if (!query.trim()) return true;
      const q = query.toLowerCase().trim();
      const nombreCompleto = `${e.nombres} ${e.apellidos}`.toLowerCase();
      const cedula = e.cedula.toLowerCase();

      return cedula.includes(q) || nombreCompleto.includes(q);
    });
  }, [alumnos, query, gradoFiltro]);

  return (
    <div className="space-y-4">
      {/* Barra de Búsqueda y Filtros */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between bg-gray-50/80 p-3.5 rounded-xl border border-black/5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar estudiante por número de cédula o nombre..."
            className="w-full rounded-lg border border-black/15 bg-white pl-9 pr-9 py-2 text-xs focus:border-[--primary] focus:ring-1 focus:ring-[--primary] shadow-xs"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Borrar búsqueda"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filtro por Grado */}
        {gradosDisponibles.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium whitespace-nowrap">Filtrar por grado:</span>
            <select
              value={gradoFiltro}
              onChange={(e) => setGradoFiltro(e.target.value)}
              className="rounded-lg border border-black/15 bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-700 shadow-xs"
            >
              <option value="todos">Todos los grados</option>
              {gradosDisponibles.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Contador de Resultados */}
      <div className="flex items-center justify-between text-xs text-gray-500 px-1">
        <span>
          Mostrando <strong>{alumnosFiltrados.length}</strong> de <strong>{alumnos.length}</strong> estudiantes
          {query && (
            <span className="text-[--primary] font-medium ml-1">
              (filtrado por &ldquo;{query}&rdquo;)
            </span>
          )}
        </span>
        {query && (
          <button
            onClick={() => setQuery("")}
            className="text-[--primary] hover:underline font-semibold cursor-pointer"
          >
            Limpiar filtro
          </button>
        )}
      </div>

      {/* Tabla de Alumnos */}
      {alumnosFiltrados.length === 0 ? (
        <div className="p-8 text-center text-xs text-gray-500 bg-gray-50 rounded-xl border border-dashed">
          <Users2 className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="font-semibold text-gray-700">No se encontraron estudiantes coincidentes</p>
          <p className="mt-1 text-gray-400">Verifica el número de cédula o nombre ingresado.</p>
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setGradoFiltro("todos");
              }}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[--primary] px-3 py-1.5 text-white text-xs font-bold shadow-xs hover:opacity-95"
            >
              Restablecer listado
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-black/5">
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
            <tbody className="divide-y divide-gray-100 bg-white">
              {alumnosFiltrados.map((e) => (
                <tr key={e.id} className="hover:bg-blue-50/40 transition-colors">
                  <td className="p-2.5 font-mono font-bold text-[--primary]">{e.cedula}</td>
                  <td className="p-2.5 font-bold text-gray-900">
                    {e.nombres} {e.apellidos}
                  </td>
                  <td className="p-2.5 text-gray-600">
                    <span className="inline-flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-gray-400" />
                      {e.grado} - Sec. {e.seccion}
                    </span>
                  </td>
                  <td className="p-2.5 text-gray-500">{e.turno}</td>
                  <td className="p-2.5 text-center">
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 font-bold text-[--primary] text-[11px] border border-blue-200">
                      <CheckCircle2 className="w-3 h-3 text-[--primary]" />
                      {e.notas ? e.notas.length : 0} registradas
                    </span>
                  </td>
                  <td className="p-2.5 text-right text-gray-600">
                    <div className="font-medium text-gray-800">{e.nombreRepresentante || "—"}</div>
                    <div className="text-[10px] text-gray-400">{e.telefonoRepresentante || ""}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
