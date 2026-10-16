import { firestore } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import fs from "fs";
import path from "path";
import { DatabaseSchema } from "./dataStore";

export async function seedCurrentDbToFirestore() {
  try {
    const dbFile = path.join(process.cwd(), "src", "data", "db.json");
    if (!fs.existsSync(dbFile)) return;
    const raw = fs.readFileSync(dbFile, "utf-8");
    const data: DatabaseSchema = JSON.parse(raw);

    console.log("Sincronizando base de datos inicial con Firebase Firestore...");

    // 1. Usuarios
    for (const u of data.usuarios) {
      await setDoc(doc(firestore, "usuarios", u.cedula), u, { merge: true });
    }

    // 2. Estudiantes
    for (const e of data.estudiantes) {
      await setDoc(doc(firestore, "estudiantes", e.cedula), e, { merge: true });
    }

    // 3. Profesores
    for (const p of data.profesores) {
      await setDoc(doc(firestore, "profesores", p.cedula), p, { merge: true });
    }

    // 4. Solicitudes
    for (const s of data.solicitudes) {
      await setDoc(doc(firestore, "solicitudes", s.id), s, { merge: true });
    }

    console.log("¡Sincronización inicial con Firebase Firestore completada con éxito!");
  } catch (err) {
    console.warn("Advertencia al sincronizar con Firestore:", err);
  }
}
