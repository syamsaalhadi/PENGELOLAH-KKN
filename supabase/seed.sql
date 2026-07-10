-- ============================================
-- SEED DATA - KKN Management System
-- Kelompok 11 Desa Bambang
-- ============================================

-- PENTING: Jalankan script ini di Supabase SQL Editor
-- Script ini akan mengisi database dengan data dummy untuk testing

BEGIN;

-- ============================================
-- 1. CLEAR EXISTING DATA (Optional - uncomment jika ingin reset)
-- ============================================
-- TRUNCATE TABLE public.checklists CASCADE;
-- TRUNCATE TABLE public.documents CASCADE;
-- TRUNCATE TABLE public.rundowns CASCADE;
-- TRUNCATE TABLE public.announcements CASCADE;
-- TRUNCATE TABLE public.schedules CASCADE;
-- TRUNCATE TABLE public.programs CASCADE;
-- DELETE FROM public.profiles WHERE id NOT IN (SELECT id FROM auth.users);

-- ============================================
-- 2. SETTINGS
-- ============================================
-- Update existing settings
UPDATE public.settings 
SET value = 'KKN Management System' 
WHERE key = 'group_name';

INSERT INTO public.settings (key, value) VALUES
  ('app_name', 'KKN Management System'),
  ('village_name', 'Desa Bambang'),
  ('university', 'Universitas Islam Lamongan'),
  ('kkn_duration', '30'),
  ('theme_description', 'Pemberdayaan Masyarakat Melalui Optimalisasi Potensi Desa di Era Digital')
ON CONFLICT (key) DO UPDATE 
SET value = EXCLUDED.value;

-- ============================================
-- 3. PROFILES (Dummy Users)
-- ============================================
-- CATATAN: Profile ini harus dibuat melalui signup atau admin dashboard
-- Script ini hanya memberikan contoh data yang HARUS DISESUAIKAN dengan user ID yang sebenarnya

-- Untuk sementara, kita akan membuat placeholder
-- Setelah user dibuat melalui admin, update query ini dengan ID yang sebenarnya

-- Contoh: Jika Anda sudah membuat user melalui admin dashboard,
-- ambil ID mereka dan gunakan di program-program berikut

-- ============================================
-- 4. PROGRAMS
-- ============================================

-- Get PJ IDs
DO $$
DECLARE
  agung_id uuid;
  etik_id uuid;
  dimas_id uuid;
  bayu_id uuid;
