import fs from "fs";
import path from "path";
import { Estudiante, Profesor, SolicitudInscripcion, Usuario, Nota } from "./types";
import { firestore } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const DB_DIR = path.join(process.cwd(), "src", "data");
const DB_FILE = path.join(DB_DIR, "db.json");

export interface DatabaseSchema {
  usuarios: Usuario[];
  estudiantes: Estudiante[];
  profesores: Profesor[];
  solicitudes: SolicitudInscripcion[];
  terminosYCondiciones: string;
}

export const DEFAULT_TERMS = `REGLAMENTO INTERNO Y TÉRMINOS DE INSCRIPCIÓN - COLEGIO ADVENTISTA SIERRA MAESTRA (CASM)

1. De la Misión Institucional:
El Colegio Adventista Sierra Maestra tiene como misión ofrecer una educación cristiana e integral, fortaleciendo principios espirituales, morales, cívicos y de excelencia académica.

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
La información personal de los alumnos y representantes será tratada con estricta confidencialidad para fines exclusivamente académicos y administrativos del CASM.`;

const DEFAULT_DB: DatabaseSchema = {
  usuarios: [
    {
      id: "U-ADMIN",
      cedula: "V-00000001",
      email: "admin@casm.edu",
      rol: "admin",
      estado: "activo",
      fechaRegistro: "2026-01-01",
    },
    {
      id: "U-PROF-1",
      cedula: "V-87654321",
      email: "jose.perez@casm.edu",
      rol: "profesor",
      estado: "activo",
      fechaRegistro: "2026-01-10",
    },
    {
      id: "U-EST-1",
      cedula: "V-12345678",
      email: "maria.gonzalez@casm.edu",
      rol: "estudiante",
      estado: "activo",
      fechaRegistro: "2026-01-15",
    },
  ],
  estudiantes: [
    {
      id: "E-001",
      nombres: "María",
      apellidos: "González",
      cedula: "V-12345678",
      email: "maria.gonzalez@casm.edu",
      fechaNacimiento: "2008-05-12",
      grado: "3° Año",
      seccion: "B",
      turno: "Mañana",
      estadoInscripcion: "activo",
      nombreRepresentante: "Carmen González",
      telefonoRepresentante: "+58 414-1234567",
      fechaRegistro: "2026-01-15",
      notas: [
        {
          id: "N-001",
          lapso: "I",
          asignatura: "Matemática",
          calificacion: 18,
          observacion: "Excelente desempeño y puntualidad en entrega de proyectos.",
          fechaRegistro: "2026-02-10",
        },
        {
          id: "N-002",
          lapso: "I",
          asignatura: "Castellano y Literatura",
          calificacion: 17,
          observacion: "Buena redacción y comprensión lectora.",
          fechaRegistro: "2026-02-11",
        },
        {
          id: "N-003",
          lapso: "II",
          asignatura: "Historia de Venezuela",
          calificacion: 19,
          observacion: "Destacada participación en discusiones temáticas.",
          fechaRegistro: "2026-03-01",
        },
      ],
      asistencia: [
        { fecha: "2026-02-01", presente: true },
        { fecha: "2026-02-02", presente: true },
        { fecha: "2026-02-03", presente: false },
        { fecha: "2026-02-04", presente: true },
      ],
    },
  ],
  profesores: [
    {
      id: "P-001",
      nombres: "José",
      apellidos: "Pérez",
      cedula: "V-87654321",
      email: "jose.perez@casm.edu",
      titulo: "Profesor en Educación Matemática y Física",
      asignaturas: ["Matemática", "Física"],
      gradosSecciones: [
        { grado: "3° Año", seccion: "B" },
        { grado: "4° Año", seccion: "A" },
      ],
      estado: "activo",
    },
  ],
  solicitudes: [
    {
      id: "SOL-101",
      estudianteId: "E-TEMP-101",
      nombres: "Andrés David",
      apellidos: "Mendoza Silva",
      cedula: "V-31456789",
      email: "andres.mendoza@gmail.com",
      grado: "1° Año",
      turno: "Mañana",
      nombreRepresentante: "Elena Silva",
      telefonoRepresentante: "+58 424-9876543",
      terminosAceptados: true,
      fechaSolicitud: "2026-03-10",
      estado: "pendiente",
    },
  ],
  terminosYCondiciones: DEFAULT_TERMS,
};

function readLocalDb(): DatabaseSchema {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(raw) as DatabaseSchema;
    }
  } catch {
    // Ignorar si fs falla (ej: entorno serverless de solo lectura)
  }
  return DEFAULT_DB;
}

function safeWriteLocalDb(data: DatabaseSchema) {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // En Vercel / serverless el sistema de archivos puede ser solo lectura; Firestore es la fuente de verdad.
  }
}

