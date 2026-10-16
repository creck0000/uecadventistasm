import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/dataStore";

export async function POST(req: NextRequest) {
  try {
    const { role, id } = (await req.json()) as {
      role: "estudiante" | "profesor" | "admin";
      id: string;
    };

    if (!role || !id) {
      return NextResponse.json(
        { ok: false, error: "Por favor ingresa tu cédula o ID de usuario." },
        { status: 400 }
      );
    }

    const cleanId = id.trim();

    if (role === "admin") {
      const usuarios = await db.getUsuarios();
      const adminUser = usuarios.find(
        (u) =>
          u.rol === "admin" &&
          (u.cedula.toLowerCase() === cleanId.toLowerCase() ||
            u.email.toLowerCase() === cleanId.toLowerCase() ||
            cleanId.toLowerCase() === "admin")
      );

      if (!adminUser && cleanId.toLowerCase() !== "admin" && cleanId.toLowerCase() !== "v-00000001") {
        return NextResponse.json(
          { ok: false, error: "Credenciales de Administrador no válidas. Prueba con V-00000001 o admin." },
          { status: 401 }
        );
      }

      const res = NextResponse.json({ ok: true, redirect: "/admin" });
      res.cookies.set("role", "admin", { httpOnly: true, sameSite: "lax", path: "/" });
      res.cookies.set("userId", adminUser ? adminUser.cedula : "V-00000001", {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      });
      return res;
    }

    if (role === "estudiante") {
      const estudiante = await db.getEstudianteByCedula(cleanId);
      if (!estudiante) {
        const solicitudes = await db.getSolicitudes();
        const solicitud = solicitudes.find(
          (s) => s.cedula.toLowerCase() === cleanId.toLowerCase()
        );

        if (solicitud) {
          if (solicitud.estado === "pendiente") {
            return NextResponse.json(
              {
                ok: false,
                error:
                  "Tu solicitud de inscripción está en proceso de revisión por la Administración del CASM. Una vez aprobada podrás ingresar.",
              },
              { status: 403 }
            );
          }
          if (solicitud.estado === "rechazado") {
            return NextResponse.json(
              {
                ok: false,
                error: `Tu solicitud fue rechazada${
                  solicitud.motivoRechazo ? `: "${solicitud.motivoRechazo}"` : "."
                } Consulta con control de estudios.`,
              },
              { status: 403 }
            );
          }
        }

        return NextResponse.json(
          {
            ok: false,
            error:
              "Cédula no encontrada en el sistema de estudiantes. Si eres nuevo ingreso, completa primero el formulario de Registro.",
          },
          { status: 404 }
        );
      }

      if (estudiante.estadoInscripcion === "pendiente") {
        return NextResponse.json(
          {
            ok: false,
            error: "Tu inscripción se encuentra pendiente de aprobación por el Administrador.",
          },
          { status: 403 }
        );
      }

      const res = NextResponse.json({ ok: true, redirect: "/estudiante" });
      res.cookies.set("role", "estudiante", { httpOnly: true, sameSite: "lax", path: "/" });
      res.cookies.set("userId", estudiante.cedula, { httpOnly: true, sameSite: "lax", path: "/" });
      return res;
    }

    if (role === "profesor") {
      const profesor = await db.getProfesorByCedula(cleanId);
      if (!profesor) {
        return NextResponse.json(
          { ok: false, error: "Docente no encontrado con esa cédula en la nómina activa." },
          { status: 404 }
        );
      }

      const res = NextResponse.json({ ok: true, redirect: "/profesor" });
      res.cookies.set("role", "profesor", { httpOnly: true, sameSite: "lax", path: "/" });
      res.cookies.set("userId", profesor.cedula, { httpOnly: true, sameSite: "lax", path: "/" });
      return res;
    }

    return NextResponse.json({ ok: false, error: "Rol no válido." }, { status: 400 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Error en el servidor al autenticar." },
      { status: 500 }
    );
  }
}