BEGIN
  -- Get user IDs by name (case insensitive)
  SELECT id INTO agung_id FROM public.profiles WHERE LOWER(full_name) LIKE '%agung%' LIMIT 1;
  SELECT id INTO etik_id FROM public.profiles WHERE LOWER(full_name) LIKE '%etik%' LIMIT 1;
  SELECT id INTO dimas_id FROM public.profiles WHERE LOWER(full_name) LIKE '%dimas%' LIMIT 1;
  SELECT id INTO bayu_id FROM public.profiles WHERE LOWER(full_name) LIKE '%bayu%' LIMIT 1;

  -- Bidang Lingkungan & Infrastruktur Desa (PJ: Agung)
  INSERT INTO public.programs (name, description, purpose, target_audience, location, status, category, scheduled_date, pj_id) VALUES
    (
      'Sosialisasi dan Pembuatan Lubang Biopori',
      'Sosialisasi mengenai manfaat lubang biopori yang dilanjutkan dengan praktik pembuatan 16 titik lubang biopori.',
      'Meningkatkan resapan air dan mengurangi genangan.',
      'Masyarakat Desa Bambang',
      'Balai Desa Bambang',
      'Belum Dimulai',
      'Bidang Lingkungan & Infrastruktur Desa',
      '2026-07-22',
      agung_id
    ),
    (
      'Instalasi Pembakaran Sampah Anorganik',
      'Pembuatan instalasi pembakaran sampah bebas asap beserta sosialisasi penggunaannya.',
      'Membantu pengelolaan sampah anorganik.',
      'Masyarakat Desa Bambang',
      'TPS Desa Bambang',
      'Belum Dimulai',
      'Bidang Lingkungan & Infrastruktur Desa',
      '2026-07-25',
      agung_id
    ),
    (
      'Revitalisasi Plang Informasi dan Penunjuk Arah',
      'Pembuatan dan pemasangan plang informasi serta penunjuk arah desa.',
      'Meningkatkan akses informasi.',
      'Masyarakat Desa Bambang',
      'Beberapa Titik Desa',
      'Belum Dimulai',
      'Bidang Lingkungan & Infrastruktur Desa',
      '2026-07-28',
      agung_id
    ),
    (
      'Gerakan Kerja Bakti Drainase',
      'Kerja bakti membersihkan saluran drainase bersama masyarakat.',
      'Menjaga kebersihan lingkungan.',
      'Masyarakat Desa Bambang',
      'Drainase Desa Bambang',
      'Belum Dimulai',
      'Bidang Lingkungan & Infrastruktur Desa',
      '2026-08-01',
      agung_id
    );

  -- Bidang Pendidikan & Pengajaran (PJ: Etik)
  INSERT INTO public.programs (name, description, purpose, target_audience, location, status, category, pj_id) VALUES
    (
      'Relawan Mengajar Formal',
      'Membantu guru mengajar di PAUD. Kegiatan rutin setiap hari kecuali Jumat.',
      'Membantu proses belajar mengajar.',
      'Siswa PAUD',
      'PAUD Desa Bambang',
      'Sedang Berlangsung',
      'Bidang Pendidikan & Pengajaran',
      etik_id
    ),
    (
      'Bimbingan Belajar',
      'Pendampingan belajar bagi anak-anak. Kegiatan rutin setiap hari kecuali Jumat.',
      'Membantu mengerjakan tugas sekolah.',
      'Anak-anak Desa Bambang',
      'Posko KKN',
      'Sedang Berlangsung',
      'Bidang Pendidikan & Pengajaran',
      etik_id
    ),
    (
      'Pelatihan Literasi Komputer',
      'Pelatihan Microsoft Word dan Excel. Kegiatan rutin setiap Rabu dan Sabtu.',
      'Meningkatkan literasi digital.',
      'Anak-anak MI Desa Bambang',
      'Posko KKN',
      'Belum Dimulai',
      'Bidang Pendidikan & Pengajaran',
      etik_id
    ),
    (
      'Mengajar Ngaji',
      'Membantu guru TPQ dalam mengajar. Kegiatan rutin setiap hari kecuali Jumat.',
      'Pendampingan belajar Al-Qur''an.',
      'Santri TPQ',
      'TPQ Desa Bambang',
      'Sedang Berlangsung',
      'Bidang Pendidikan & Pengajaran',
      etik_id
    );

  -- Bidang Pemberdayaan Ekonomi & UMKM (PJ: Dimas)
  INSERT INTO public.programs (name, description, purpose, target_audience, location, status, category, scheduled_date, pj_id) VALUES
    (
      'Digitalisasi UMKM',
      'Pendampingan digitalisasi UMKM secara door to door.',
      'Meningkatkan pemasaran digital.',
      'Pelaku UMKM',
      'Door to Door',
      'Belum Dimulai',
      'Bidang Pemberdayaan Ekonomi & UMKM',
      '2026-08-05',
      dimas_id
    );

  -- Bidang Sosial & Kepemudaan (PJ: Bayu)
  INSERT INTO public.programs (name, description, purpose, target_audience, location, status, category, scheduled_date, pj_id) VALUES
    (
      'Seminar Parenting',
      'Seminar mengenai pola asuh anak.',
      'Meningkatkan wawasan orang tua.',
      'Orang tua siswa',
      'Balai Desa Bambang',
      'Belum Dimulai',
      'Bidang Sosial & Kepemudaan',
      '2026-08-10',
      bayu_id
    ),
    (
      'Malam Keakraban (Makrab)',
      'Acara penutup internal KKN.',
      'Mempererat kebersamaan seluruh anggota KKN.',
      'Seluruh Anggota KKN',
      'Posko KKN',
      'Belum Dimulai',
      'Bidang Sosial & Kepemudaan',
      '2026-08-15',
      bayu_id
    );

  -- Log PJ assignment
  RAISE NOTICE 'PJ Assigned: Agung (%), Etik (%), Dimas (%), Bayu (%)', agung_id, etik_id, dimas_id, bayu_id;
END $$;

-- ============================================
-- 5. SCHEDULES (Recurring Activities)
-- ============================================

-- A. Create schedules for ONE-TIME programs (yang punya scheduled_date)
DO $$
DECLARE
  prog record;
