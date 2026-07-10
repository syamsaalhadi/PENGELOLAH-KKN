"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Loader2 } from "lucide-react"
import { createDocument } from "@/app/actions/document"
import { getPrograms } from "@/app/actions/program"

export default function TambahDokumentasiPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [programs, setPrograms] = useState<Array<{ id: string; name: string }>>([])

  useEffect(() => {
    async function fetchPrograms() {
      const { data } = await getPrograms()
      if (data) setPrograms(data)
    }
    fetchPrograms()
  }, [])

  async function onSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)
    
    const result = await createDocument(formData)
    
    if (result.error) {
      setError(result.error)
      setIsLoading(false)
    } else {
      router.push("/admin/dokumentasi")
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
      <div className="flex items-center gap-4">
        <Link href="/admin/dokumentasi">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Tambah Dokumentasi</h1>
          <p className="text-muted-foreground">Simpan link Google Drive atau URL eksternal lainnya.</p>
        </div>
      </div>

      <Card>
        <form action={onSubmit}>
          <CardHeader>
            <CardTitle>Informasi File/Link</CardTitle>
            <CardDescription>Isi detail dokumentasi.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-md border border-red-200 text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="title">Judul Dokumentasi <span className="text-red-500">*</span></Label>
              <Input id="title" name="title" required placeholder="Contoh: Foto Kegiatan Kerja Bakti" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file_url">Link / URL <span className="text-red-500">*</span></Label>
              <Input id="file_url" name="file_url" type="url" required placeholder="https://drive.google.com/..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="program_id">Program Terkait</Label>
              <Select name="program_id">
                <SelectTrigger>
                  <SelectValue placeholder="Pilih program kerja (opsional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">-- Tidak Terkait --</SelectItem>
                  {programs.map((prog) => (
                    <SelectItem key={prog.id} value={prog.id}>
                      {prog.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

          </CardContent>
          <CardFooter className="flex justify-end gap-3 border-t p-6">
            <Link href="/admin/dokumentasi">
              <Button type="button" variant="outline">Batal</Button>
            </Link>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan Dokumentasi
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
