import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/dataStore";

export async function GET() {
  try {
    const [estudiantes, profesores, usuarios, solicitudes] = await Promise.all([
      db.getEstudiantes(),
      db.getProfesores(),
      db.getUsuarios(),
      db.getSolicitudes(),
    ]);

    return NextResponse.json({
      ok: true,
      estudiantes,
      profesores,
      usuarios,
      solicitudes,
      stats: {
        totalEstudiantes: estudiantes.length,
        totalProfesores: profesores.length,
        solicitudesPendientes: solicitudes.filter((s) => s.estado === "pendiente").length,
      },
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Error al consultar usuarios" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tipo = searchParams.get("tipo") as "estudiante" | "profesor";
    const id = searchParams.get("id");

    if (!tipo || !id) {
      return NextResponse.json({ ok: false, error: "Tipo de usuario y ID son requeridos" }, { status: 400 });
    }

    const ok = await db.eliminarCuenta(tipo, id);
    if (!ok) {
      return NextResponse.json({ ok: false, error: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, message: `Cuenta de ${tipo} eliminada correctamente del sistema.` });
  } catch {
    return NextResponse.json({ ok: false, error: "Error al eliminar cuenta" }, { status: 500 });
  }
}
