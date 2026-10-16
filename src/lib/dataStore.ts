import fs from "fs";
import path from "path";
import { Estudiante, Profesor, SolicitudInscripcion, Usuario, Nota } from "./types";

const DB_DIR = path.join(process.cwd(), "src", "data");
const DB_FILE = path.join(DB_DIR, "db.json");

export interface DatabaseSchema {
  usuarios: Usuario[];
  estudiantes: Estudiante[];
  profesores: Profesor[];
  solicitudes: SolicitudInscripcion[];
  terminosYCondiciones: string;
}

const DEFAULT_TERMS = `REGLAMENTO INTERNO Y TÉRMINOS DE INSCRIPCIÓN - COLEGIO ADVENTISTA SIERRA MAESTRA (CASM)

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

function ensureDbExists(): DatabaseSchema {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_DB, null, 2), "utf-8");
    return DEFAULT_DB;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw) as DatabaseSchema;
  } catch {
    fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_DB, null, 2), "utf-8");
    return DEFAULT_DB;
  }
}

function writeDb(data: DatabaseSchema) {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export const db = {
  get(): DatabaseSchema {
    return ensureDbExists();
  },

  // === SOLICITUDES ===
  getSolicitudes(): SolicitudInscripcion[] {
    return this.get().solicitudes;
  },

  crearSolicitud(data: Omit<SolicitudInscripcion, "id" | "fechaSolicitud" | "estado">): SolicitudInscripcion {
    const database = this.get();
    const id = `SOL-${Date.now()}`;
    const fechaSolicitud = new Date().toISOString().split("T")[0];

    const nuevaSolicitud: SolicitudInscripcion = {
      ...data,
      id,
      fechaSolicitud,
      estado: "pendiente",
    };

    database.solicitudes.unshift(nuevaSolicitud);
    writeDb(database);
    return nuevaSolicitud;
  },

  aprobarSolicitud(solicitudId: string): boolean {
    const database = this.get();
    const index = database.solicitudes.findIndex((s) => s.id === solicitudId);
    if (index === -1) return false;

    const sol = database.solicitudes[index];
    sol.estado = "activo";

    // Si ya existe en estudiantes, actualizar
    const estIndex = database.estudiantes.findIndex((e) => e.cedula === sol.cedula);
    if (estIndex >= 0) {
      database.estudiantes[estIndex].estadoInscripcion = "activo";
    } else {
      // Crear estudiante oficial
      const nuevoEstudiante: Estudiante = {
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
      database.estudiantes.push(nuevoEstudiante);
    }

    // Asegurar usuario para login
    const uIndex = database.usuarios.findIndex((u) => u.cedula === sol.cedula);
    if (uIndex >= 0) {
      database.usuarios[uIndex].estado = "activo";
    } else {
      database.usuarios.push({
        id: `U-${Date.now().toString().slice(-4)}`,
        cedula: sol.cedula,
        email: sol.email,
        rol: "estudiante",
        estado: "activo",
        fechaRegistro: new Date().toISOString().split("T")[0],
      });
    }

    writeDb(database);
    return true;
  },

  rechazarSolicitud(solicitudId: string, motivo?: string): boolean {
    const database = this.get();
    const index = database.solicitudes.findIndex((s) => s.id === solicitudId);
    if (index === -1) return false;

    database.solicitudes[index].estado = "rechazado";
    if (motivo) {
      database.solicitudes[index].motivoRechazo = motivo;
    }

    const uIndex = database.usuarios.findIndex((u) => u.cedula === database.solicitudes[index].cedula);
    if (uIndex >= 0) {
      database.usuarios[uIndex].estado = "rechazado";
    }

    writeDb(database);
    return true;
  },

  // === NOTAS (SOLO ADMINISTRADOR) ===
  agregarNota(estudianteId: string, nota: Omit<Nota, "id" | "fechaRegistro">): Nota | null {
    const database = this.get();
    const estudiante = database.estudiantes.find((e) => e.id === estudianteId || e.cedula === estudianteId);
    if (!estudiante) return null;

    const nuevaNota: Nota = {
      ...nota,
      id: `N-${Date.now().toString().slice(-6)}`,
      fechaRegistro: new Date().toISOString().split("T")[0],
    };

    if (!estudiante.notas) estudiante.notas = [];
    estudiante.notas.push(nuevaNota);
    writeDb(database);
    return nuevaNota;
  },

  editarNota(estudianteId: string, notaId: string, datos: Partial<Omit<Nota, "id" | "fechaRegistro">>): boolean {
    const database = this.get();
    const estudiante = database.estudiantes.find((e) => e.id === estudianteId || e.cedula === estudianteId);
    if (!estudiante || !estudiante.notas) return false;

    const nIndex = estudiante.notas.findIndex((n) => n.id === notaId);
    if (nIndex === -1) return false;

    estudiante.notas[nIndex] = {
      ...estudiante.notas[nIndex],
      ...datos,
    };

    writeDb(database);
    return true;
  },

  eliminarNota(estudianteId: string, notaId: string): boolean {
    const database = this.get();
    const estudiante = database.estudiantes.find((e) => e.id === estudianteId || e.cedula === estudianteId);
    if (!estudiante || !estudiante.notas) return false;

    const inicialLen = estudiante.notas.length;
    estudiante.notas = estudiante.notas.filter((n) => n.id !== notaId);

    if (estudiante.notas.length !== inicialLen) {
      writeDb(database);
      return true;
    }
    return false;
  },

  // === GESTIÓN DE CUENTAS (ELIMINAR / BUSCAR) ===
  eliminarCuenta(tipo: "estudiante" | "profesor", id: string): boolean {
    const database = this.get();
    let cedulaEliminada = "";

    if (tipo === "estudiante") {
      const est = database.estudiantes.find((e) => e.id === id || e.cedula === id);
      if (est) {
        cedulaEliminada = est.cedula;
        database.estudiantes = database.estudiantes.filter((e) => e.id !== id && e.cedula !== id);
      }
    } else {
      const prof = database.profesores.find((p) => p.id === id || p.cedula === id);
      if (prof) {
        cedulaEliminada = prof.cedula;
        database.profesores = database.profesores.filter((p) => p.id !== id && p.cedula !== id);
      }
    }

    if (cedulaEliminada) {
      database.usuarios = database.usuarios.filter((u) => u.cedula !== cedulaEliminada);
      database.solicitudes = database.solicitudes.filter((s) => s.cedula !== cedulaEliminada);
      writeDb(database);
      return true;
    }

    return false;
  },

  // === CONSULTAS ===
  getEstudiantes(): Estudiante[] {
    return this.get().estudiantes;
  },

  getEstudianteByCedula(cedula: string): Estudiante | undefined {
    return this.get().estudiantes.find((e) => e.cedula.toLowerCase() === cedula.toLowerCase());
  },

  getProfesores(): Profesor[] {
    return this.get().profesores;
  },

  getProfesorByCedula(cedula: string): Profesor | undefined {
    return this.get().profesores.find((p) => p.cedula.toLowerCase() === cedula.toLowerCase());
  },

  getUsuarios(): Usuario[] {
    return this.get().usuarios;
  },

  getUsuarioByCedula(cedula: string): Usuario | undefined {
    return this.get().usuarios.find((u) => u.cedula.toLowerCase() === cedula.toLowerCase());
  },

  getTerminos(): string {
    return this.get().terminosYCondiciones;
  },
};
