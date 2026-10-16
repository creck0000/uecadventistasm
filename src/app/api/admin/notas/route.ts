import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/dataStore";

// Agregar nota
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { estudianteId, lapso, asignatura, calificacion, observacion } = body;

    if (!estudianteId || !lapso || !asignatura || calificacion === undefined) {
      return NextResponse.json(
        { ok: false, error: "Estudiante, lapso, asignatura y calificación son obligatorios." },
        { status: 400 }
      );
    }

    const numCalificacion = Number(calificacion);
    if (isNaN(numCalificacion) || numCalificacion < 0 || numCalificacion > 20) {
      return NextResponse.json(
        { ok: false, error: "La calificación debe ser un número válido entre 0 y 20 puntos." },
        { status: 400 }
      );
    }

    const nota = await db.agregarNota(estudianteId, {
      lapso: lapso as "I" | "II" | "III",
      asignatura: asignatura.trim(),
      calificacion: numCalificacion,
      observacion: observacion ? observacion.trim() : "",
    });

    if (!nota) {
      return NextResponse.json({ ok: false, error: "Estudiante no encontrado." }, { status: 404 });
    }

    return NextResponse.json({ ok: true, nota, message: "Calificación registrada exitosamente por Administración." });
  } catch {
    return NextResponse.json({ ok: false, error: "Error en el servidor al registrar nota." }, { status: 500 });
  }
}

// Editar nota
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { estudianteId, notaId, lapso, asignatura, calificacion, observacion } = body;

    if (!estudianteId || !notaId) {
      return NextResponse.json(
        { ok: false, error: "Estudiante y Nota ID son requeridos." },
        { status: 400 }
      );
    }

    const datos: Record<string, any> = {};
    if (lapso) datos.lapso = lapso;
    if (asignatura) datos.asignatura = asignatura.trim();
    if (calificacion !== undefined) {
      const num = Number(calificacion);
      if (isNaN(num) || num < 0 || num > 20) {
        return NextResponse.json({ ok: false, error: "La calificación debe estar entre 0 y 20." }, { status: 400 });
      }
      datos.calificacion = num;
    }
    if (observacion !== undefined) datos.observacion = observacion.trim();

    const ok = await db.editarNota(estudianteId, notaId, datos);
    if (!ok) {
      return NextResponse.json({ ok: false, error: "No se encontró el estudiante o la nota." }, { status: 404 });
    }

    return NextResponse.json({ ok: true, message: "Calificación modificada exitosamente." });
  } catch {
    return NextResponse.json({ ok: false, error: "Error al actualizar nota." }, { status: 500 });
  }
}

// Eliminar nota
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const estudianteId = searchParams.get("estudianteId");
    const notaId = searchParams.get("notaId");

    if (!estudianteId || !notaId) {
      return NextResponse.json(
        { ok: false, error: "Faltan estudianteId o notaId." },
        { status: 400 }
      );
    }

    const ok = await db.eliminarNota(estudianteId, notaId);
    if (!ok) {
      return NextResponse.json({ ok: false, error: "No se pudo eliminar la nota o no existe." }, { status: 404 });
    }

    return NextResponse.json({ ok: true, message: "Calificación eliminada correctamente." });
  } catch {
    return NextResponse.json({ ok: false, error: "Error al eliminar nota." }, { status: 500 });
  }
}
