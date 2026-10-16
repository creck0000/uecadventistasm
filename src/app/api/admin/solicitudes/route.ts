import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/dataStore";

export async function GET() {
  try {
    const solicitudes = await db.getSolicitudes();
    return NextResponse.json({ ok: true, solicitudes });
  } catch {
    return NextResponse.json({ ok: false, error: "Error al obtener solicitudes" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { id, action, motivo } = await req.json();

    if (!id || !action) {
      return NextResponse.json({ ok: false, error: "Faltan parámetros requeridos" }, { status: 400 });
    }

    if (action === "aprobar") {
      const ok = await db.aprobarSolicitud(id);
      if (ok) {
        return NextResponse.json({ ok: true, message: "Solicitud aprobada y estudiante registrado oficialmente." });
      }
      return NextResponse.json({ ok: false, error: "Solicitud no encontrada" }, { status: 404 });
    }

    if (action === "rechazar") {
      const ok = await db.rechazarSolicitud(id, motivo);
      if (ok) {
        return NextResponse.json({ ok: true, message: "Solicitud rechazada." });
      }
      return NextResponse.json({ ok: false, error: "Solicitud no encontrada" }, { status: 404 });
    }

    return NextResponse.json({ ok: false, error: "Acción no reconocida" }, { status: 400 });
  } catch {
    return NextResponse.json({ ok: false, error: "Error al procesar la solicitud" }, { status: 500 });
  }
}
