import Reveal from "@/components/ui/Reveal";

export default function OfertaAcademica() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <Reveal>
        <h1 className="mb-6 text-4xl font-extrabold text-[--primary]" style={{ fontFamily: "var(--font-title)" }}>
          Oferta Académica
        </h1>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { t: "Inicial", d: "Aprendizaje lúdico y desarrollo socioemocional." },
          { t: "Primaria", d: "Acompañamiento y hábitos de estudio con valores." },
          { t: "Media General", d: "Ciencias, humanidades y tecnología." },
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