BEGIN
  FOR prog IN 
    SELECT id, name, description, location, scheduled_date 
    FROM public.programs 
    WHERE scheduled_date IS NOT NULL 
  LOOP
    INSERT INTO public.schedules (
      schedule_date, 
      start_time, 
      end_time, 
      title, 
      description, 
      location, 
      program_id, 
      created_by
    )
    VALUES (
      prog.scheduled_date,
      '08:00:00',
      '12:00:00',
      prog.name,
      prog.description,
      prog.location,
      prog.id,
      (SELECT id FROM public.profiles WHERE role = 'admin' LIMIT 1)
    );
  END LOOP;
END $$;

-- B. Generate RECURRING schedules
-- Helper function untuk generate tanggal recurring
-- Menghasilkan jadwal untuk 30 hari ke depan

DO $$
DECLARE
  program_mengajar_id uuid;
  program_bimbel_id uuid;
  program_ngaji_id uuid;
  program_komputer_id uuid;
  loop_date date := '2026-07-17'::date; -- KKN Start Date
  end_date date := '2026-08-16'::date; -- KKN End Date
  day_of_week int;
BEGIN
  -- Get program IDs
  SELECT id INTO program_mengajar_id FROM public.programs WHERE name = 'Relawan Mengajar Formal';
  SELECT id INTO program_bimbel_id FROM public.programs WHERE name = 'Bimbingan Belajar';
  SELECT id INTO program_ngaji_id FROM public.programs WHERE name = 'Mengajar Ngaji';
  SELECT id INTO program_komputer_id FROM public.programs WHERE name = 'Pelatihan Literasi Komputer';

  -- Generate schedules untuk Relawan Mengajar Formal (Senin-Kamis, Sabtu, Minggu)
  WHILE loop_date <= end_date LOOP
    day_of_week := EXTRACT(DOW FROM loop_date); -- 0=Minggu, 1=Senin, ..., 6=Sabtu
    
    IF day_of_week != 5 THEN -- Tidak Jumat
      INSERT INTO public.schedules (schedule_date, start_time, end_time, title, description, location, program_id, created_by)
      VALUES (
        loop_date,
        '07:30:00',
        '12:00:00',
        'Relawan Mengajar Formal',
        'Membantu guru mengajar di PAUD',
        'PAUD Desa Bambang',
        program_mengajar_id,
        (SELECT id FROM public.profiles WHERE role = 'admin' LIMIT 1)
      );
    END IF;
    
    loop_date := loop_date + INTERVAL '1 day';
  END LOOP;

  -- Reset date untuk Bimbingan Belajar
  loop_date := '2026-07-17'::date;
  
  WHILE loop_date <= end_date LOOP
    day_of_week := EXTRACT(DOW FROM loop_date);
    
    IF day_of_week != 5 THEN -- Tidak Jumat
      INSERT INTO public.schedules (schedule_date, start_time, end_time, title, description, location, program_id, created_by)
      VALUES (
        loop_date,
        '18:30:00',
        '19:30:00',
        'Bimbingan Belajar',
        'Pendampingan belajar bagi anak-anak',
        'Posko KKN',
        program_bimbel_id,
        (SELECT id FROM public.profiles WHERE role = 'admin' LIMIT 1)
      );
    END IF;
    
    loop_date := loop_date + INTERVAL '1 day';
  END LOOP;

  -- Reset date untuk Mengajar Ngaji
  loop_date := '2026-07-17'::date;
  
  WHILE loop_date <= end_date LOOP
    day_of_week := EXTRACT(DOW FROM loop_date);
    
    IF day_of_week != 5 THEN -- Tidak Jumat
      INSERT INTO public.schedules (schedule_date, start_time, end_time, title, description, location, program_id, created_by)
      VALUES (
        loop_date,
        '15:00:00',
        '16:30:00',
        'Mengajar Ngaji',
        'Membantu guru TPQ dalam mengajar',
        'TPQ Desa Bambang',
        program_ngaji_id,
        (SELECT id FROM public.profiles WHERE role = 'admin' LIMIT 1)
      );
    END IF;
    
    loop_date := loop_date + INTERVAL '1 day';
  END LOOP;

  -- Reset date untuk Pelatihan Literasi Komputer (Rabu & Sabtu)
  loop_date := '2026-07-17'::date;
  
  WHILE loop_date <= end_date LOOP
    day_of_week := EXTRACT(DOW FROM loop_date);
    
    IF day_of_week = 3 OR day_of_week = 6 THEN -- Rabu (3) atau Sabtu (6)
      INSERT INTO public.schedules (schedule_date, start_time, end_time, title, description, location, program_id, created_by)
      VALUES (
        loop_date,
        '18:30:00',
        '19:30:00',
        'Pelatihan Literasi Komputer',
        'Pelatihan Microsoft Word dan Excel',
        'Posko KKN',
        program_komputer_id,
        (SELECT id FROM public.profiles WHERE role = 'admin' LIMIT 1)
      );
    END IF;
    
    loop_date := loop_date + INTERVAL '1 day';
  END LOOP;

