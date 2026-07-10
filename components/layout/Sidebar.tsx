export default function Sidebar() {
  return (
    <>
      <nav className="hidden md:flex flex-col h-screen fixed left-0 top-0 py-lg bg-surface dark:bg-inverse-surface text-primary dark:text-primary-fixed font-body-md text-body-md w-72 border-r border-outline-variant shadow-md z-40">
        <div className="px-lg pb-lg mb-md border-b border-outline-variant/30 flex items-center gap-md">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant shadow-sm shrink-0">
            <img
              alt="Admin profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLmT37n7ruVq91kHRRGD7ieT5OP3_iIi1FwmxReXwdAo4KuYhaK0BNuwkQiJlSTiYAKq1oYxn2g-674mivBp3X0koAJKMq8EJT3rtA2X55JoBBWF6rrWEIUWFTtNxIcGUXlKbeMXh18567-yrRpzdcO0qTdBCCDpVOT0_y5Ml0hTo-EFTRZ4USJEdBSyNf0HvnK1QH8OdOOLK0R0UgyNanKNxWsp7zC6ORJijfXguvH4AcZeX3apJK3oQoyrv5sgF4LRJRkCTuY3A"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-primary">Koordinator Desa</span>
            <span className="font-label-sm text-label-sm text-text-secondary">Bambang, Kec. Wajak</span>
            <span className="font-label-sm text-label-sm text-primary mt-1 px-2 py-0.5 bg-primary-container/20 rounded-full w-fit">
              Hari ke-12
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-xs flex-1 overflow-y-auto px-xs">
          <a
            className="flex items-center gap-md px-md py-sm bg-primary-container text-on-primary-container font-semibold rounded-lg mx-2 active:opacity-80 transition-transform"
            href="/dashboard"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              grid_view
            </span>
            <span>Dashboard</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-high mx-2 rounded-lg hover:translate-x-1 transition-transform"
            href="/program-kerja"
          >
            <span className="material-symbols-outlined">task</span>
            <span>Program Kerja</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-high mx-2 rounded-lg hover:translate-x-1 transition-transform"
            href="/jadwal"
          >
            <span className="material-symbols-outlined">event_note</span>
            <span>Jadwal Kegiatan</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-high mx-2 rounded-lg hover:translate-x-1 transition-transform"
            href="/dokumentasi"
          >
            <span className="material-symbols-outlined">photo_library</span>
            <span>Dokumentasi</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-high mx-2 rounded-lg hover:translate-x-1 transition-transform"
            href="#"
          >
            <span className="material-symbols-outlined">description</span>
            <span>Laporan Akhir</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-high mx-2 rounded-lg hover:translate-x-1 transition-transform"
            href="#"
          >
            <span className="material-symbols-outlined">location_city</span>
            <span>Data Desa</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-high mx-2 rounded-lg hover:translate-x-1 transition-transform mt-auto"
            href="/admin"
          >
            <span className="material-symbols-outlined">settings_suggest</span>
            <span>Pengaturan Admin</span>
          </a>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 md:hidden bg-glass-surface dark:bg-glass-surface-strong backdrop-blur-xl text-primary dark:text-primary-fixed font-label-sm text-label-sm border-t border-glass-border shadow-[0_-8px_32px_rgba(31,66,52,0.12)]">
        <a
          className="flex flex-col items-center justify-center text-primary bg-secondary-container/50 rounded-xl px-3 py-1 active:scale-90 duration-200 hover:bg-surface-container-low transition-all"
          href="/dashboard"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            dashboard
          </span>
          <span>Dashboard</span>
        </a>
        <a
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-all"
          href="/program-kerja"
        >
          <span className="material-symbols-outlined">assignment</span>
          <span className="mt-1">Program</span>
        </a>
        <a
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-all"
          href="/jadwal"
        >
          <span className="material-symbols-outlined">calendar_today</span>
          <span className="mt-1">Jadwal</span>
        </a>
        <a
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-all"
          href="/dokumentasi"
        >
          <span className="material-symbols-outlined">folder_open</span>
          <span className="mt-1">Dokumen</span>
        </a>
        <a
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-all"
          href="/timeline"
        >
          <span className="material-symbols-outlined">linear_scale</span>
          <span className="mt-1">Timeline</span>
        </a>
      </nav>
    </>
  );
}
