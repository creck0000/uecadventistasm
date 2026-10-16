import { Estudiante, Profesor } from "./types";

export const estudiantes: Estudiante[] = [
  {
    id: "E-001",
    nombres: "María",
    apellidos: "González",
    cedula: "V-12345678",
    fechaNacimiento: "2008-05-12",
    grado: "3° Año",
    seccion: "B",
    turno: "Mañana",
    notas: [
      { lapso: "I", asignatura: "Matemática", calificacion: 18 },
      { lapso: "II", asignatura: "Lengua", calificacion: 17 },
      { lapso: "III", asignatura: "Historia", calificacion: 19 },
    ],
    asistencia: [
      { fecha: "2026-02-01", presente: true },
      { fecha: "2026-02-02", presente: false },
    ],
  },
];

export const profesores: Profesor[] = [
  {
    id: "P-001",
    nombres: "José",
    apellidos: "Pérez",
    cedula: "V-87654321",
    titulo: "Profesor en Educación Matemática",
    asignaturas: ["Matemática"],
    gradosSecciones: [{ grado: "3° Año", seccion: "B" }],
  },
];
