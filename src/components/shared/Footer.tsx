export default function Footer() {
  return (
    <footer className="mt-16 border-t border-black/10 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-black/70">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="text-[#111827] font-bold" style={{ fontFamily: "var(--font-title)" }}>
              Colegio Adventista Sierra Maestra
            </div>
            <div className="text-black/60">Educación integral con valores.</div>
          </div>
          <div>
            <div className="mb-2 font-semibold text-[#111827]">Enlaces</div>
            <div className="grid gap-1">
              <a href="/admisiones" className="hover:text-[--primary]">Admisiones</a>
              <a href="/oferta-academica" className="hover:text-[--primary]">Oferta Académica</a>
              <a href="/contacto" className="hover:text-[--primary]">Contacto</a>
            </div>
          </div>
          <div>
            <div className="mb-2 font-semibold text-[#111827]">Contacto</div>
            <div className="grid gap-1">
              <span>
                Dirección: N° 5-40, Calle 18, Maracaibo 4004, Zulia, Venezuela
              </span>
              <span>
                Teléfono: <a className="text-[--primary] underline" href="tel:+582617356593">+58 261-7356593</a>
              </span>
              <span>
                Correo: <a className="text-[--primary] underline" href="mailto:admisiones@casm.edu">admisiones@casm.edu</a>
              </span>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} CASM. Todos los derechos reservados.</span>
          <span className="text-[--primary] font-semibold">
            Proyecto de gestión escolar desarrollado por Jesús Pérez.
          </span>
        </div>
      </div>
    </footer>
  );
}