END $$;

-- ============================================
-- 6. CHECKLISTS (Spesifik per Program)
-- ============================================

DO $$
DECLARE
  prog_id uuid;
BEGIN
  -- Sosialisasi dan Pembuatan Lubang Biopori
  SELECT id INTO prog_id FROM public.programs WHERE name = 'Sosialisasi dan Pembuatan Lubang Biopori';
  INSERT INTO public.checklists (program_id, item_name, is_checked) VALUES
    (prog_id, 'Banner & Spanduk Kegiatan', false),
    (prog_id, 'Sound System & Mic', false),
    (prog_id, 'Materi Sosialisasi (PPT/Poster)', false),
    (prog_id, 'Bor Tanah Manual', false),
    (prog_id, 'Pipa PVC Diameter 10cm (16 buah)', false),
    (prog_id, 'Sampah Organik untuk Isi Biopori', false),
    (prog_id, 'Sarung Tangan & Masker', false),
    (prog_id, 'Konsumsi Peserta (60 porsi)', false),
    (prog_id, 'Absensi & Dokumentasi', false),
    (prog_id, 'Koordinasi dengan RT/RW', false);

  -- Instalasi Pembakaran Sampah Anorganik
  SELECT id INTO prog_id FROM public.programs WHERE name = 'Instalasi Pembakaran Sampah Anorganik';
  INSERT INTO public.checklists (program_id, item_name, is_checked) VALUES
    (prog_id, 'Desain Instalasi Pembakaran', false),
    (prog_id, 'Drum Bekas 200 Liter (2 buah)', false),
    (prog_id, 'Pipa Besi untuk Cerobong', false),
    (prog_id, 'Cat Tahan Panas', false),
    (prog_id, 'Bahan Isolator (Kawat Kasa)', false),
    (prog_id, 'Alat Pertukangan (Gerinda, Las)', false),
    (prog_id, 'Materi Sosialisasi Cara Pakai', false),
    (prog_id, 'Koordinasi Lokasi dengan Kepala Desa', false),
    (prog_id, 'Tim Pemasangan (4 orang)', false),
    (prog_id, 'Dokumentasi & Laporan', false);

  -- Revitalisasi Plang Informasi dan Penunjuk Arah
  SELECT id INTO prog_id FROM public.programs WHERE name = 'Revitalisasi Plang Informasi dan Penunjuk Arah';
  INSERT INTO public.checklists (program_id, item_name, is_checked) VALUES
    (prog_id, 'Survey Titik Lokasi Plang (8 titik)', false),
    (prog_id, 'Desain Plang Informasi', false),
    (prog_id, 'Papan Kayu/Triplek (8 lembar)', false),
    (prog_id, 'Cat Warna (Hijau, Putih, Merah)', false),
    (prog_id, 'Kuas & Roller Cat', false),
    (prog_id, 'Tiang Penyangga Plang (Besi/Kayu)', false),
    (prog_id, 'Semen & Pasir untuk Pondasi', false),
    (prog_id, 'Tim Pemasangan (5 orang)', false),
    (prog_id, 'Izin Pemasangan dari Desa', false),
    (prog_id, 'Dokumentasi Before-After', false);

  -- Gerakan Kerja Bakti Drainase
  SELECT id INTO prog_id FROM public.programs WHERE name = 'Gerakan Kerja Bakti Drainase';
  INSERT INTO public.checklists (program_id, item_name, is_checked) VALUES
    (prog_id, 'Koordinasi dengan Ketua RT', false),
    (prog_id, 'Pengumuman ke Warga (3 hari sebelum)', false),
    (prog_id, 'Cangkul & Sekop (10 buah)', false),
    (prog_id, 'Sapu Lidi (15 buah)', false),
    (prog_id, 'Karung untuk Sampah (50 buah)', false),
    (prog_id, 'Sarung Tangan Karet (20 pasang)', false),
    (prog_id, 'Konsumsi untuk Peserta (80 porsi)', false),
    (prog_id, 'Air Minum Galon (5 galon)', false),
    (prog_id, 'Kotak P3K', false),
    (prog_id, 'Dokumentasi Kegiatan', false);

  -- Relawan Mengajar Formal
  SELECT id INTO prog_id FROM public.programs WHERE name = 'Relawan Mengajar Formal';
  INSERT INTO public.checklists (program_id, item_name, is_checked) VALUES
    (prog_id, 'Koordinasi dengan Kepala PAUD', false),
    (prog_id, 'Jadwal Mengajar Harian', false),
    (prog_id, 'Materi Pembelajaran Anak PAUD', false),
    (prog_id, 'Alat Peraga Edukasi', false),
    (prog_id, 'Kertas Gambar & Crayon', false),
    (prog_id, 'Snack untuk Anak-anak', false),
    (prog_id, 'Buku Absensi Relawan', false);

  -- Bimbingan Belajar
  SELECT id INTO prog_id FROM public.programs WHERE name = 'Bimbingan Belajar';
  INSERT INTO public.checklists (program_id, item_name, is_checked) VALUES
    (prog_id, 'Ruang Belajar di Posko (Setup Meja Kursi)', false),
    (prog_id, 'Papan Tulis Kecil & Spidol', false),
    (prog_id, 'Buku Tulis & ATK (20 set)', false),
    (prog_id, 'Modul Bimbingan Belajar', false),
    (prog_id, 'Jadwal Shift Pengajar', false),
    (prog_id, 'Daftar Peserta Bimbel', false),
    (prog_id, 'Snack & Air Minum', false);

  -- Pelatihan Literasi Komputer
  SELECT id INTO prog_id FROM public.programs WHERE name = 'Pelatihan Literasi Komputer';
  INSERT INTO public.checklists (program_id, item_name, is_checked) VALUES
    (prog_id, 'Laptop (5 unit)', false),
    (prog_id, 'Modul Word & Excel Dasar', false),
    (prog_id, 'Proyektor & Layar', false),
    (prog_id, 'File Latihan (Template)', false),
    (prog_id, 'Flash Disk untuk Materi', false),
    (prog_id, 'Daftar Hadir Peserta', false),
    (prog_id, 'Sertifikat Keikutsertaan', false),
    (prog_id, 'Konsumsi Peserta', false);

  -- Mengajar Ngaji
  SELECT id INTO prog_id FROM public.programs WHERE name = 'Mengajar Ngaji';
  INSERT INTO public.checklists (program_id, item_name, is_checked) VALUES
    (prog_id, 'Koordinasi dengan Ustadz TPQ', false),
    (prog_id, 'Jadwal Shift Mengajar', false),
    (prog_id, 'Iqro & Juz Amma', false),
    (prog_id, 'Buku Absensi Santri', false),
    (prog_id, 'Reward untuk Santri (Stiker)', false),
    (prog_id, 'Snack untuk Santri', false);

  -- Digitalisasi UMKM
  SELECT id INTO prog_id FROM public.programs WHERE name = 'Digitalisasi UMKM';
  INSERT INTO public.checklists (program_id, item_name, is_checked) VALUES
    (prog_id, 'Survey Pelaku UMKM (15 UMKM)', false),
    (prog_id, 'Materi Pelatihan Digital Marketing', false),
    (prog_id, 'Laptop & Proyektor', false),
    (prog_id, 'Template Katalog Produk Digital', false),
    (prog_id, 'Bantuan Pembuatan Akun Instagram/Facebook', false),
    (prog_id, 'Desain Banner Promosi (per UMKM)', false),
    (prog_id, 'Foto Produk UMKM', false),
    (prog_id, 'Konsumsi Peserta', false),
    (prog_id, 'Sertifikat untuk Peserta', false),
    (prog_id, 'Follow-up Monitoring (1 minggu)', false);

  -- Seminar Parenting
  SELECT id INTO prog_id FROM public.programs WHERE name = 'Seminar Parenting';
  INSERT INTO public.checklists (program_id, item_name, is_checked) VALUES
    (prog_id, 'Narasumber Expert (Psikolog/Pendidik)', false),
    (prog_id, 'Surat Undangan untuk Orang Tua', false),
    (prog_id, 'Banner & Backdrop Seminar', false),
    (prog_id, 'Sound System & Mic', false),
    (prog_id, 'Proyektor & Laptop', false),
    (prog_id, 'Materi Presentasi', false),
    (prog_id, 'Tempat Duduk (100 kursi)', false),
    (prog_id, 'Konsumsi Peserta (100 porsi)', false),
    (prog_id, 'Sertifikat Kehadiran', false),
    (prog_id, 'Dokumentasi & Notulensi', false),
    (prog_id, 'Goodie Bag untuk Peserta', false);

  -- Malam Keakraban (Makrab)
  SELECT id INTO prog_id FROM public.programs WHERE name = 'Malam Keakraban (Makrab)';
  INSERT INTO public.checklists (program_id, item_name, is_checked) VALUES
    (prog_id, 'Rundown Acara Makrab', false),
    (prog_id, 'Dekorasi Posko (Lampu Hias)', false),
    (prog_id, 'Sound System & Playlist Musik', false),
    (prog_id, 'Konsumsi Makan Malam (15 porsi)', false),
    (prog_id, 'Snack & Minuman', false),
    (prog_id, 'Games & Ice Breaking', false),
    (prog_id, 'Hadiah untuk Games (5 hadiah)', false),
    (prog_id, 'Plakat Kenang-kenangan', false),
    (prog_id, 'Video Dokumentasi KKN', false),
    (prog_id, 'Sesi Foto Bersama', false),
    (prog_id, 'Notebook Kesan-Pesan', false);

