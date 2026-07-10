-- ============================================
-- RESET & RE-SEED DATABASE
-- ============================================
-- Script ini akan menghapus semua data lama dan mengisi ulang
-- dengan data yang lebih realistis dan spesifik

-- PERHATIAN: Ini akan menghapus SEMUA data program, jadwal, checklist, dll
-- Pastikan Anda backup dulu jika ada data penting!

BEGIN;

-- 1. Hapus semua data (kecuali profiles dan settings yang penting)
TRUNCATE TABLE public.checklists CASCADE;
TRUNCATE TABLE public.documents CASCADE;
TRUNCATE TABLE public.rundowns CASCADE;
TRUNCATE TABLE public.schedules CASCADE;
TRUNCATE TABLE public.announcements CASCADE;
TRUNCATE TABLE public.programs CASCADE;

-- 2. Reset settings (opsional - uncomment jika mau reset settings juga)
-- DELETE FROM public.settings WHERE key NOT IN ('group_name', 'location', 'dpl_name', 'start_date', 'end_date');

COMMIT;

-- 3. Sekarang jalankan seed.sql untuk mengisi data baru
-- Copy paste seluruh isi file seed.sql di bawah baris ini
-- ATAU jalankan seed.sql sebagai query terpisah setelah script ini selesai
