import Reveal from "@/components/ui/Reveal";
import Link from "next/link";
import {
  FolderOpen,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function Admisiones() {
  return (
    <div>
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-[#173344] py-16 text-white">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/campus/vida-estudiantil.jpg"
            alt="Estudiantes en el Colegio Adventista Sierra Maestra"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#112430]/95 via-[#173344]/90 to-[#173344]/70" />
        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFE58A]/20 px-3.5 py-1 text-xs font-bold text-[#FFE58A] mb-3 border border-[#FFE58A]/30">
              <Sparkles className="w-3.5 h-3.5" />
              Proceso de Ingreso 2025-2026
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-white" style={{ fontFamily: "var(--font-title)" }}>
              Admisiones y Matrícula Escolar
            </h1>
            <p className="mt-3 max-w-2xl text-base md:text-lg text-white/90 leading-relaxed">
              Forma parte de la gran familia del Colegio Adventista Sierra Maestra. Conoce los requisitos y completa tu postulación en línea.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pasos de Admisión */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[--primary]">Paso a Paso</span>
            <h2 className="text-3xl font-extrabold text-[#111827] mt-1" style={{ fontFamily: "var(--font-title)" }}>
              ¿Cómo ingresar al CASM?
            </h2>
            <p className="text-xs text-gray-500 mt-2">
              Un proceso ágil, transparente y coordinado con nuestra secretaría y dirección académica.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3 mb-16">
          {[
            {
              num: "01",
              t: "Solicitud Digital",
              d: "Completa el formulario en línea con los datos del estudiante y representante, aceptando el reglamento interno del colegio.",
              badge: "En línea",
            },
            {
              num: "02",
              t: "Revisión Administrativa",
              d: "El Administrador evalúa la solicitud, disponibilidad de cupos en el grado solicitado y te contactará para formalizar.",
              badge: "Evaluación",
            },
            {
              num: "03",
              t: "Activación y Boletín",
              d: "Una vez aprobada tu inscripción, tu cuenta queda activa y podrás consultar calificaciones y asistencias en nuestro portal.",
              badge: "Ingreso Oficial",
            },
          ].map((c, i) => (
            <Reveal key={c.num} delay={100 * i}>
              <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-[--primary] font-mono">{c.num}</span>
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-[--primary] border border-blue-100">
                      {c.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#111827] mb-2">{c.t}</h3>
                  <p className="text-xs text-[#4b5563] leading-relaxed">{c.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Requisitos y Documentación */}
        <div className="grid gap-8 lg:grid-cols-2 items-start mb-16">
          <Reveal>
            <div className="rounded-2xl border border-black/10 bg-white p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-2.5 mb-4 border-b pb-3">
                <div className="p-2 rounded-lg bg-blue-50 text-[--primary] border border-blue-100">
                  <FolderOpen className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#111827]">
                  Documentos Requeridos
                </h3>
              </div>
              <ul className="space-y-3.5 text-xs text-gray-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Cédula de Identidad o Cédula Escolar:</strong> Fotocopia legible del alumno y de ambos padres o representante legal.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Partida de Nacimiento:</strong> Copia certificada del acta de nacimiento del estudiante.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Boletín de Calificaciones o Notas Certificadas:</strong> Del último año o lapso escolar cursado.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Constancia de Buena Conducta:</strong> Emitida por la institución educativa de procedencia.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Fotografías tipo Carnet:</strong> 4 fotos recientes del estudiante y 2 del representante en fondo blanco.
                  </div>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-2xl border border-black/10 bg-white p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-2.5 mb-4 border-b pb-3">
                <div className="p-2 rounded-lg bg-blue-50 text-[--primary] border border-blue-100">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#111827]">
                  Horarios de Atención Presencial
                </h3>
              </div>
              <p className="text-xs text-[#4b5563] leading-relaxed mb-4">
                Si deseas consignar documentos físicos o recibir asesoría personalizada, puedes acudir a nuestra sede institucional en Sierra Maestra:
              </p>
              <div className="space-y-3 text-xs text-gray-700 bg-gray-50 p-4 rounded-xl border">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[--primary] flex-shrink-0 mt-0.5" />
                  <div><strong>Dirección:</strong> N° 5-40, Calle 18, Sierra Maestra, Maracaibo, Zulia.</div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[--primary] flex-shrink-0 mt-0.5" />
                  <div><strong>Atención de Secretaría:</strong> Lunes a Jueves de 7:30 AM a 1:00 PM / Viernes de 7:30 AM a 12:00 PM.</div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[--primary] flex-shrink-0 mt-0.5" />
                  <div><strong>Teléfono Directo:</strong> +58 261-7356593</div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-[--primary] flex-shrink-0 mt-0.5" />
                  <div><strong>Correo de Admisiones:</strong> admisiones@casm.edu</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* CTA Directo a Registro */}
        <div className="rounded-2xl bg-gradient-to-r from-[#173344] via-[#284f65] to-[#1c394a] p-8 text-white text-center shadow-xl">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-2">¡Inicia tu postulación hoy mismo!</h3>
          <p className="text-xs text-white/80 max-w-lg mx-auto mb-6">
            Ingresa a nuestro formulario oficial de solicitud para reservar tu cupo y dar el primer paso hacia una educación con excelencia.
          </p>
          <Link
            href="/registro"
            className="fx-btn inline-flex items-center gap-1.5 rounded-lg bg-[#FFE58A] px-8 py-3.5 text-xs font-bold text-[#1f2937] ring-1 ring-black/10 shadow hover:brightness-95 transition-all"
          >
            <span>Llenar Solicitud de Admisión</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
