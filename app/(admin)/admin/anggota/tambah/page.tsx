"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, Loader2, UserPlus, Info, AlertCircle } from "lucide-react"
import Link from "next/link"
import { createNewMember } from "@/app/actions/profile"
import { useToast } from "@/hooks/use-toast"

export default function TambahAnggotaPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState(false)
  const [showSetupInfo, setShowSetupInfo] = React.useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = await createNewMember(formData)

    if (result.error) {
      toast({
        title: "Gagal menambah anggota",
        description: result.error,
        variant: "destructive",
      })
      setIsLoading(false)
      
      // Show setup info if error is related to configuration
      if (result.error.includes("SUPABASE_SERVICE_ROLE_KEY")) {
        setShowSetupInfo(true)
      }
    } else {
      toast({
        title: "Berhasil",
        description: (result as any).warning || "Anggota baru berhasil ditambahkan",
      })
      router.push("/admin/anggota")
      router.refresh()
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/anggota">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Tambah Anggota Baru</h1>
          <p className="text-muted-foreground">Buat akun anggota KKN baru dengan email dan password.</p>
        </div>
      </div>

      {showSetupInfo && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Konfigurasi Diperlukan</AlertTitle>
          <AlertDescription className="space-y-2">
            <p>Untuk membuat user baru, Anda perlu:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Dapatkan Service Role Key dari Supabase Dashboard → Project Settings → API</li>
              <li>Tambahkan ke file .env.local: <code className="bg-black/10 px-1 rounded">SUPABASE_SERVICE_ROLE_KEY=...</code></li>
              <li>Atau nonaktifkan Email Confirmation di Supabase Dashboard → Authentication → Providers → Email</li>
            </ol>
            <p className="text-xs mt-2">
              Lihat file <code className="bg-black/10 px-1 rounded">SUPABASE_SETUP.md</code> untuk panduan lengkap
            </p>
          </AlertDescription>
        </Alert>
      )}

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Info Penting</AlertTitle>
        <AlertDescription>
          User yang dibuat akan otomatis mendapat akses ke sistem. Pastikan data yang dimasukkan sudah benar.
          Jika mengalami error, cek file <strong>SUPABASE_SETUP.md</strong> untuk troubleshooting.
        </AlertDescription>
      </Alert>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Form Pendaftaran Anggota
          </CardTitle>
          <CardDescription>
            Isi formulir di bawah untuk mendaftarkan anggota baru. Email dan password akan digunakan untuk login.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="contoh@email.com"
                required
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                Email akan digunakan untuk login ke sistem
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Minimal 6 karakter"
                required
                minLength={6}
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                Password minimal 6 karakter
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="full_name">
                Nama Lengkap <span className="text-red-500">*</span>
              </Label>
              <Input
                id="full_name"
                name="full_name"
                type="text"
                placeholder="Nama lengkap anggota"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="08123456789"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">
                Peran <span className="text-red-500">*</span>
              </Label>
              <Select name="role" defaultValue="member" required disabled={isLoading}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih peran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member (Anggota Biasa)</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Admin memiliki akses penuh ke dashboard admin
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Tambah Anggota
                  </>
                )}
              </Button>
              <Link href="/admin/anggota" className="flex-1">
                <Button type="button" variant="outline" disabled={isLoading} className="w-full">
                  Batal
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
