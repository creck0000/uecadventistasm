import Reveal from "@/components/ui/Reveal";

export default function Contacto() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <Reveal>
        <h1 className="mb-6 text-4xl font-extrabold text-[--primary]" style={{ fontFamily: "var(--font-title)" }}>
          Contacto
        </h1>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-3">
        <Reveal>
          <div className="rounded-xl border border-black/10 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-md">
            <h2 className="mb-2 text-xl font-semibold text-[#111827]">Dirección</h2>
            <p className="text-[#334155]">
              N° 5-40, Calle 18, Maracaibo 4004, Zulia, Venezuela
              <br />
              <a className="text-[--primary] underline" href="https://maps.google.com/?q=N%C2%BA%205-40%20Calle%2018,%20Maracaibo%204004,%20Zulia,%20Venezuela" target="_blank" rel="noreferrer">
                Ver en Google Maps
              </a>
            </p>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="rounded-xl border border-black/10 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-md">
            <h2 className="mb-2 text-xl font-semibold text-[#111827]">Teléfono</h2>
            <p className="text-[#334155]">
              <a className="text-[--primary] underline" href="tel:+582617356593">+58 261-7356593</a>
            </p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="rounded-xl border border-black/10 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-md">
            <h2 className="mb-2 text-xl font-semibold text-[#111827]">Atención</h2>
            <p className="text-[#334155]">Lunes a Viernes, 7:00 am – 3:00 pm</p>
          </div>
        </Reveal>
        <Reveal delay={160}>
          <div className="rounded-xl border border-black/10 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-md">
            <h2 className="mb-2 text-xl font-semibold text-[#111827]">Correo</h2>
            <p className="text-[#334155]">
              <a className="text-[--primary] underline" href="mailto:admisiones@casm.edu">admisiones@casm.edu</a>
            </p>
          </div>
        </Reveal>
      </div>
      <Reveal>
        <div className="mt-8 rounded-xl border border-black/10 bg-white p-4">
          <h2 className="mb-3 text-xl font-semibold text-[#111827]">Mapa</h2>
          <div className="overflow-hidden rounded-lg">
            <iframe
              title="Ubicación CASM"
              src="https://www.google.com/maps?q=10.5821491,-71.6451931&z=16&output=embed"
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
