import Reveal from "@/components/ui/Reveal";
import Link from "next/link";

export default function Nosotros() {
  return (
    <div>
      {/* Banner de Cabecera */}
      <section className="relative overflow-hidden bg-[#173344] py-16 md:py-20 text-white">
        <div className="absolute inset-0 opacity-25">
          <img
            src="/campus/vida-estudiantil.jpg"
            alt="Campus Colegio Adventista Sierra Maestra"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#112430]/95 via-[#173344]/90 to-[#173344]/70" />
        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <Reveal>
            <span className="inline-block rounded-full bg-[#FFE58A]/20 px-3.5 py-1 text-xs font-bold text-[#FFE58A] mb-3 border border-[#FFE58A]/30">
              Conócenos
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-white" style={{ fontFamily: "var(--font-title)" }}>
              Nuestra Identidad y Misión
            </h1>
            <p className="mt-3 max-w-2xl text-base md:text-lg text-white/90 leading-relaxed">
              Formando generaciones en Maracaibo con excelencia académica, vocación de servicio y sólidos principios cristianos.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contenido Principal */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-2 items-center mb-16">
          <Reveal>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[--primary]">Educación con Propósito</span>
              <h2 className="mt-1 text-3xl font-extrabold text-[#111827]" style={{ fontFamily: "var(--font-title)" }}>
                Más de tres décadas inspirando mentes y corazones
              </h2>
              <p className="mt-4 text-sm text-[#4b5563] leading-relaxed">
                El <strong>Colegio Adventista Sierra Maestra (CASM)</strong> es una institución educativa comprometida con el desarrollo armónico de las facultades físicas, mentales y espirituales de cada alumno. Formamos parte de la red mundial de educación adventista, reconocida globalmente por sus altos estándares morales y académicos.
              </p>
              <p className="mt-3 text-sm text-[#4b5563] leading-relaxed">
                Ubicados en la zona de Sierra Maestra (Maracaibo, Estado Zulia), brindamos un entorno seguro, disciplinado y lleno de afecto cristiano, donde cada estudiante es valorado como un ser único con potencial infinito para servir a Dios y al prójimo.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/admisiones"
                  className="fx-btn rounded-lg bg-[--primary] px-6 py-3 text-xs font-bold text-white shadow"
                >
                  Proceso de Admisión
                </Link>
                <Link
                  href="/contacto"
                  className="fx-btn rounded-lg border border-black/15 bg-white px-5 py-3 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Contáctanos
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="overflow-hidden rounded-2xl border border-black/10 shadow-lg bg-gray-100">
              <img
                src="/campus/biblioteca.jpg"
                alt="Estudiantes en biblioteca CASM"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>

        {/* Misión, Visión y Valores */}
        <div className="grid gap-6 md:grid-cols-3 mb-16">
          <Reveal delay={100}>
            <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-sm h-full flex flex-col justify-between">
              <div>
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="text-xl font-bold text-[#111827] mb-3">Nuestra Misión</h3>
                <p className="text-xs text-[#4b5563] leading-relaxed">
                  Promover una educación integral basada en la cosmovisión bíblica cristiana, preparando a niños y jóvenes para alcanzar el máximo rendimiento intelectual y servir activamente a la comunidad con ética y responsabilidad.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-sm h-full flex flex-col justify-between">
              <div>
                <div className="text-3xl mb-3">🔭</div>
                <h3 className="text-xl font-bold text-[#111827] mb-3">Nuestra Visión</h3>
                <p className="text-xs text-[#4b5563] leading-relaxed">
                  Ser una comunidad educativa líder en el occidente venezolano, referente por su calidad pedagógica, su clima de convivencia armónica y el impacto positivo de sus egresados en el ámbito profesional y social.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-sm h-full flex flex-col justify-between">
              <div>
                <div className="text-3xl mb-3">💎</div>
                <h3 className="text-xl font-bold text-[#111827] mb-3">Valores Esenciales</h3>
                <ul className="text-xs text-[#4b5563] space-y-2 mt-2">
                  <li className="flex items-center gap-2"><strong>● Fe en Dios:</strong> Base de toda sabiduría.</li>
                  <li className="flex items-center gap-2"><strong>● Integridad:</strong> Honestidad en el pensar y actuar.</li>
                  <li className="flex items-center gap-2"><strong>● Excelencia:</strong> Pasión por dar lo mejor.</li>
                  <li className="flex items-center gap-2"><strong>● Solidaridad:</strong> Compromiso con el prójimo.</li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Los 4 Pilares Formativos */}
        <div className="rounded-2xl bg-gradient-to-r from-[#173344] via-[#284f65] to-[#1c394a] p-8 md:p-12 text-white shadow-xl">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FFE58A]">Modelo Pedagógico Integral</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
                Los Cuatro Pilares del Estudiante CASM
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
              {[
                { icon: "🧠", t: "Desarrollo Intelectual", d: "Rigor científico, pensamiento crítico y amor por el saber." },
                { icon: "✝️", t: "Formación Espiritual", d: "Principios bíblicos aplicados a la vida diaria y devocionales." },
                { icon: "🤝", t: "Convivencia Social", d: "Empatía, liderazgo constructivo y respeto mutuo." },
                { icon: "🏃", t: "Salud y Disciplina", d: "Deportes, hábitos saludables y recreación enriquecedora." },
              ].map((p, i) => (
                <div key={i} className="rounded-xl bg-white/10 p-5 backdrop-blur border border-white/10 text-center">
                  <div className="text-3xl mb-2">{p.icon}</div>
                  <h4 className="font-bold text-sm text-[#FFE58A] mb-1">{p.t}</h4>
                  <p className="text-xs text-white/80 leading-relaxed">{p.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
