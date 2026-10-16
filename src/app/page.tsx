"use client";
import { useEffect, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import Image from "next/image";
import hero01 from "@/images/hero sierra/01.png";
import hero02 from "@/images/hero sierra/02.png";
import hero03 from "@/images/hero sierra/03.png";
import hero04 from "@/images/hero sierra/04.png";
import hero05 from "@/images/hero sierra/05.png";

const heroImages = [hero01, hero02, hero03, hero04, hero05];

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <section className="relative overflow-hidden bg-[--primary]">
        <div className="pointer-events-none absolute inset-0">
          {heroImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="Fachada del Colegio Adventista Sierra Maestra"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1800ms] ease-out ${
                index === current ? "opacity-35" : "opacity-0"
              }`}
              priority={index === 0}
            />
          ))}
          <div className="absolute inset-0 bg-[--primary]/40" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:py-24">
          <Reveal>
            <div className="max-w-2xl">
              <h1 className="mb-4 text-4xl md:text-5xl font-extrabold leading-tight text-white" style={{ fontFamily: "var(--font-title)" }}>
                Colegio Adventista Sierra Maestra
              </h1>
              <p className="mb-6 max-w-prose text-lg text-white">
                Educación con excelencia académica y valores en Maracaibo. Portal institucional y plataforma de gestión escolar.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/admisiones"
                  className="fx-btn rounded bg-[#FFE58A] px-6 py-3 font-bold text-[#1f2937] ring-1 ring-black/10 shadow"
                >
                  Admisiones
                </a>
                <a href="/registro" className="fx-btn rounded bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur">
                  Registrarme
                </a>
                <a href="/login" className="fx-btn rounded bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur">
                  Ya tengo cuenta
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <Reveal>
          <h2 className="mb-6 text-2xl font-bold text-[--primary]" style={{ fontFamily: "var(--font-title)" }}>
            Oferta Académica
          </h2>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[
            { t: "Inicial", d: "Desarrollo integral y aprendizaje lúdico." },
            { t: "Primaria", d: "Formación académica con valores." },
            { t: "Media General", d: "Ciencias, humanidades y tecnología." },
          ].map((c, i) => (
            <Reveal key={c.t} delay={100 * i}>
              <div className="rounded-xl border border-black/10 bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="text-lg font-semibold text-[#111827]">{c.t}</div>
                <div className="text-sm text-[#334155]">{c.d}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <Reveal>
          <h2 className="mb-6 text-2xl font-bold text-[--primary]" style={{ fontFamily: "var(--font-title)" }}>
            Comunidad
          </h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { t: "Estudiantes", d: "Panel con notas, promedio y asistencia." },
            { t: "Profesores", d: "Carga de notas y reportes de curso." },
            { t: "Administración", d: "Gestión de periodos y usuarios." },
          ].map((c, i) => (
            <Reveal key={c.t} delay={120 * i}>
              <div className="rounded-xl border border-black/10 bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="text-lg font-semibold text-[#111827]">{c.t}</div>
                <div className="text-sm text-[#334155]">{c.d}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[--secondary]/20">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <Reveal>
            <h2 className="mb-6 text-2xl font-bold text-[--primary]" style={{ fontFamily: "var(--font-title)" }}>
              Noticias y Eventos
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Reveal key={i} delay={100 * i}>
                <article className="rounded-xl border border-black/10 bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="mb-2 text-xs text-[#475569]">Mar {10 + i}, 2026</div>
                  <h3 className="mb-1 text-base font-semibold text-[#111827]">Evento institucional {i}</h3>
                  <p className="text-sm text-[#334155]">
                    Resumen del evento y objetivos académicos y comunitarios.
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-4 py-12">
          <Reveal>
            <h2 className="mb-6 text-2xl font-bold text-[--primary]" style={{ fontFamily: "var(--font-title)" }}>
              Resultados y Alcance
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { n: "95%", d: "Promoción anual" },
              { n: "30+", d: "Docentes titulados" },
              { n: "500+", d: "Estudiantes activos" },
            ].map((s, i) => (
              <Reveal key={s.n} delay={90 * i}>
                <div className="rounded-xl border border-black/10 bg-white p-6 text-center">
                  <div className="text-3xl font-extrabold text-[#111827]">{s.n}</div>
                  <div className="text-sm text-[#334155]">{s.d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[--primary]">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <Reveal>
            <div className="flex flex-col items-start gap-4 text-white md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-title)" }}>
                  ¿Listos para formar parte de la comunidad CASM?
                </h2>
                <p className="text-white/85">Conoce nuestro proceso de admisión y horarios de atención.</p>
              </div>
              <div className="flex gap-3">
                <a
                  href="/admisiones"
                  className="rounded bg-[#FFE58A] px-6 py-3 font-bold text-[#1f2937] ring-1 ring-black/10 shadow hover:brightness-95"
                >
                  Comenzar Admisión
                </a>
                <a href="/contacto" className="rounded bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/20">
                  Hablar con nosotros
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