END $$;

-- ============================================
-- 7. RUNDOWNS (Spesifik per Program One-Time)
-- ============================================

DO $$
DECLARE
  prog_id uuid;
BEGIN
  -- Sosialisasi dan Pembuatan Lubang Biopori
  SELECT id INTO prog_id FROM public.programs WHERE name = 'Sosialisasi dan Pembuatan Lubang Biopori';
  INSERT INTO public.rundowns (program_id, item_time, activity_name, pic, order_index) VALUES
    (prog_id, '08:00:00', 'Registrasi Peserta', 'Panitia', 1),
    (prog_id, '08:30:00', 'Pembukaan & Sambutan Ketua KKN', 'Ketua Kelompok', 2),
    (prog_id, '08:45:00', 'Sambutan Kepala Desa', 'Kepala Desa', 3),
    (prog_id, '09:00:00', 'Materi: Manfaat & Cara Pembuatan Biopori', 'Narasumber', 4),
    (prog_id, '09:45:00', 'Tanya Jawab', 'Moderator', 5),
    (prog_id, '10:00:00', 'Praktik Pembuatan Lubang Biopori (16 titik)', 'Tim Lapangan', 6),
    (prog_id, '11:30:00', 'Evaluasi & Penutup', 'Ketua Kelompok', 7),
    (prog_id, '11:45:00', 'Foto Bersama & Dokumentasi', 'PDD', 8);

  -- Instalasi Pembakaran Sampah Anorganik
  SELECT id INTO prog_id FROM public.programs WHERE name = 'Instalasi Pembakaran Sampah Anorganik';
  INSERT INTO public.rundowns (program_id, item_time, activity_name, pic, order_index) VALUES
    (prog_id, '08:00:00', 'Persiapan Alat & Bahan', 'Tim Teknis', 1),
    (prog_id, '08:30:00', 'Pengelasan Rangka Instalasi', 'Tukang Las', 2),
    (prog_id, '10:00:00', 'Pemasangan Cerobong & Isolator', 'Tim Teknis', 3),
    (prog_id, '11:00:00', 'Pengecatan & Finishing', 'Tim Teknis', 4),
    (prog_id, '12:00:00', 'Istirahat', '-', 5),
    (prog_id, '13:00:00', 'Testing Instalasi', 'Tim Teknis', 6),
    (prog_id, '14:00:00', 'Sosialisasi Cara Penggunaan', 'Agung', 7),
    (prog_id, '14:30:00', 'Serah Terima kepada Desa', 'Ketua & Kepala Desa', 8),
    (prog_id, '15:00:00', 'Dokumentasi', 'PDD', 9);

  -- Revitalisasi Plang Informasi dan Penunjuk Arah
  SELECT id INTO prog_id FROM public.programs WHERE name = 'Revitalisasi Plang Informasi dan Penunjuk Arah';
  INSERT INTO public.rundowns (program_id, item_time, activity_name, pic, order_index) VALUES
    (prog_id, '07:00:00', 'Persiapan Bahan (Kayu, Cat, Tiang)', 'Tim Produksi', 1),
    (prog_id, '07:30:00', 'Pengecatan Dasar Plang', 'Tim Produksi', 2),
    (prog_id, '09:00:00', 'Penulisan Teks & Desain', 'Tim Desain', 3),
    (prog_id, '11:00:00', 'Finishing & Vernis', 'Tim Produksi', 4),
    (prog_id, '12:00:00', 'Istirahat Siang', '-', 5),
    (prog_id, '13:00:00', 'Pemasangan Plang Titik 1-4', 'Tim Lapangan', 6),
    (prog_id, '15:00:00', 'Pemasangan Plang Titik 5-8', 'Tim Lapangan', 7),
    (prog_id, '16:30:00', 'Pengecekan Akhir', 'Agung', 8),
    (prog_id, '17:00:00', 'Dokumentasi Semua Titik', 'PDD', 9);

  -- Gerakan Kerja Bakti Drainase
  SELECT id INTO prog_id FROM public.programs WHERE name = 'Gerakan Kerja Bakti Drainase';
  INSERT INTO public.rundowns (program_id, item_time, activity_name, pic, order_index) VALUES
    (prog_id, '06:00:00', 'Kumpul di Balai Desa', 'Panitia', 1),
    (prog_id, '06:15:00', 'Pembagian Wilayah Kerja', 'Ketua RT', 2),
    (prog_id, '06:30:00', 'Pembersihan Drainase Wilayah A', 'Tim A', 3),
    (prog_id, '06:30:00', 'Pembersihan Drainase Wilayah B', 'Tim B', 4),
    (prog_id, '08:00:00', 'Pengangkutan Sampah ke TPS', 'Tim Logistik', 5),
    (prog_id, '09:00:00', 'Konsumsi & Istirahat', 'Panitia', 6),
    (prog_id, '09:30:00', 'Pengecekan Hasil Kerja Bakti', 'Ketua RT', 7),
    (prog_id, '10:00:00', 'Penutupan & Foto Bersama', 'Ketua KKN', 8);

  -- Digitalisasi UMKM
  SELECT id INTO prog_id FROM public.programs WHERE name = 'Digitalisasi UMKM';
  INSERT INTO public.rundowns (program_id, item_time, activity_name, pic, order_index) VALUES
    (prog_id, '13:00:00', 'Registrasi Pelaku UMKM', 'Panitia', 1),
    (prog_id, '13:30:00', 'Pembukaan & Penjelasan Program', 'Dimas', 2),
    (prog_id, '13:45:00', 'Materi 1: Pengenalan Digital Marketing', 'Narasumber', 3),
    (prog_id, '14:30:00', 'Materi 2: Cara Membuat Konten Menarik', 'Narasumber', 4),
    (prog_id, '15:15:00', 'Coffee Break', '-', 5),
    (prog_id, '15:30:00', 'Praktik: Buat Akun Bisnis Instagram', 'Tim Pendamping', 6),
    (prog_id, '16:30:00', 'Praktik: Upload Produk & Katalog', 'Tim Pendamping', 7),
    (prog_id, '17:15:00', 'Tanya Jawab', 'Dimas', 8),
    (prog_id, '17:30:00', 'Pembagian Sertifikat & Penutupan', 'Dimas', 9);

  -- Seminar Parenting
  SELECT id INTO prog_id FROM public.programs WHERE name = 'Seminar Parenting';
  INSERT INTO public.rundowns (program_id, item_time, activity_name, pic, order_index) VALUES
    (prog_id, '08:00:00', 'Registrasi & Welcome Coffee', 'Panitia', 1),
    (prog_id, '08:45:00', 'Pembukaan & Menyanyikan Lagu Indonesia Raya', 'MC', 2),
    (prog_id, '09:00:00', 'Sambutan Ketua KKN', 'Ketua Kelompok', 3),
    (prog_id, '09:15:00', 'Sambutan Kepala Desa', 'Kepala Desa', 4),
    (prog_id, '09:30:00', 'Materi: Pola Asuh Anak di Era Digital', 'Psikolog', 5),
    (prog_id, '10:30:00', 'Sesi Tanya Jawab', 'Moderator', 6),
    (prog_id, '11:00:00', 'Coffee Break', '-', 7),
    (prog_id, '11:15:00', 'Sharing Session: Pengalaman Orang Tua', 'Moderator', 8),
    (prog_id, '12:00:00', 'Penutupan & Pembagian Sertifikat', 'MC', 9),
    (prog_id, '12:15:00', 'Foto Bersama', 'PDD', 10);

  -- Malam Keakraban (Makrab)
  SELECT id INTO prog_id FROM public.programs WHERE name = 'Malam Keakraban (Makrab)';
  INSERT INTO public.rundowns (program_id, item_time, activity_name, pic, order_index) VALUES
    (prog_id, '18:00:00', 'Berkumpul & Persiapan Acara', 'Panitia', 1),
    (prog_id, '18:30:00', 'Pembukaan & Doa', 'MC', 2),
    (prog_id, '18:45:00', 'Sambutan Ketua KKN', 'Ketua Kelompok', 3),
    (prog_id, '19:00:00', 'Makan Malam Bersama', 'Semua', 4),
    (prog_id, '19:45:00', 'Ice Breaking & Games', 'MC', 5),
    (prog_id, '20:30:00', 'Pemutaran Video Dokumentasi KKN', 'PDD', 6),
    (prog_id, '21:00:00', 'Sesi Kesan-Pesan', 'Semua', 7),
    (prog_id, '21:45:00', 'Pembagian Plakat Kenang-kenangan', 'Ketua Kelompok', 8),
    (prog_id, '22:00:00', 'Foto Bersama & Penutupan', 'PDD', 9),
    (prog_id, '22:15:00', 'Bersih-bersih Posko', 'Semua', 10);

