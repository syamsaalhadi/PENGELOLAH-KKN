"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Loader2 } from "lucide-react"
import { getProfileById, updateProfile } from "@/app/actions/profile"

export default function EditAnggotaPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [profile, setProfile] = useState<{
    id: string
    full_name: string
    role: string
    phone: string | null
  } | null>(null)

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true)
      const res = await getProfileById(id)
      
      if (res.data) {
        setProfile(res.data)
      } else if (res.error) {
        setError(res.error)
      }
      setIsFetching(false)
    }
    fetchData()
  }, [id])

  async function onSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)
    
    const result = await updateProfile(id, formData)
    
    if (result.error) {
      setError(result.error)
      setIsLoading(false)
    } else {
      router.push("/admin/anggota")
    }
  }

  if (isFetching) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Profil anggota tidak ditemukan</h2>
        <Link href="/admin/anggota">
          <Button>Kembali ke daftar anggota</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
      <div className="flex items-center gap-4">
        <Link href="/admin/anggota">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Edit Profil Anggota</h1>
          <p className="text-muted-foreground">Perbarui informasi data anggota KKN.</p>
        </div>
      </div>

      <Card>
        <form action={onSubmit}>
          <CardHeader>
            <CardTitle>Informasi Profil</CardTitle>
            <CardDescription>Ubah detail nama, peran, dan kontak anggota.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-md border border-red-200 text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="full_name">Nama Lengkap <span className="text-red-500">*</span></Label>
              <Input id="full_name" name="full_name" required defaultValue={profile.full_name} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Peran Sistem</Label>
                <Select name="role" defaultValue={profile.role || "member"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih peran" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">User (Anggota Biasa)</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon (WhatsApp)</Label>
                <Input id="phone" name="phone" type="tel" defaultValue={profile.phone || ""} />
              </div>
            </div>

          </CardContent>
          <CardFooter className="flex justify-end gap-3 border-t p-6">
            <Link href="/admin/anggota">
              <Button type="button" variant="outline">Batal</Button>
            </Link>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan Perubahan
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