// In-memory cache para acelerar lecturas y fallback
let memoryCache: DatabaseSchema = readLocalDb();

export const db = {
  // === ESTUDIANTES ===
  async getEstudiantes(): Promise<Estudiante[]> {
    try {
      const snap = await getDocs(collection(firestore, "estudiantes"));
      if (!snap.empty) {
        const list = snap.docs.map((d) => d.data() as Estudiante);
        memoryCache.estudiantes = list;
        return list;
      }
    } catch (err) {
      console.warn("Firestore offline o error al leer estudiantes, usando caché local:", err);
    }
    return memoryCache.estudiantes || [];
  },

  async getEstudianteByCedula(cedula: string): Promise<Estudiante | undefined> {
    const clean = cedula.trim().toLowerCase();
    try {
      const snap = await getDocs(collection(firestore, "estudiantes"));
      if (!snap.empty) {
        const found = snap.docs
          .map((d) => d.data() as Estudiante)
          .find((e) => e.cedula.toLowerCase() === clean);
        if (found) return found;
      }
    } catch {
      // fallback
    }
    return (memoryCache.estudiantes || []).find((e) => e.cedula.toLowerCase() === clean);
  },

  // === PROFESORES ===
  async getProfesores(): Promise<Profesor[]> {
    try {
      const snap = await getDocs(collection(firestore, "profesores"));
      if (!snap.empty) {
        const list = snap.docs.map((d) => d.data() as Profesor);
        memoryCache.profesores = list;
        return list;
      }
    } catch (err) {
      console.warn("Firestore error al leer profesores:", err);
    }
    return memoryCache.profesores || [];
  },

  async getProfesorByCedula(cedula: string): Promise<Profesor | undefined> {
    const clean = cedula.trim().toLowerCase();
    try {
      const snap = await getDocs(collection(firestore, "profesores"));
      if (!snap.empty) {
        const found = snap.docs
          .map((d) => d.data() as Profesor)
          .find((p) => p.cedula.toLowerCase() === clean);
        if (found) return found;
      }
    } catch {
      // fallback
    }
    return (memoryCache.profesores || []).find((p) => p.cedula.toLowerCase() === clean);
  },

  // === USUARIOS ===
  async getUsuarios(): Promise<Usuario[]> {
    try {
      const snap = await getDocs(collection(firestore, "usuarios"));
      if (!snap.empty) {
        const list = snap.docs.map((d) => d.data() as Usuario);
        memoryCache.usuarios = list;
        return list;
      }
    } catch (err) {
      console.warn("Firestore error al leer usuarios:", err);
    }
    return memoryCache.usuarios || [];
  },

  async getUsuarioByCedula(cedula: string): Promise<Usuario | undefined> {
    const clean = cedula.trim().toLowerCase();
    try {
      const snap = await getDocs(collection(firestore, "usuarios"));
      if (!snap.empty) {
        const found = snap.docs
          .map((d) => d.data() as Usuario)
          .find((u) => u.cedula.toLowerCase() === clean);
        if (found) return found;
      }
    } catch {
      // fallback
    }
    return (memoryCache.usuarios || []).find((u) => u.cedula.toLowerCase() === clean);
  },

  // === SOLICITUDES ===
  async getSolicitudes(): Promise<SolicitudInscripcion[]> {
    try {
      const snap = await getDocs(collection(firestore, "solicitudes"));
      if (!snap.empty) {
        const list = snap.docs.map((d) => d.data() as SolicitudInscripcion);
        memoryCache.solicitudes = list;
        return list;
      }
    } catch (err) {
      console.warn("Firestore error al leer solicitudes:", err);
    }
    return memoryCache.solicitudes || [];
  },

  async crearSolicitud(
    data: Omit<SolicitudInscripcion, "id" | "fechaSolicitud" | "estado">
  ): Promise<SolicitudInscripcion> {
    const id = `SOL-${Date.now()}`;
    const fechaSolicitud = new Date().toISOString().split("T")[0];

    const nuevaSolicitud: SolicitudInscripcion = {
      ...data,
      id,
      fechaSolicitud,
      estado: "pendiente",
    };

    // 1. Guardar en Firestore
    try {
      await setDoc(doc(firestore, "solicitudes", id), nuevaSolicitud);
    } catch (err) {
      console.error("Error al guardar solicitud en Firestore:", err);
    }

    // 2. Actualizar caché local
    if (!memoryCache.solicitudes) memoryCache.solicitudes = [];
    memoryCache.solicitudes.unshift(nuevaSolicitud);
    safeWriteLocalDb(memoryCache);

    return nuevaSolicitud;
  },

  async aprobarSolicitud(solicitudId: string): Promise<boolean> {
    const solicitudes = await this.getSolicitudes();
    const sol = solicitudes.find((s) => s.id === solicitudId);
    if (!sol) return false;

    sol.estado = "activo";

    // 1. Actualizar solicitud en Firestore
    try {
      await updateDoc(doc(firestore, "solicitudes", sol.id), { estado: "activo" });
    } catch {
      await setDoc(doc(firestore, "solicitudes", sol.id), sol, { merge: true });
    }

    // 2. Crear o actualizar Estudiante en Firestore
    const estudiantes = await this.getEstudiantes();
    const estExistente = estudiantes.find((e) => e.cedula === sol.cedula);

    const estudianteOficial: Estudiante = estExistente
      ? { ...estExistente, estadoInscripcion: "activo" }
      : {
          id: `E-${Date.now().toString().slice(-4)}`,
          nombres: sol.nombres,
          apellidos: sol.apellidos,
          cedula: sol.cedula,
          email: sol.email,
          fechaNacimiento: "2010-01-01",
          grado: sol.grado,
          seccion: "A",
          turno: sol.turno,
          estadoInscripcion: "activo",
          nombreRepresentante: sol.nombreRepresentante,
          telefonoRepresentante: sol.telefonoRepresentante,
          notas: [],
          asistencia: [],
          fechaRegistro: new Date().toISOString().split("T")[0],
        };

    try {
      await setDoc(doc(firestore, "estudiantes", sol.cedula), estudianteOficial, { merge: true });
    } catch (err) {
      console.error("Error al guardar estudiante en Firestore:", err);
    }

    // 3. Crear o actualizar Usuario para Login
    const usuarioOficial: Usuario = {
      id: `U-${Date.now().toString().slice(-4)}`,
      cedula: sol.cedula,
      email: sol.email,
      rol: "estudiante",
      estado: "activo",
      fechaRegistro: new Date().toISOString().split("T")[0],
    };

    try {
      await setDoc(doc(firestore, "usuarios", sol.cedula), usuarioOficial, { merge: true });
    } catch (err) {
      console.error("Error al guardar usuario en Firestore:", err);
    }

    // 4. Actualizar memoria y local
    const sIdx = memoryCache.solicitudes.findIndex((s) => s.id === solicitudId);
    if (sIdx >= 0) memoryCache.solicitudes[sIdx].estado = "activo";

    const eIdx = memoryCache.estudiantes.findIndex((e) => e.cedula === sol.cedula);
    if (eIdx >= 0) {
      memoryCache.estudiantes[eIdx] = estudianteOficial;
    } else {
      memoryCache.estudiantes.push(estudianteOficial);
    }

    const uIdx = memoryCache.usuarios.findIndex((u) => u.cedula === sol.cedula);
    if (uIdx >= 0) {
      memoryCache.usuarios[uIdx].estado = "activo";
    } else {
      memoryCache.usuarios.push(usuarioOficial);
    }

    safeWriteLocalDb(memoryCache);
    return true;
  },

  async rechazarSolicitud(solicitudId: string, motivo?: string): Promise<boolean> {
    const solicitudes = await this.getSolicitudes();
    const sol = solicitudes.find((s) => s.id === solicitudId);
    if (!sol) return false;

    sol.estado = "rechazado";
    if (motivo) sol.motivoRechazo = motivo;

    try {
      await setDoc(
        doc(firestore, "solicitudes", sol.id),
        { estado: "rechazado", motivoRechazo: motivo || "No cumple con los requisitos del plantel." },
        { merge: true }
      );
      await setDoc(
        doc(firestore, "usuarios", sol.cedula),
        { estado: "rechazado" },
        { merge: true }
      );
    } catch (err) {
      console.error("Error al rechazar en Firestore:", err);
    }

    // Actualizar local
    const sIdx = memoryCache.solicitudes.findIndex((s) => s.id === solicitudId);
    if (sIdx >= 0) {
      memoryCache.solicitudes[sIdx].estado = "rechazado";
      if (motivo) memoryCache.solicitudes[sIdx].motivoRechazo = motivo;
    }
    const uIdx = memoryCache.usuarios.findIndex((u) => u.cedula === sol.cedula);
    if (uIdx >= 0) memoryCache.usuarios[uIdx].estado = "rechazado";

    safeWriteLocalDb(memoryCache);
    return true;
  },

  // === NOTAS (GESTIÓN EXCLUSIVA ADMINISTRADOR) ===
  async agregarNota(
    estudianteId: string,
    nota: Omit<Nota, "id" | "fechaRegistro">
  ): Promise<Nota | null> {
    const estudiantes = await this.getEstudiantes();
    const estudiante = estudiantes.find((e) => e.id === estudianteId || e.cedula === estudianteId);
    if (!estudiante) return null;

    const nuevaNota: Nota = {
      ...nota,
      id: `N-${Date.now().toString().slice(-6)}`,
      fechaRegistro: new Date().toISOString().split("T")[0],
    };

    if (!estudiante.notas) estudiante.notas = [];
    estudiante.notas.push(nuevaNota);

    try {
      await setDoc(
        doc(firestore, "estudiantes", estudiante.cedula),
        { notas: estudiante.notas },
        { merge: true }
      );
    } catch (err) {
      console.error("Error al guardar nota en Firestore:", err);
    }

    const idx = memoryCache.estudiantes.findIndex(
      (e) => e.id === estudianteId || e.cedula === estudianteId
    );
    if (idx >= 0) memoryCache.estudiantes[idx] = estudiante;
    safeWriteLocalDb(memoryCache);

    return nuevaNota;
  },

  async editarNota(
    estudianteId: string,
    notaId: string,
    datos: Partial<Omit<Nota, "id" | "fechaRegistro">>
  ): Promise<boolean> {
    const estudiantes = await this.getEstudiantes();
    const estudiante = estudiantes.find((e) => e.id === estudianteId || e.cedula === estudianteId);
    if (!estudiante || !estudiante.notas) return false;

    const nIndex = estudiante.notas.findIndex((n) => n.id === notaId);
    if (nIndex === -1) return false;

    estudiante.notas[nIndex] = {
      ...estudiante.notas[nIndex],
      ...datos,
    };

    try {
      await setDoc(
        doc(firestore, "estudiantes", estudiante.cedula),
        { notas: estudiante.notas },
        { merge: true }
      );
    } catch (err) {
      console.error("Error al editar nota en Firestore:", err);
    }

    const idx = memoryCache.estudiantes.findIndex(
      (e) => e.id === estudianteId || e.cedula === estudianteId
    );
    if (idx >= 0) memoryCache.estudiantes[idx] = estudiante;
    safeWriteLocalDb(memoryCache);

    return true;
  },

  async eliminarNota(estudianteId: string, notaId: string): Promise<boolean> {
    const estudiantes = await this.getEstudiantes();
    const estudiante = estudiantes.find((e) => e.id === estudianteId || e.cedula === estudianteId);
    if (!estudiante || !estudiante.notas) return false;

    const inicialLen = estudiante.notas.length;
    estudiante.notas = estudiante.notas.filter((n) => n.id !== notaId);

    if (estudiante.notas.length === inicialLen) return false;

    try {
      await setDoc(
        doc(firestore, "estudiantes", estudiante.cedula),
        { notas: estudiante.notas },
        { merge: true }
      );
    } catch (err) {
      console.error("Error al eliminar nota en Firestore:", err);
    }

    const idx = memoryCache.estudiantes.findIndex(
      (e) => e.id === estudianteId || e.cedula === estudianteId
    );
    if (idx >= 0) memoryCache.estudiantes[idx] = estudiante;
    safeWriteLocalDb(memoryCache);

    return true;
  },

  // === GESTIÓN DE CUENTAS (ELIMINAR) ===
  async eliminarCuenta(tipo: "estudiante" | "profesor", id: string): Promise<boolean> {
    let cedulaEliminada = "";

    if (tipo === "estudiante") {
      const estudiantes = await this.getEstudiantes();
      const est = estudiantes.find((e) => e.id === id || e.cedula === id);
      if (est) {
        cedulaEliminada = est.cedula;
        try {
          await deleteDoc(doc(firestore, "estudiantes", est.cedula));
        } catch {}
      }
    } else {
      const profesores = await this.getProfesores();
      const prof = profesores.find((p) => p.id === id || p.cedula === id);
      if (prof) {
        cedulaEliminada = prof.cedula;
        try {
          await deleteDoc(doc(firestore, "profesores", prof.cedula));
        } catch {}
      }
    }

    if (cedulaEliminada) {
      try {
        await deleteDoc(doc(firestore, "usuarios", cedulaEliminada));
      } catch {}

      // Actualizar memoria y local
      if (tipo === "estudiante") {
        memoryCache.estudiantes = memoryCache.estudiantes.filter(
          (e) => e.cedula !== cedulaEliminada && e.id !== id
        );
      } else {
        memoryCache.profesores = memoryCache.profesores.filter(
          (p) => p.cedula !== cedulaEliminada && p.id !== id
        );
      }
      memoryCache.usuarios = memoryCache.usuarios.filter((u) => u.cedula !== cedulaEliminada);
      memoryCache.solicitudes = memoryCache.solicitudes.filter((s) => s.cedula !== cedulaEliminada);
      safeWriteLocalDb(memoryCache);

      return true;
    }

    return false;
  },

  async getTerminos(): Promise<string> {
    try {
      const snap = await getDoc(doc(firestore, "config", "general"));
      if (snap.exists() && snap.data().terminosYCondiciones) {
        return snap.data().terminosYCondiciones;
      }
    } catch {}
    return memoryCache.terminosYCondiciones || DEFAULT_TERMS;
  },
};