END $$;

-- ============================================
-- 8. ANNOUNCEMENTS
-- ============================================

INSERT INTO public.announcements (title, content, priority, created_by, published_at) VALUES
  (
    'Selamat Datang di KKN Kelompok 11 Desa Bambang',
    'Selamat datang pada Dashboard KKN Kelompok 11. Seluruh informasi kegiatan, jadwal, dan dokumentasi dapat diakses melalui website ini.',
    'high',
    (SELECT id FROM public.profiles WHERE role = 'admin' LIMIT 1),
    NOW()
  ),
  (
    'Jadwal Mengajar Formal Telah Tersedia',
    'Jadwal Relawan Mengajar Formal di PAUD sudah tersedia. Silakan cek di menu Jadwal atau Timeline.',
    'normal',
    (SELECT id FROM public.profiles WHERE role = 'admin' LIMIT 1),
    NOW()
  ),
  (
    'Reminder: Isi Checklist Program',
    'Jangan lupa untuk mengisi checklist persiapan setiap program kerja melalui dashboard admin.',
    'normal',
    (SELECT id FROM public.profiles WHERE role = 'admin' LIMIT 1),
    NOW()
  );

COMMIT;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================
-- Jalankan query berikut untuk memverifikasi data:

-- Check Programs with PJ
SELECT 
  p.name as program_name,
  p.category,
  p.status,
  prof.full_name as pj_name,
  p.scheduled_date
