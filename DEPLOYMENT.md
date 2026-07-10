# 🚀 Panduan Deployment ke Vercel

## Pre-Deployment Checklist

✅ **Sudah Selesai:**
- [x] Build production berhasil tanpa error
- [x] Environment variables terdokumentasi
- [x] Security headers dikonfigurasi
- [x] .gitignore sudah proper
- [x] Logo dan favicon sudah diganti
- [x] Bug form rundown diperbaiki
- [x] README updated

---

## Step-by-Step Deployment

### 1. Persiapan Repository

```bash
# Pastikan semua perubahan sudah di-commit
git add .
git commit -m "chore: prepare for production deployment"

# Push ke GitHub
git push origin main
```

### 2. Setup Vercel Account

1. Buka [vercel.com](https://vercel.com)
2. Sign up / Login dengan GitHub account
3. Authorize Vercel untuk akses repository

### 3. Import Project

1. Click "Add New..." → "Project"
2. Pilih repository `kkn-bambang`
3. Vercel akan auto-detect Next.js framework
4. **JANGAN DEPLOY DULU** - setup environment variables dulu

### 4. Configure Environment Variables

Di halaman import project, scroll ke bawah ke section **Environment Variables**.

Tambahkan variable-variable berikut (copy dari `.env.local`):

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://ttcmexmmgyysjcerspzv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0Y21leG1tZ3l5c2pjZXJzcHp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1OTg3NjAsImV4cCI6MjA5OTE3NDc2MH0.cA6ZSe8PaokoRP_1AKozlS9O3-u9SDKNfKIoQFdHWW4
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0Y21leG1tZ3l5c2pjZXJzcHp2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzU5ODc2MCwiZXhwIjoyMDk5MTc0NzYwfQ.OvuVd2zDP0eCY7Ny-XvEGSxPca1PeBfIuq6X-wdy5Ws

# Application Configuration
NEXT_PUBLIC_APP_NAME=KKN Desa Bambang Management System
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app

# KKN Program Configuration
NEXT_PUBLIC_KKN_START_DATE=2026-07-17
NEXT_PUBLIC_KKN_END_DATE=2026-08-16
NEXT_PUBLIC_KKN_TOTAL_DAYS=30
```

**PENTING:** 
- Variable `NEXT_PUBLIC_APP_URL` akan otomatis diisi setelah deployment pertama
- Setelah deploy, update variable ini dengan URL production Anda

### 5. Deploy!

1. Click **Deploy**
2. Tunggu ~2-3 menit proses build & deployment
3. Setelah selesai, Vercel akan memberikan URL production: `https://kkn-bambang.vercel.app`

### 6. Post-Deployment Configuration

#### Update APP_URL

1. Setelah deployment berhasil, copy URL production
2. Go to Project Settings → Environment Variables
3. Edit `NEXT_PUBLIC_APP_URL` → paste URL production
4. Redeploy (Vercel akan auto-redeploy)

#### Configure Custom Domain (Opsional)

1. Go to Project Settings → Domains
2. Add custom domain (misalnya: `kkn-bambang.com`)
3. Follow DNS configuration instructions dari Vercel
4. Update `NEXT_PUBLIC_APP_URL` dengan domain baru

#### Setup Supabase URL Whitelist

1. Login ke [Supabase Dashboard](https://app.supabase.com)
2. Pilih project Anda
3. Go to Settings → API → URL Configuration
4. Add production URL ke whitelist:
   - `https://kkn-bambang.vercel.app`
   - Custom domain jika ada

### 7. Testing Production

Setelah deployment berhasil, test fitur-fitur berikut:

- [ ] Landing page load dengan benar
- [ ] Login dengan akun admin berhasil
- [ ] Dashboard menampilkan data dari Supabase
- [ ] Navigation antar halaman bekerja
- [ ] CRUD operations (tambah, edit, hapus) berhasil
- [ ] Upload file dokumentasi berhasil
- [ ] Mobile responsive design OK
- [ ] Logo click 5x redirect ke admin

---

## Monitoring & Maintenance

### Vercel Analytics (Opsional)

1. Go to Project → Analytics tab
2. Enable Vercel Analytics untuk monitoring traffic & performance

### Logs & Debugging

Jika ada error di production:
1. Go to Project → Deployments
2. Click deployment terakhir
3. View Function Logs untuk error details

### Rollback Deployment

Jika deployment baru ada masalah:
1. Go to Project → Deployments
2. Pilih deployment sebelumnya yang stabil
3. Click "..." → "Promote to Production"

---

## Continuous Deployment

Vercel sudah otomatis setup CI/CD:
- **Push ke `main` branch** → Auto deploy ke production
- **Push ke branch lain** → Auto deploy preview deployment
- **Pull Request** → Preview deployment dengan unique URL

---

## Troubleshooting

### Build Error di Vercel

```bash
# Test build locally dulu
npm run build

# Jika error, fix dulu sebelum push
```

### Environment Variable Tidak Terload

- Pastikan semua variable diawali `NEXT_PUBLIC_` untuk client-side access
- Redeploy setelah update env vars
- Clear browser cache

### Supabase Connection Error

- Check Supabase URL whitelist
- Verify `NEXT_PUBLIC_SUPABASE_URL` dan `ANON_KEY` benar
- Check RLS policies di Supabase

### 404 on Refresh

Next.js App Router **tidak** butuh `rewrites` config - sudah handle otomatis.
Jika ada 404, kemungkinan ada issue di routing.

---

## Security Best Practices

✅ **Sudah Dikonfigurasi:**
- Security headers (CSP, X-Frame-Options, etc.) via `vercel.json`
- Environment variables tidak di-commit ke Git
- RLS policies di Supabase database
- Auth middleware untuk protected routes

⚠️ **Jangan Lupa:**
- Rotate Supabase Service Role Key secara berkala
- Monitor Supabase usage untuk unusual activity
- Enable 2FA di akun Vercel dan Supabase

---

## Contact

Jika ada masalah deployment:
1. Check Vercel deployment logs
2. Check Supabase logs
3. Hubungi developer: [Your Contact]

---

**Happy Deploying! 🚀**
