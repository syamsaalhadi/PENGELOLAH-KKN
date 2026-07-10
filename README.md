# KKN Desa Bambang Management System

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.2.10-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8)
![License](https://img.shields.io/badge/license-Private-red)

**Sistem manajemen terpadu untuk koordinasi program KKN Kelompok 11 Desa Bambang**

[Dokumentasi](#dokumentasi) • [Fitur](#fitur-utama) • [Tech Stack](#tech-stack) • [Development](#development)

</div>

---

## 📋 Tentang Project

**KKN Desa Bambang Management System** adalah aplikasi web internal yang dirancang sebagai **pusat kendali operasional** bagi seluruh anggota Kelompok KKN 11 selama masa pengabdian 30 hari di Desa Bambang.

### Masalah yang Diselesaikan

- ❌ Jadwal tersebar di grup WhatsApp
- ❌ Rundown disimpan di file Word terpisah
- ❌ Dokumentasi tersebar
- ❌ Sulit tracking progress program kerja
- ❌ Banyak pertanyaan berulang

### Solusi

✅ **Satu dashboard terpusat** untuk semua informasi  
✅ **Real-time tracking** progress program  
✅ **Dokumentasi terpusat** (foto, video, laporan)  
✅ **Role-based access** (Admin & Anggota)  
✅ **Timeline visual** 30 hari  

---

## ✨ Fitur Utama

### 🎯 Dashboard Real-time
- Countdown hari ke-N dari 30 hari
- Progress overview semua program kerja
- Agenda hari ini
- Pengumuman terbaru

### 📅 Timeline 30 Hari
- Visualisasi kalender interaktif
- Detail kegiatan per hari
- Status: Selesai, Sedang Berjalan, Akan Datang

### 📊 Manajemen Program Kerja
- 11 program kerja dengan detail lengkap
- Status tracking (Belum Dimulai, Berjalan, Selesai)
- Kategori: Lingkungan, Pendidikan, Ekonomi, dll
- Progress bar visual

### 📸 Dokumentasi Terpusat
- Upload foto, video, PDF, laporan
- Preview langsung di halaman
- Filter berdasarkan jenis file
- Download file

### ⏰ Jadwal & Rundown
- Jadwal harian dengan detail lengkap
- Rundown acara per program
- PIC dan lokasi kegiatan

### ☑️ Checklist Persiapan
- Checklist per program kerja
- Toggle status selesai/belum
- Progress tracking

### 🔔 Pengumuman
- Prioritas (Penting/Biasa)
- Notifikasi visual
- Arsip lengkap

### 👥 Manajemen Anggota (Admin Only)
- Tambah/edit/hapus anggota
- Role management (Admin/Anggota)
- Profil anggota

---

## 🎨 Design System

### Glassmorphism Modern Theme

**Typography:**
- Heading: **Fira Code** (Monospace)
- Body: **Fira Sans** (Sans-serif)

**Color Palette:**
- Primary: `#7C3AED` (Purple)
- Secondary: `#A78BFA` (Light Purple)
- CTA/Success: `#22C55E` (Green)
- Background: Gradient Purple-Violet-Fuchsia

**Effects:**
- Glassmorphic cards dengan backdrop blur
- Smooth transitions (200ms)
- Hover states dengan scale transform
- Focus visible untuk accessibility

**Design Principles:**
- Mobile-first responsive design
- WCAG 2.1 Level AA contrast
- Reduced motion support
- Consistent spacing & shadows

---

## 🛠 Tech Stack

### Frontend
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [TailwindCSS 4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

### Backend (Planned)
- **BaaS:** [Supabase](https://supabase.com/)
  - Authentication (Email/Password)
  - PostgreSQL Database + RLS
  - Storage (Files)
  - Realtime (Future)

### State Management (Planned)
- **Data Fetching:** [TanStack Query](https://tanstack.com/query)
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

### Deployment
- **Hosting:** [Vercel](https://vercel.com/)
- **Domain:** TBD

---

## 🚀 Development

### Prerequisites

Pastikan sudah terinstall:
- **Node.js** 20.x atau lebih tinggi
- **npm** atau **yarn** atau **pnpm**

### Installation

```bash
# Clone repository
git clone <repository-url>
cd kkn-bambang

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local dengan Supabase credentials
```

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development Server

```bash
# Run development server
npm run dev

# Open http://localhost:3000
```

### Deployment

```bash
# Build for production
npm run build

# Run production build locally
npm start
```

**Deploy ke Vercel:**

1. Push code ke GitHub repository
2. Login ke [Vercel](https://vercel.com)
3. Import project dari GitHub
4. Tambahkan environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_APP_URL` (ganti dengan URL production)
5. Deploy!

**Environment Variables di Vercel:**
- Go to Project Settings → Environment Variables
- Copy semua variables dari `.env.local`
- Jangan lupa update `NEXT_PUBLIC_APP_URL` dengan URL production Anda

### Linting

```bash
# Run ESLint
npm run lint
```

---

## 📁 Project Structure

```
kkn-bambang/
├── app/
│   ├── (public)/
│   │   ├── page.tsx              # Landing Page
│   │   └── login/                # Login Page
│   ├── (protected)/
│   │   ├── dashboard/            # Main Dashboard
│   │   ├── timeline/             # Timeline 30 Hari
│   │   ├── program-kerja/        # Program Kerja (planned)
│   │   ├── jadwal/               # Jadwal (planned)
│   │   ├── dokumentasi/          # Dokumentasi (planned)
│   │   └── pengumuman/           # Pengumuman (planned)
│   ├── (admin)/                  # Admin routes (planned)
│   ├── unauthorized/             # 403 Page
│   ├── layout.tsx                # Root Layout
│   └── globals.css               # Global Styles
├── components/                   # React Components (planned)
│   ├── ui/                       # UI Primitives
│   ├── shared/                   # Shared Components
│   └── features/                 # Feature Components
├── lib/                          # Libraries & Utils (planned)
│   ├── supabase/                 # Supabase Client
│   └── utils/                    # Utility Functions
├── design-system/                # Design System Docs
├── public/                       # Static Assets
├── .kiro/                        # Kiro Config & Steering
└── prd.md                        # Product Requirements Doc
```

---

## 👥 User Roles & Permissions

### Admin
- Ketua, Sekretaris, PJ Divisi Acara
- **Full Access:** CRUD semua data
- Akses ke `/admin/*` routes

### Anggota
- Anggota kelompok non-pengurus
- **Read-Only:** Lihat semua informasi
- Tidak bisa edit/hapus data

---

## 🗺 Roadmap

### ✅ Phase 1: Frontend UI (Completed)
- [x] Landing Page dengan glassmorphism
- [x] Login Page dengan form validation
- [x] Dashboard dengan stats & cards
- [x] Timeline 30 hari interaktif
- [x] Program Kerja list dengan search & filter
- [x] Dokumentasi gallery dengan filter type
- [x] Pengumuman list dengan priority badges
- [x] Admin Dashboard dengan quick actions
- [x] 404 Not Found page
- [x] Unauthorized page (403)
- [x] Global CSS dengan design system

### 🚧 Phase 2: Backend Integration (Next)
- [ ] Setup Supabase project
- [ ] Database schema & RLS policies
- [ ] Authentication flow
- [ ] API routes untuk CRUD operations
- [ ] Data seeding (11 program kerja)

### 📋 Phase 3: Core Features
- [ ] Program Kerja pages (list, detail, CRUD)
- [ ] Jadwal & Rundown management
- [ ] Dokumentasi upload & gallery
- [ ] Checklist system
- [ ] Pengumuman system
- [ ] Anggota management (Admin)

### 🎯 Phase 4: Polish & Testing
- [ ] Loading states & skeletons
- [ ] Error handling & toast notifications
- [ ] Form validation dengan Zod
- [ ] Responsive testing all breakpoints
- [ ] Performance optimization
- [ ] Accessibility audit

### 🚀 Phase 5: Deployment
- [x] Production build tested
- [x] Security headers configured
- [x] Environment variables documented
- [ ] Deploy to Vercel
- [ ] Configure environment variables in Vercel
- [ ] Test production deployment
- [ ] Domain setup (optional)
- [ ] Monitoring & analytics
- [ ] User acceptance testing

---

## 📚 Dokumentasi

### PRD (Product Requirements Document)
Lihat [prd.md](./prd.md) untuk dokumentasi lengkap requirements, user personas, tech stack, dan milestones.

### Design System
Lihat [design-system/kkn-desa-bambang/MASTER.md](./design-system/kkn-desa-bambang/MASTER.md) untuk panduan design system lengkap.

---

## 🤝 Tim Pengembang

**Kelompok KKN 11 - Desa Bambang**

- **Product Manager:** Senior PM & Architect (dokumentasi PRD)
- **Developer:** [Your Name]
- **Designer:** UI/UX Pro Max System

---

## 📄 License

**Private & Confidential** — Internal use only untuk Kelompok KKN 11 Desa Bambang.

---

## 📞 Support

Untuk pertanyaan atau bantuan:
- **Ketua Kelompok:** [Contact]
- **Developer:** [Contact]

---

<div align="center">

**Dibuat dengan ❤️ untuk KKN Kelompok 11 Desa Bambang**

</div>
