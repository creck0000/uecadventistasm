export type Rol = "admin" | "profesor" | "estudiante";
export type EstadoUsuario = "activo" | "pendiente" | "rechazado";

export type Nota = {
  id: string;
  lapso: "I" | "II" | "III";
  asignatura: string;
  calificacion: number;
  observacion?: string;
  fechaRegistro: string;
};

export type Asistencia = {
  fecha: string;
  presente: boolean;
};

export type Estudiante = {
  id: string;
  nombres: string;
  apellidos: string;
  cedula: string;
  email?: string;
  fechaNacimiento: string;
  grado: string;
  seccion: string;
  turno: "Mañana" | "Tarde";
  estadoInscripcion: EstadoUsuario;
  nombreRepresentante?: string;
  telefonoRepresentante?: string;
  notas: Nota[];
  asistencia: Asistencia[];
  fechaRegistro: string;
};

export type Profesor = {
  id: string;
  nombres: string;
  apellidos: string;
  cedula: string;
  email?: string;
  titulo: string;
  asignaturas: string[];
  gradosSecciones: Array<{ grado: string; seccion: string }>;
  estado: EstadoUsuario;
};

export type SolicitudInscripcion = {
  id: string;
  estudianteId: string;
  nombres: string;
  apellidos: string;
  cedula: string;
  email: string;
  grado: string;
  turno: "Mañana" | "Tarde";
  nombreRepresentante: string;
  telefonoRepresentante: string;
  terminosAceptados: boolean;
  fechaSolicitud: string;
  estado: EstadoUsuario;
  motivoRechazo?: string;
};

export type Usuario = {
  id: string;
  cedula: string;
  email: string;
  rol: Rol;
  estado: EstadoUsuario;
  fechaRegistro: string;
};
