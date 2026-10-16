import Reveal from "@/components/ui/Reveal";

export default function Admisiones() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 bg-white">
      <Reveal>
        <h1 className="mb-6 text-4xl font-extrabold text-[--primary]" style={{ fontFamily: "var(--font-title)" }}>
          Admisiones
        </h1>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { t: "Requisitos", d: "Documento de identidad, boletín, constancia médica." },
          { t: "Proceso", d: "Preinscripción, evaluación, inscripción." },
          { t: "Cronograma", d: "Fechas por periodo académico." },
        ].map((c, i) => (
          <Reveal key={c.t} delay={120 * i}>
            <div className="rounded-xl border border-black/10 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="text-lg font-semibold text-[#111827]">{c.t}</div>
              <div className="text-sm text-[#334155]">{c.d}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
