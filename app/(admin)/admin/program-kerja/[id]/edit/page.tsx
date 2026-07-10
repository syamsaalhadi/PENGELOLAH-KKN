"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Loader2 } from "lucide-react"
import { getProgramById, updateProgram } from "@/app/actions/program"
import { getProfiles } from "@/app/actions/profile"
import type { Program } from "@/app/actions/program"

export default function EditProgramPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [program, setProgram] = useState<Program | null>(null)
  const [profiles, setProfiles] = useState<Array<{ id: string; full_name: string; role?: string }>>([])

  useEffect(() => {
    async function loadData() {
      const [programRes, profilesRes] = await Promise.all([
        getProgramById(id),
        getProfiles()
      ])
      
      if (programRes.error) {
        setError(programRes.error)
      } else if (programRes.data) {
        setProgram(programRes.data as Program)
      }
      
      if (profilesRes.data) {
        setProfiles(profilesRes.data)
      }
      
      setIsLoading(false)
    }
    
    if (id) {
      loadData()
    }
  }, [id])

  async function onSubmit(formData: FormData) {
    setIsSaving(true)
    setError(null)
    
    const result = await updateProgram(id, formData)
    
    if (result.error) {
      setError(result.error)
      setIsSaving(false)
    } else {
      router.push("/admin/program-kerja")
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!program) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
        Data program tidak ditemukan atau terjadi kesalahan.
      </div>
    )
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
          <h1 className="text-3xl font-bold tracking-tight text-primary">Edit Program Kerja</h1>
          <p className="text-muted-foreground">Perbarui informasi program kerja KKN.</p>
        </div>
      </div>

      <Card>
        <form action={onSubmit}>
          <CardHeader>
            <CardTitle>Informasi Program</CardTitle>
            <CardDescription>Ubah detail program kerja di bawah ini.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-md border border-red-200 text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="name">Nama Program <span className="text-red-500">*</span></Label>
              <Input id="name" name="name" required defaultValue={program.name} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea id="description" name="description" defaultValue={program.description || ""} rows={3} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Input id="category" name="category" defaultValue={program.category || ""} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue={program.status}>
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
              <Select name="pj_id" defaultValue={program.pj_id || ""}>
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
            <Button type="submit" disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan Perubahan
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
