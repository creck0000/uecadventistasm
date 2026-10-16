import Reveal from "@/components/ui/Reveal";
import Link from "next/link";

export default function OfertaAcademica() {
  return (
    <div>
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-[#173344] py-16 text-white">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/campus/ciencia.jpg"
            alt="Laboratorios de Ciencias del CASM"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#112430]/95 via-[#173344]/90 to-[#173344]/70" />
        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <Reveal>
            <span className="inline-block rounded-full bg-[#FFE58A]/20 px-3.5 py-1 text-xs font-bold text-[#FFE58A] mb-3 border border-[#FFE58A]/30">
              Excelencia Curricular
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-white" style={{ fontFamily: "var(--font-title)" }}>
              Oferta Académica Integral
            </h1>
            <p className="mt-3 max-w-2xl text-base md:text-lg text-white/90 leading-relaxed">
              Desde los primeros pasos hasta la graduación de bachillerato en ciencias, brindamos una formación sólida y con principios.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Niveles Detallados */}
      <section className="mx-auto max-w-7xl px-4 py-16 space-y-16">
        {/* 1. Nivel Inicial */}
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <Reveal>
            <div>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-[--primary]">
                Nivel Inicial (3 a 5 Años)
              </span>
              <h2 className="mt-3 text-2xl md:text-3xl font-extrabold text-[#111827]">
                Educación Inicial y Preescolar
              </h2>
              <p className="mt-3 text-sm text-[#4b5563] leading-relaxed">
                Diseñado para despertar la curiosidad natural del niño a través de metodologías lúdicas, desarrollo de la psicomotricidad, expresión artística y formación afectivo-espiritual con historias bíblicas y valores cristianos.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-gray-700">
                <div className="rounded-lg bg-gray-50 p-3 border">
                  <strong>🎨 Áreas de Aprendizaje:</strong>
                  <p className="mt-1 text-gray-500">Cognitiva, socioemocional, psicomotriz y lenguaje.</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-3 border">
                  <strong>⏰ Horario Escolar:</strong>
                  <p className="mt-1 text-gray-500">Turno Mañana: 7:30 AM a 11:45 AM.</p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-sm text-gray-900 mb-3">Características del Nivel Inicial:</h3>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  Acompañamiento personalizado con docentes especialistas en primera infancia.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  Ambientes lúdicos, seguros y climatizados.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  Iniciación fonética al inglés y estímulo a la lectura interactiva.
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        {/* 2. Nivel Primaria */}
        <div className="grid gap-8 lg:grid-cols-2 items-center border-t pt-12">
          <Reveal delay={100}>
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm order-2 lg:order-1">
              <h3 className="font-bold text-sm text-gray-900 mb-3">Enfoque Pedagógico en Primaria:</h3>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  Énfasis en matemáticas aplicadas, cálculo mental y razonamiento numérico.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  Clubes de lectura y ortografía con biblioteca escolar activa.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  Educación ambiental y proyectos de cuidado del entorno.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  Actividades de coro escolar y valores cristianos aplicados.
                </li>
              </ul>
            </div>
          </Reveal>
          <Reveal>
            <div className="order-1 lg:order-2">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-[--primary]">
                Nivel Primaria (1° a 6° Grado)
              </span>
              <h2 className="mt-3 text-2xl md:text-3xl font-extrabold text-[#111827]">
                Educación Primaria Integral
              </h2>
              <p className="mt-3 text-sm text-[#4b5563] leading-relaxed">
                Consolidamos las destrezas fundamentales de lectoescritura, pensamiento científico y valores cívicos. Fomentamos la disciplina de estudio diario en un ambiente motivador que prepara con excelencia hacia la secundaria.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-gray-700">
                <div className="rounded-lg bg-gray-50 p-3 border">
                  <strong>📚 Asignaturas Troncales:</strong>
                  <p className="mt-1 text-gray-500">Lenguaje, Matemática, Ciencias Naturales, Ciencias Sociales e Inglés.</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-3 border">
                  <strong>⏰ Horario Escolar:</strong>
                  <p className="mt-1 text-gray-500">Turno Mañana: 7:00 AM a 12:30 PM.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* 3. Media General */}
        <div className="grid gap-8 lg:grid-cols-2 items-center border-t pt-12">
          <Reveal>
            <div>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-[--primary]">
                Media General (1° a 5° Año)
              </span>
              <h2 className="mt-3 text-2xl md:text-3xl font-extrabold text-[#111827]">
                Bachillerato en Ciencias
              </h2>
              <p className="mt-3 text-sm text-[#4b5563] leading-relaxed">
                Formación preuniversitaria de alto rigor académico. Los estudiantes desarrollan proyectos científicos, análisis humanístico y dominan las ciencias exactas para ingresar con honores a las principales universidades nacionales e internacionales.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-gray-700">
                <div className="rounded-lg bg-gray-50 p-3 border">
                  <strong>🔬 Laboratorios y Prácticas:</strong>
                  <p className="mt-1 text-gray-500">Física, Química Orgánica e Inorgánica, Biología Celular y Genética.</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-3 border">
                  <strong>🎓 Título Obtenido:</strong>
                  <p className="mt-1 text-gray-500">Bachiller en Ciencias (avalado por el Ministerio de Educación).</p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="overflow-hidden rounded-2xl border border-black/10 shadow-sm bg-gray-100">
              <img
                src="/campus/ciencia.jpg"
                alt="Estudiantes en laboratorio CASM"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>

        {/* CTA Admisión */}
        <div className="rounded-2xl bg-gradient-to-r from-[#173344] via-[#284f65] to-[#1c394a] p-8 text-white text-center shadow-lg">
          <h3 className="text-2xl font-bold mb-2">¿Deseas inscribir a tu representado en el CASM?</h3>
          <p className="text-xs text-white/80 max-w-lg mx-auto mb-6">
            Las solicitudes de admisión para el próximo período escolar están disponibles a través de nuestro portal digital.
          </p>
          <Link
            href="/registro"
            className="fx-btn inline-block rounded-lg bg-[#FFE58A] px-8 py-3 text-xs font-bold text-[#1f2937] ring-1 ring-black/10 shadow"
          >
            Comenzar Solicitud de Inscripción →
          </Link>
        </div>
      </section>
    </div>
  );
}
