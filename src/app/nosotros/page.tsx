import Reveal from "@/components/ui/Reveal";

export default function Nosotros() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <Reveal>
        <h1 className="mb-6 text-4xl font-extrabold text-[--primary]" style={{ fontFamily: "var(--font-title)" }}>
          Nosotros
        </h1>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2">
        <Reveal>
          <div className="rounded-xl border border-black/10 bg-white p-6">
            <p className="text-lg text-[#334155]">
              El Colegio Adventista Sierra Maestra promueve una educación integral basada en valores,
              excelencia académica y servicio a la comunidad.
            </p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="rounded-xl border border-black/10 bg-white p-6">
            <ul className="text-sm text-[#334155]">
              <li>Misión: formar ciudadanos íntegros con propósito.</li>
              <li>Visión: liderazgo con excelencia, fe y compromiso.</li>
              <li>Valores: respeto, responsabilidad, solidaridad.</li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
