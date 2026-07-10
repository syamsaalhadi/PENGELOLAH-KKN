# Seed Data - KKN Management System
## KKN Kelompok 11 Desa Bambang

> File ini digunakan sebagai referensi pengisian data awal (seed data) pada aplikasi KKN Management System.
>
> Semua data bersifat **dummy** dan nantinya akan dikelola melalui Admin Dashboard.

---

## 🚀 Cara Menggunakan Seed Data

### Metode 1: Via Supabase SQL Editor (Recommended)

1. Buka [Supabase Dashboard](https://app.supabase.com)
2. Pilih project Anda
3. Pergi ke **SQL Editor**
4. Buka file `/supabase/seed.sql` di project ini
5. Copy seluruh isi file dan paste ke SQL Editor
6. Klik **Run** atau tekan `Ctrl/Cmd + Enter`
7. Tunggu hingga selesai (sekitar 10-30 detik)

### Metode 2: Via Command Line (jika sudah setup Supabase CLI)

```bash
# Pastikan sudah login ke Supabase
supabase login

# Link ke project
supabase link --project-ref your-project-ref

# Jalankan seed script
psql $DATABASE_URL < supabase/seed.sql
```

### ⚠️ Penting Sebelum Menjalankan Seed

1. **Buat user admin terlebih dahulu** melalui:
   - Admin Dashboard → Kelola Anggota → Tambah Anggota
   - Atau via Authentication di Supabase Dashboard

2. **Pastikan sudah ada minimal 1 user dengan role admin** karena:
   - Schedules membutuhkan `created_by` (foreign key ke profiles)
   - Announcements membutuhkan `created_by`

3. **Backup data** jika sudah ada data existing (optional)

---

## 📊 Data yang Akan Dibuat

### Settings (8 entries)
- app_name, group_name, village_name, university, dll

### Programs (11 programs)
**Bidang Lingkungan & Infrastruktur (4):**
- Sosialisasi dan Pembuatan Lubang Biopori
- Instalasi Pembakaran Sampah Anorganik
- Revitalisasi Plang Informasi dan Penunjuk Arah
- Gerakan Kerja Bakti Drainase

**Bidang Pendidikan & Pengajaran (4):**
- Relawan Mengajar Formal (recurring)
- Bimbingan Belajar (recurring)
- Pelatihan Literasi Komputer (recurring)
- Mengajar Ngaji (recurring)

**Bidang Pemberdayaan Ekonomi (1):**
- Digitalisasi UMKM

**Bidang Sosial & Kepemudaan (2):**
- Seminar Parenting
- Malam Keakraban (Makrab)

### Schedules (~300+ entries)
Jadwal otomatis untuk kegiatan recurring:
- **Relawan Mengajar Formal**: Senin-Kamis, Sabtu, Minggu (07:30-12:00)
- **Bimbingan Belajar**: Senin-Kamis, Sabtu, Minggu (18:30-19:30)
- **Mengajar Ngaji**: Senin-Kamis, Sabtu, Minggu (15:00-16:30)
- **Pelatihan Literasi Komputer**: Rabu & Sabtu (18:30-19:30)

Periode: 17 Juli 2026 - 16 Agustus 2026 (30 hari)

### Checklists (~80+ items)
Checklist spesifik untuk setiap program (bukan dummy yang sama):

**Sosialisasi Lubang Biopori (10 items):**
- Banner & Spanduk, Sound System, Materi Sosialisasi
- Bor Tanah, Pipa PVC (16 buah), Sampah Organik
- Sarung Tangan, Konsumsi (60 porsi), Absensi, Koordinasi RT/RW

**Instalasi Pembakaran Sampah (10 items):**
- Desain Instalasi, Drum 200L (2 buah), Pipa Cerobong
- Cat Tahan Panas, Kawat Kasa, Alat Las
- Materi Sosialisasi, Koordinasi Desa, Tim Pemasangan, Dokumentasi

**Revitalisasi Plang (10 items):**
- Survey 8 titik, Desain Plang, Papan Kayu
- Cat Warna, Kuas Roller, Tiang Penyangga
- Semen Pasir, Tim Pemasangan, Izin Desa, Dokumentasi

**Dan seterusnya...** (Total ~80 items spesifik per program)

### Rundowns (~60+ items)
Rundown spesifik dan detail untuk setiap program one-time:

**Contoh: Sosialisasi Lubang Biopori**
- 08:00 - Registrasi Peserta
- 08:30 - Pembukaan & Sambutan Ketua
- 08:45 - Sambutan Kepala Desa
- 09:00 - Materi: Manfaat & Cara Pembuatan
- 09:45 - Tanya Jawab
- 10:00 - Praktik Pembuatan (16 titik)
- 11:30 - Evaluasi & Penutup
- 11:45 - Foto Bersama

**Seminar Parenting (10 rundown items)**
- Registrasi, Pembukaan, Sambutan
- Materi dari Psikolog, Tanya Jawab
- Coffee Break, Sharing Session
- Penutupan, Pembagian Sertifikat, Foto

**Malam Keakraban (10 rundown items)**
- Persiapan, Pembukaan, Makan Malam
- Ice Breaking & Games, Video Dokumentasi
- Kesan-Pesan, Plakat, Foto Bersama

### Announcements (3 announcements)
- Selamat Datang di KKN Kelompok 11
- Jadwal Mengajar Formal Telah Tersedia
- Reminder: Isi Checklist Program

---

## ✅ Verifikasi Setelah Seed

Jalankan query ini di SQL Editor untuk memverifikasi data:

```sql
-- Count summary
SELECT 'Programs' as table_name, COUNT(*) as total FROM public.programs
UNION ALL
SELECT 'Schedules', COUNT(*) FROM public.schedules
UNION ALL
SELECT 'Checklists', COUNT(*) FROM public.checklists
UNION ALL
SELECT 'Rundowns', COUNT(*) FROM public.rundowns
UNION ALL
SELECT 'Announcements', COUNT(*) FROM public.announcements;
```

Expected results:
- Programs: 11
- Schedules: ~300-350 (tergantung jumlah hari)
- Checklists: 77
- Rundowns: 49
- Announcements: 3

---

## 🔄 Reset Database (Optional)

Jika ingin menghapus semua data dan mulai fresh:

```sql
BEGIN;

TRUNCATE TABLE public.checklists CASCADE;
TRUNCATE TABLE public.documents CASCADE;
TRUNCATE TABLE public.rundowns CASCADE;
TRUNCATE TABLE public.announcements CASCADE;
TRUNCATE TABLE public.schedules CASCADE;
TRUNCATE TABLE public.programs CASCADE;

-- Reset settings ke default
DELETE FROM public.settings WHERE key NOT IN ('group_name', 'location', 'dpl_name', 'start_date', 'end_date', 'theme_description');

COMMIT;
```

⚠️ **PERHATIAN**: Query di atas akan menghapus SEMUA data! Gunakan dengan hati-hati.

---

## 📝 Customisasi Data

### Menambah PJ (Penanggung Jawab) ke Program

Setelah seed, Anda bisa assign PJ melalui:

1. **Via Admin Dashboard** (Recommended):
   - Login sebagai admin
   - Program Kerja → Pilih program → Edit
   - Pilih Penanggung Jawab dari dropdown

2. **Via SQL**:
   ```sql
   UPDATE public.programs 
   SET pj_id = (SELECT id FROM public.profiles WHERE full_name = 'Nama PJ')
   WHERE name = 'Nama Program';
   ```

### Mengubah Tanggal Program

```sql
UPDATE public.programs 
SET scheduled_date = '2026-07-25'
WHERE name = 'Nama Program';
```

### Menambah Checklist Custom

```sql
INSERT INTO public.checklists (program_id, item_name, is_checked)
VALUES (
  (SELECT id FROM public.programs WHERE name = 'Nama Program'),
  'Item Checklist Baru',
  false
);
```

---

## 🎯 Next Steps Setelah Seed

1. ✅ Login ke Admin Dashboard
2. ✅ Verify data di setiap menu (Program Kerja, Jadwal, Pengumuman)
3. ✅ Assign PJ untuk setiap program
4. ✅ Upload dokumentasi/foto jika ada
5. ✅ Customize rundown sesuai kebutuhan
6. ✅ Update status program sesuai progress
7. ✅ Tambahkan anggota KKN lainnya

---

## 📚 Referensi Struktur Database

Lihat file berikut untuk detail struktur:
- `/supabase/migrations/00001_initial_schema.sql` - Schema database
- `/prd.md` - Product Requirements Document

---

## 🆘 Troubleshooting

### Error: "foreign key violation"
**Penyebab**: Belum ada user admin di database  
**Solusi**: Buat user admin dulu melalui Admin Dashboard

### Error: "permission denied"
**Penyebab**: RLS policy tidak mengizinkan  
**Solusi**: Jalankan query sebagai service role di SQL Editor

### Schedules tidak muncul
**Penyebab**: Loop tidak berjalan atau created_by tidak ditemukan  
**Solusi**: Cek apakah ada user admin dengan query:
```sql
SELECT * FROM public.profiles WHERE role = 'admin';
```

### Data duplicate
**Penyebab**: Seed dijalankan lebih dari sekali  
**Solusi**: Jalankan reset query terlebih dahulu sebelum seed ulang

---

## 📞 Support

Jika ada masalah saat seed data:
1. Check Supabase Logs → SQL Logs
2. Check browser console untuk error
3. Verify RLS policies sudah benar
4. Pastikan migration sudah dijalankan

---

# REFERENSI DATA DETAIL

Berikut detail data yang ada di file ini untuk referensi:

---

## SETTINGS

Gunakan data berikut untuk mengisi tabel `settings`.

| key | value |
|------|-------|
| app_name | KKN Management System |
| group_name | Kelompok 11 |
| village_name | Desa Bambang |
| university | Universitas Islam Lamongan |
| kkn_duration | 30 |
| kkn_start_date | 2026-07-17 |
| kkn_end_date | 2026-08-16 |

---

## PROGRAM CATEGORIES

### Bidang Lingkungan & Infrastruktur Desa

PJ Bidang: Agung

Program:
- Sosialisasi dan Pembuatan Lubang Biopori
- Instalasi Pembakaran Sampah Anorganik
- Revitalisasi Plang Informasi dan Penunjuk Arah
- Gerakan Kerja Bakti Drainase

---

### Bidang Pendidikan & Pengajaran

PJ Bidang: Etik

Program:
- Relawan Mengajar Formal
- Bimbingan Belajar
- Pelatihan Literasi Komputer
- Mengajar Ngaji

---

### Bidang Pemberdayaan Ekonomi & UMKM

PJ Bidang: Dimas

Program:
- Digitalisasi UMKM

---

### Bidang Sosial & Kepemudaan

PJ Bidang: Bayu

Program:
- Seminar Parenting
- Malam Keakraban (Makrab)

---

## STATUS ENUM

- Belum Dimulai (Upcoming)
- Sedang Berlangsung (Ongoing)
- Selesai (Completed)
- Dibatalkan (Cancelled)

---

## NOTES FOR DEVELOPMENT

1. Seluruh data di atas merupakan dummy data.
2. Seed data sudah disesuaikan dengan struktur tabel Supabase.
3. Mapping `pj` mengacu pada tabel `profiles` melalui `pj_id`.
4. Jangan hardcode nama PJ, gunakan foreign key ke `profiles.id`.
5. Program dengan recurring schedule otomatis generate jadwal di tabel `schedules`.
6. Program lainnya menggunakan One Time Schedule dengan tanggal spesifik.
7. Rundown, checklist dibuat otomatis saat seed berdasarkan template default.
8. Makrab ditempatkan sebagai program terakhir (closing internal).
9. Seluruh data dapat diubah melalui Admin Dashboard.

---

**File SQL siap pakai**: `/supabase/seed.sql`

---

# SETTINGS

Gunakan data berikut untuk mengisi tabel `settings`.

| key | value |
|------|-------|
| app_name | KKN Management System |
| group_name | Kelompok 11 |
| village_name | Desa Bambang |
| university | Universitas Islam Lamongan |
| kkn_duration | 30 |
| kkn_start_date | Dummy |
| kkn_end_date | Dummy |

---

# PROGRAM CATEGORIES

## Bidang Lingkungan & Infrastruktur Desa

PJ Bidang

Agung

Program:

- Sosialisasi dan Pembuatan Lubang Biopori
- Instalasi Pembakaran Sampah Anorganik
- Revitalisasi Plang Informasi dan Penunjuk Arah
- Gerakan Kerja Bakti Drainase

---

## Bidang Pendidikan & Pengajaran

PJ Bidang

Etik

Program

- Relawan Mengajar Formal
- Bimbingan Belajar
- Pelatihan Literasi Komputer
- Mengajar Ngaji

---

## Bidang Pemberdayaan Ekonomi & UMKM

PJ Bidang

Dimas

Program

- Digitalisasi UMKM

---

## Bidang Sosial & Kepemudaan

PJ Bidang

Bayu

Program

- Seminar Parenting
- Malam Keakraban (Makrab)

---

# PROGRAMS

## 1. Sosialisasi dan Pembuatan Lubang Biopori

category

Bidang Lingkungan & Infrastruktur Desa

pj

Agung

status

Upcoming

description

Sosialisasi mengenai manfaat lubang biopori yang dilanjutkan dengan praktik pembuatan 16 titik lubang biopori.

purpose

Meningkatkan resapan air dan mengurangi genangan.

target_audience

Masyarakat Desa Bambang

location

Balai Desa Bambang

scheduled_date

Dummy

---

## 2. Instalasi Pembakaran Sampah Anorganik

category

Bidang Lingkungan & Infrastruktur Desa

pj

Agung

status

Upcoming

description

Pembuatan instalasi pembakaran sampah bebas asap beserta sosialisasi penggunaannya.

purpose

Membantu pengelolaan sampah anorganik.

target_audience

Masyarakat Desa Bambang

location

TPS Desa Bambang

scheduled_date

Dummy

---

## 3. Revitalisasi Plang Informasi dan Penunjuk Arah

category

Bidang Lingkungan & Infrastruktur Desa

pj

Agung

status

Upcoming

description

Pembuatan dan pemasangan plang informasi serta penunjuk arah desa.

purpose

Meningkatkan akses informasi.

target_audience

Masyarakat Desa Bambang

location

Beberapa Titik Desa

scheduled_date

Dummy

---

## 4. Gerakan Kerja Bakti Drainase

category

Bidang Lingkungan & Infrastruktur Desa

pj

Agung

status

Upcoming

description

Kerja bakti membersihkan saluran drainase bersama masyarakat.

purpose

Menjaga kebersihan lingkungan.

target_audience

Masyarakat Desa Bambang

location

Drainase Desa Bambang

scheduled_date

Dummy

---

## 5. Relawan Mengajar Formal

category

Bidang Pendidikan & Pengajaran

pj

Etik

status

Ongoing

description

Membantu guru mengajar di PAUD.

purpose

Membantu proses belajar mengajar.

target_audience

Siswa PAUD

location

PAUD Desa Bambang

schedule_type

Recurring

Hari

Senin
Selasa
Rabu
Kamis
Sabtu
Minggu

Libur

Jumat

Jam

07:30 - 12:00

---

## 6. Bimbingan Belajar

category

Bidang Pendidikan & Pengajaran

pj

Etik

status

Ongoing

description

Pendampingan belajar bagi anak-anak.

purpose

Membantu mengerjakan tugas sekolah.

target_audience

Anak-anak Desa Bambang

location

Posko KKN

schedule_type

Recurring

Hari

Senin
Selasa
Rabu
Kamis
Sabtu
Minggu

Libur

Jumat

Jam

18:30 - 19:30

---

## 7. Pelatihan Literasi Komputer

category

Bidang Pendidikan & Pengajaran

pj

Etik

status

Upcoming

description

Pelatihan Microsoft Word dan Excel.

purpose

Meningkatkan literasi digital.

target_audience

Anak-anak MI Desa Bambang

location

Posko KKN

schedule_type

Recurring

Hari

Rabu
Sabtu

Jam

18:30 - 19:30

---

## 8. Mengajar Ngaji

category

Bidang Pendidikan & Pengajaran

pj

Etik

status

Ongoing

description

Membantu guru TPQ dalam mengajar.

purpose

Pendampingan belajar Al-Qur'an.

target_audience

Santri TPQ

location

TPQ Desa Bambang

schedule_type

Recurring

Hari

Senin
Selasa
Rabu
Kamis
Sabtu
Minggu

Libur

Jumat

Jam

15:00 - 16:30

---

## 9. Digitalisasi UMKM

category

Bidang Pemberdayaan Ekonomi & UMKM

pj

Dimas

status

Upcoming

description

Pendampingan digitalisasi UMKM secara door to door.

purpose

Meningkatkan pemasaran digital.

target_audience

Pelaku UMKM

location

Door to Door

scheduled_date

Dummy

budget

0

---

## 10. Seminar Parenting

category

Bidang Sosial & Kepemudaan

pj

Bayu

status

Upcoming

description

Seminar mengenai pola asuh anak.

purpose

Meningkatkan wawasan orang tua.

target_audience

Orang tua siswa

location

Balai Desa Bambang

scheduled_date

Dummy

---

## 11. Malam Keakraban (Makrab)

category

Bidang Sosial & Kepemudaan

pj

Bayu

status

Upcoming

description

Acara penutup internal KKN.

purpose

Mempererat kebersamaan seluruh anggota KKN.

target_audience

Seluruh Anggota KKN

location

Posko KKN

scheduled_date

Hari terakhir sebelum penutupan KKN

---

# CHECKLIST DEFAULT

Gunakan checklist berikut untuk setiap Program.

- Banner
- Sound System
- Konsumsi
- Dokumentasi
- Absensi
- Peralatan
- Koordinasi Desa

Semua checklist default bernilai

is_checked = false

---

# RUNDOWN TEMPLATE

Gunakan template berikut sebagai rundown default.

08:00 - Registrasi - Panitia

08:15 - Pembukaan - MC

08:30 - Sambutan - Ketua Kelompok

08:45 - Sambutan - Kepala Desa

09:00 - Pelaksanaan Kegiatan - PJ Bidang

11:30 - Penutup - MC

11:45 - Dokumentasi - PDD

---

# DOCUMENTS

Setiap Program memiliki folder dokumentasi.

Jenis file:

- Image
- PDF
- DOCX
- Video

---

# ANNOUNCEMENT SEED

Judul

Selamat Datang di KKN Kelompok 11 Desa Bambang

Isi

Selamat datang pada Dashboard KKN Kelompok 11.
Seluruh informasi kegiatan, jadwal, dan dokumentasi dapat diakses melalui website ini.

priority

high

---

# STATUS ENUM

Upcoming

Ongoing

Completed

Cancelled

---

# NOTES FOR ANTIGRAVITY/KIRO

1. Seluruh data di atas merupakan dummy data.
2. Seed data harus disesuaikan dengan struktur tabel Supabase.
3. Mapping `pj` mengacu pada tabel `profiles` melalui `pj_id`.
4. Jangan hardcode nama PJ, gunakan foreign key ke `profiles.id`.
5. Program dengan `schedule_type = Recurring` (Mengajar Formal, Bimbingan Belajar, Literasi Komputer, Mengajar Ngaji) sebaiknya menghasilkan data pada tabel `schedules` secara otomatis berdasarkan aturan berikut:
   - Relawan Mengajar Formal: Senin, Selasa, Rabu, Kamis, Sabtu, Minggu | 07:30–12:00 | Jumat libur.
   - Bimbingan Belajar: Senin, Selasa, Rabu, Kamis, Sabtu, Minggu | 18:30–19:30 | Jumat libur.
   - Mengajar Ngaji: Senin, Selasa, Rabu, Kamis, Sabtu, Minggu | 15:00–16:30 | Jumat libur.
   - Pelatihan Literasi Komputer: Rabu & Sabtu | 18:30–19:30.
6. Program lainnya menggunakan `One Time Schedule` dan tanggal masih berupa dummy.
7. Rundown, checklist, dan dokumentasi dapat dibuat otomatis berdasarkan template default saat program dibuat.
8. Makrab ditempatkan sebagai program terakhir (closing internal) setelah Seminar Parenting.
9. Seluruh data nantinya dapat diubah melalui Admin Dashboard tanpa mengubah struktur database.