FROM public.programs p
LEFT JOIN public.profiles prof ON p.pj_id = prof.id
ORDER BY p.category, p.name;

-- Check all tables count
SELECT 'Programs' as table_name, COUNT(*) as total FROM public.programs
UNION ALL
SELECT 'Schedules', COUNT(*) FROM public.schedules
UNION ALL
SELECT 'Checklists', COUNT(*) FROM public.checklists
UNION ALL
SELECT 'Rundowns', COUNT(*) FROM public.rundowns
UNION ALL
SELECT 'Announcements', COUNT(*) FROM public.announcements;

-- Check PJ assignment per category
SELECT 
  p.category,
  prof.full_name as pj_name,
  COUNT(*) as total_programs
FROM public.programs p
LEFT JOIN public.profiles prof ON p.pj_id = prof.id
GROUP BY p.category, prof.full_name
ORDER BY p.category;

-- Check recurring schedules summary
SELECT 
  p.name as program_name,
  COUNT(s.id) as total_schedules,
  MIN(s.schedule_date) as first_date,
  MAX(s.schedule_date) as last_date
FROM public.schedules s
JOIN public.programs p ON s.program_id = p.id
GROUP BY p.name
ORDER BY total_schedules DESC;

-- Check profiles with their programs
SELECT 
  prof.full_name,
  prof.role,
  COUNT(p.id) as total_programs_as_pj
FROM public.profiles prof
LEFT JOIN public.programs p ON prof.id = p.pj_id
GROUP BY prof.id, prof.full_name, prof.role
ORDER BY total_programs_as_pj DESC;
