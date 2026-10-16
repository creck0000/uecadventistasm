import Reveal from "@/components/ui/Reveal";
import { MapPin, Phone, Clock, Mail, ExternalLink, Sparkles } from "lucide-react";

export default function Contacto() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <Reveal>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFE58A]/30 px-3.5 py-1 text-xs font-bold text-[#1f2937] mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Atención a la Comunidad
        </span>
        <h1 className="mb-3 text-3xl md:text-4xl font-extrabold text-[#111827]" style={{ fontFamily: "var(--font-title)" }}>
          Canales de Contacto Directo
        </h1>
        <p className="mb-8 text-sm text-[#4b5563] max-w-2xl">
          Estamos a tu disposición para atender consultas de admisiones, solicitudes de constancias académicas o visitas guiadas a nuestra sede.
        </p>
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal>
          <div className="rounded-2xl border border-black/10 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-md h-full flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-[--primary] border border-blue-100 mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <h2 className="mb-1 text-base font-bold text-[#111827]">Ubicación</h2>
              <p className="text-xs text-[#4b5563] leading-relaxed">
                N° 5-40, Calle 18, Sierra Maestra, Maracaibo 4004, Zulia, Venezuela.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t">
              <a
                className="inline-flex items-center gap-1 text-xs font-bold text-[--primary] hover:underline"
                href="https://maps.google.com/?q=N%C2%BA%205-40%20Calle%2018,%20Maracaibo%204004,%20Zulia,%20Venezuela"
                target="_blank"
                rel="noreferrer"
              >
                <span>Ver en Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="rounded-2xl border border-black/10 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-md h-full flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 mb-3">
                <Phone className="w-5 h-5" />
              </div>
              <h2 className="mb-1 text-base font-bold text-[#111827]">Teléfono</h2>
              <p className="text-xs text-[#4b5563] leading-relaxed">
                Línea fija de secretaría y coordinación académica general.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t">
              <a className="text-xs font-bold text-[--primary] hover:underline" href="tel:+582617356593">
                +58 261-7356593
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-2xl border border-black/10 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-md h-full flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-100 mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h2 className="mb-1 text-base font-bold text-[#111827]">Horario</h2>
              <p className="text-xs text-[#4b5563] leading-relaxed">
                Lunes a Jueves: 7:30 am – 1:00 pm<br />
                Viernes: 7:30 am – 12:00 m
              </p>
            </div>
            <div className="mt-4 pt-3 border-t text-[11px] text-gray-400">
              Días hábiles escolares
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="rounded-2xl border border-black/10 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-md h-full flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-purple-50 text-purple-700 border border-purple-100 mb-3">
                <Mail className="w-5 h-5" />
              </div>
              <h2 className="mb-1 text-base font-bold text-[#111827]">Correo Oficial</h2>
              <p className="text-xs text-[#4b5563] leading-relaxed">
                Recepción de recaudos digitales y correspondencia institucional.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t">
              <a className="text-xs font-bold text-[--primary] hover:underline" href="mailto:admisiones@casm.edu">
                admisiones@casm.edu
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={200}>
        <div className="mt-8 rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-[#111827]">Plano de Ubicación en Maracaibo</h2>
              <p className="text-xs text-gray-500">Sierra Maestra, Parroquia Francisco Eugenio Bustamante / San Francisco</p>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[--primary] border border-blue-100 hidden sm:inline-block">
              Sede Principal CASM
            </span>
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-200">
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
