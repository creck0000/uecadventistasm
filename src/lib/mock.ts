import { db } from "./dataStore";
import { Estudiante, Profesor } from "./types";

export const getEstudiantes = (): Estudiante[] => db.getEstudiantes();
export const getProfesores = (): Profesor[] => db.getProfesores();

export const estudiantes: Estudiante[] = db.getEstudiantes();
export const profesores: Profesor[] = db.getProfesores();
