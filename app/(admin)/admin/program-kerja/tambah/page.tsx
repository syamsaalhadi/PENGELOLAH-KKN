"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Loader2 } from "lucide-react"
import { createProgram } from "@/app/actions/program"
import { getProfiles } from "@/app/actions/profile"

export default function TambahProgramPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [profiles, setProfiles] = useState<Array<{ id: string; full_name: string; role?: string }>>([])
  
  useEffect(() => {
    async function fetchProfiles() {
      const { data } = await getProfiles()
      if (data) setProfiles(data)
    }
    fetchProfiles()
  }, [])

  async function onSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)
    
    const result = await createProgram(formData)
    
    if (result.error) {
      setError(result.error)
      setIsLoading(false)
    } else {
      router.push("/admin/program-kerja")
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
      <div className="flex items-center gap-4">
        <Link href="/admin/program-kerja">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Tambah Program Kerja</h1>
          <p className="text-muted-foreground">Buat program kerja baru untuk Kelompok KKN 11.</p>
        </div>
      </div>

      <Card>
        <form action={onSubmit}>
          <CardHeader>
            <CardTitle>Informasi Program</CardTitle>
            <CardDescription>Isi detail program kerja di bawah ini.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-md border border-red-200 text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="name">Nama Program <span className="text-red-500">*</span></Label>
              <Input id="name" name="name" required placeholder="Contoh: Penyuluhan Stunting" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea id="description" name="description" placeholder="Penjelasan singkat mengenai program..." rows={3} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Input id="category" name="category" placeholder="Contoh: Kesehatan, Lingkungan" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status Awal</Label>
                <Select name="status" defaultValue="Belum Dimulai">
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Belum Dimulai">Belum Dimulai</SelectItem>
                    <SelectItem value="Berjalan">Berjalan</SelectItem>
                    <SelectItem value="Selesai">Selesai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2 pt-2">
              <Label htmlFor="pj_id">Penanggung Jawab (PJ)</Label>
              <Select name="pj_id">
                <SelectTrigger>
                  <SelectValue placeholder="Pilih anggota..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">-- Tidak ada --</SelectItem>
                  {profiles.map((profile) => (
                    <SelectItem key={profile.id} value={profile.id}>
                      {profile.full_name} {profile.role === 'admin' ? '(Admin)' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-3 border-t p-6">
            <Link href="/admin/program-kerja">
              <Button type="button" variant="outline">Batal</Button>
            </Link>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan Program
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
