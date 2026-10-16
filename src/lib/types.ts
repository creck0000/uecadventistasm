export type Estudiante = {
  id: string;
  nombres: string;
  apellidos: string;
  cedula: string;
  fechaNacimiento: string;
  grado: string;
  seccion: string;
  turno: "Mañana" | "Tarde";
  notas: Array<{ lapso: string; asignatura: string; calificacion: number }>;
  asistencia: Array<{ fecha: string; presente: boolean }>;
};

export type Profesor = {
  id: string;
  nombres: string;
  apellidos: string;
  cedula: string;
  titulo: string;
  asignaturas: string[];
  gradosSecciones: Array<{ grado: string; seccion: string }>;
};
