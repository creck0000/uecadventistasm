import { db } from "./dataStore";
import { Estudiante, Profesor } from "./types";

export const getEstudiantes = async (): Promise<Estudiante[]> => await db.getEstudiantes();
export const getProfesores = async (): Promise<Profesor[]> => await db.getProfesores();
