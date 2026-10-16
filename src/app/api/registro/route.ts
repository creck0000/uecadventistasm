import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/dataStore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { role, data } = body;

    if (!data) {
      return NextResponse.json(
        { ok: false, error: "Datos del formulario incompletos." },
        { status: 400 }
      );
    }

    const {
      nombres,
      apellidos,
      cedula,
      email,
      grado,
      turno,
      nombreRepresentante,
      telefonoRepresentante,
      terminosAceptados,
    } = data;

    if (!nombres || !apellidos || !cedula) {
      return NextResponse.json(
        { ok: false, error: "Nombres, apellidos y cédula son obligatorios." },
        { status: 400 }
      );
    }

    if (!terminosAceptados) {
      return NextResponse.json(
        {
          ok: false,
          error: "Es obligatorio leer y aceptar los Términos y Condiciones del CASM para procesar la inscripción.",
        },
        { status: 400 }
      );
    }

    // Verificar si ya existe estudiante activo
    const estExistente = db.getEstudianteByCedula(cedula);
    if (estExistente && estExistente.estadoInscripcion === "activo") {
      return NextResponse.json(
        { ok: false, error: "Ya existe un estudiante activo registrado con esta cédula." },
        { status: 400 }
      );
    }

    // Verificar si ya tiene solicitud pendiente
    const solExistente = db.getSolicitudes().find(
      (s) => s.cedula.toLowerCase() === cedula.toLowerCase() && s.estado === "pendiente"
    );
    if (solExistente) {
      return NextResponse.json(
        {
          ok: false,
          error: "Ya existe una solicitud en revisión con esta cédula. La administración la procesará a la brevedad.",
        },
        { status: 400 }
      );
    }

    // Crear solicitud
    const nuevaSol = db.crearSolicitud({
      estudianteId: `E-TEMP-${Date.now().toString().slice(-4)}`,
      nombres: nombres.trim(),
      apellidos: apellidos.trim(),
      cedula: cedula.trim(),
      email: email ? email.trim() : "",
      grado: grado || "1° Año",
      turno: (turno as "Mañana" | "Tarde") || "Mañana",
      nombreRepresentante: nombreRepresentante ? nombreRepresentante.trim() : "Representante Legal",
      telefonoRepresentante: telefonoRepresentante ? telefonoRepresentante.trim() : "",
      terminosAceptados: true,
    });

    return NextResponse.json({
      ok: true,
      message:
        "¡Solicitud de inscripción enviada con éxito! La administración del CASM evaluará tus datos y activará tu cuenta en el sistema.",
      solicitudId: nuevaSol.id,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Ocurrió un error al procesar el registro." },
      { status: 500 }
    );
  }
}
