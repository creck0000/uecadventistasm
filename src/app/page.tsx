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
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % heroImages.length);
  };

  return (
    <div>
      <section className="relative overflow-hidden bg-[#173344] min-h-[500px] md:min-h-[560px] flex items-center">
        {/* Dynamic Carousel Background Images */}
        <div className="pointer-events-none absolute inset-0">
          {heroImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={`Fachada e instalaciones del Colegio Adventista Sierra Maestra ${index + 1}`}
              className="absolute inset-0 h-full w-full object-cover"
              priority
              style={{
                opacity: index === current ? 0.6 : 0,
                transform: index === current ? "scale(1.05)" : "scale(1)",
                transition: "opacity 1200ms ease-in-out, transform 5000ms ease-out",
              }}
            />
          ))}
          {/* Subtle gradient overlay to guarantee text readability while keeping photos vivid */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#112430]/95 via-[#173344]/80 to-[#173344]/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 md:py-24">
          <Reveal>
            <div className="max-w-2xl">
              <span className="inline-block rounded-full bg-[#FFE58A]/20 px-3.5 py-1 text-xs font-semibold text-[#FFE58A] mb-3 border border-[#FFE58A]/30">
                Educación Integral Cristiana
              </span>
              <h1 className="mb-4 text-4xl md:text-5xl font-extrabold leading-tight text-white" style={{ fontFamily: "var(--font-title)" }}>
                Colegio Adventista Sierra Maestra
              </h1>
              <p className="mb-6 max-w-prose text-lg text-white/90">
                Educación con excelencia académica y valores en Maracaibo. Portal institucional y plataforma de gestión escolar.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/admisiones"
                  className="fx-btn rounded bg-[#FFE58A] px-6 py-3 font-bold text-[#1f2937] ring-1 ring-black/10 shadow hover:brightness-95 transition-all"
                >
                  Admisiones
                </a>
                <a
                  href="/registro"
                  className="fx-btn rounded bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur hover:bg-white/20 transition-all border border-white/20"
                >
                  Registrarme
                </a>
                <a
                  href="/login"
                  className="fx-btn rounded bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/15 transition-all border border-white/10"
                >
                  Ya tengo cuenta
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={prevSlide}
          aria-label="Foto anterior"
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur hover:bg-black/60 transition-all focus:outline-none cursor-pointer"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          aria-label="Siguiente foto"
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur hover:bg-black/60 transition-all focus:outline-none cursor-pointer"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Carousel Indicators / Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Ir a foto ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                idx === current
                  ? "w-8 bg-[#FFE58A]"
                  : "w-2.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[--primary]">Niveles Formativos</span>
              <h2 className="text-3xl font-extrabold text-[#111827]" style={{ fontFamily: "var(--font-title)" }}>
                Oferta Académica
              </h2>
            </div>
            <a href="/oferta-academica" className="text-xs font-bold text-[--primary] hover:underline">
              Ver plan de estudios completo →
            </a>
          </div>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[
            {
              t: "Educación Inicial",
              badge: "3 a 5 Años",
              d: "Desarrollo integral, estimulación temprana, aprendizaje lúdico y principios cristianos que cimentan el amor por el conocimiento.",
              features: ["Aulas climatizadas", "Formación en valores", "Iniciación al inglés"],
            },
            {
              t: "Educación Primaria",
              badge: "1° a 6° Grado",
              d: "Fortalecimiento del pensamiento lógico-matemático, lectoescritura avanzada, ciencias naturales y hábitos de disciplina personal.",
              features: ["Docentes titulados", "Clubes de lectura", "Educación musical"],
            },
            {
              t: "Media General",
              badge: "1° a 5° Año",
              d: "Sólida formación en ciencias puras, humanidades y tecnología. Preparación rigurosa para el éxito en los estudios universitarios.",
              features: ["Laboratorios de ciencias", "Orientación vocacional", "Proyectos de investigación"],
            },
          ].map((c, i) => (
            <Reveal key={c.t} delay={100 * i}>
              <div className="group rounded-2xl border border-black/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-[--primary] border border-blue-100">
                      {c.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#111827] mb-2">{c.t}</h3>
                  <p className="text-sm text-[#4b5563] leading-relaxed mb-4">{c.d}</p>
                  <ul className="space-y-1.5 border-t border-gray-100 pt-3 text-xs text-gray-600">
                    {c.features.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-emerald-600 font-bold">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 pt-3">
                  <a
                    href="/admisiones"
                    className="inline-block text-xs font-bold text-[--primary] group-hover:translate-x-1 transition-transform"
                  >
                    Solicitar admisión →
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <Reveal>
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[--primary]">Plataforma Digital</span>
            <h2 className="text-3xl font-extrabold text-[#111827]" style={{ fontFamily: "var(--font-title)" }}>
              Comunidad CASM
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              t: "Estudiantes",
              icon: "🎓",
              d: "Consulta tu boletín oficial de calificaciones por lapso, registro de asistencia y promedio acumulado.",
              link: "/login",
              btn: "Consultar Notas",
            },
            {
              t: "Profesores",
              icon: "👨‍🏫",
              d: "Visualiza los listados de alumnos de tus secciones asignadas, acompañamiento pedagógico y horarios.",
              link: "/login",
              btn: "Portal Docente",
            },
            {
              t: "Administración",
              icon: "🛡️",
              d: "Control total de calificaciones oficiales, aprobación de nuevas inscripciones y gestión de usuarios.",
              link: "/login",
              btn: "Panel de Control",
            },
          ].map((c, i) => (
            <Reveal key={c.t} delay={120 * i}>
              <div className="rounded-2xl border border-black/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between">
                <div>
                  <div className="text-3xl mb-3">{c.icon}</div>
                  <h3 className="text-lg font-bold text-[#111827] mb-2">{c.t}</h3>
                  <p className="text-sm text-[#4b5563] leading-relaxed mb-6">{c.d}</p>
                </div>
                <a
                  href={c.link}
                  className="fx-btn block text-center rounded-lg bg-gray-50 border border-gray-200 py-2.5 text-xs font-bold text-[--primary] hover:bg-[--primary] hover:text-white transition-all shadow-sm"
                >
                  {c.btn} →
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[--secondary]/20 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[--primary]">Actualidad y Vida Escolar</span>
                <h2 className="text-3xl font-extrabold text-[#111827]" style={{ fontFamily: "var(--font-title)" }}>
                  Noticias y Eventos
                </h2>
              </div>
              <p className="text-xs text-gray-500 max-w-xs">
                Actividades académicas, científicas y espirituales que enriquecen a nuestra comunidad educativa.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                img: "/campus/ciencia.jpg",
                tag: "Ciencia & Innovación",
                fecha: "12 Mar, 2026",
                titulo: "Feria Científica y Tecnológica CASM 2026",
                desc: "Estudiantes de Media General presentaron investigaciones científicas, experimentos de laboratorio y prototipos sostenibles con alto nivel académico.",
              },
              {
                img: "/campus/biblioteca.jpg",
                tag: "Vida Académica",
                fecha: "18 Mar, 2026",
                titulo: "Círculo Literario y Horas de Estudio Asistido",
                desc: "Nuestra biblioteca institucional abre nuevos espacios de lectura comprensiva, tutorías personalizadas y preparación para pruebas de ingreso.",
              },
              {
                img: "/campus/vida-estudiantil.jpg",
                tag: "Valores Cristianos",
                fecha: "25 Mar, 2026",
                titulo: "Semana de Énfasis Espiritual y Convivencia",
                desc: "Jornada devocional dedicada a fortalecer el carácter, la empatía y la fe mediante reflexiones bíblicas y actividades comunitarias en Maracaibo.",
              },
            ].map((n, i) => (
              <Reveal key={n.titulo} delay={100 * i}>
                <article className="group overflow-hidden rounded-2xl border border-black/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col h-full">
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    <img
                      src={n.img}
                      alt={n.titulo}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-[--primary]/90 backdrop-blur px-3 py-1 text-[11px] font-bold text-white shadow-sm">
                      {n.tag}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div className="mb-2 text-xs font-semibold text-gray-400">{n.fecha}</div>
                      <h3 className="mb-2 text-base font-bold text-[#111827] group-hover:text-[--primary] transition-colors leading-snug">
                        {n.titulo}
                      </h3>
                      <p className="text-xs text-[#4b5563] leading-relaxed">{n.desc}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <span className="text-xs font-bold text-[--primary] inline-flex items-center gap-1">
                        Leer más <span>→</span>
                      </span>
                    </div>
                  </div>
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

      <section className="bg-gradient-to-r from-[#173344] via-[#284f65] to-[#1c394a] text-white py-14 shadow-inner">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal>
            <div className="flex flex-col items-start gap-6 rounded-2xl bg-white/5 p-8 backdrop-blur md:flex-row md:items-center md:justify-between border border-white/10 shadow-lg">
              <div className="max-w-xl">
                <span className="inline-block rounded-full bg-[#FFE58A]/20 px-3.5 py-1 text-xs font-semibold text-[#FFE58A] mb-2.5 border border-[#FFE58A]/30">
                  Admisiones Abiertas
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "var(--font-title)" }}>
                  ¿Listos para formar parte de la comunidad CASM?
                </h2>
                <p className="mt-2 text-white/90 text-base">
                  Conoce nuestro proceso de admisión, requisitos y horarios de atención.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/admisiones"
                  className="fx-btn rounded-lg bg-[#FFE58A] px-6 py-3.5 font-bold text-[#1f2937] ring-1 ring-black/10 shadow hover:brightness-95 transition-all text-center"
                >
                  Comenzar Admisión
                </a>
                <a
                  href="/contacto"
                  className="fx-btn rounded-lg bg-white/15 px-6 py-3.5 font-semibold text-white hover:bg-white/25 transition-all border border-white/25 text-center backdrop-blur"
                >
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
