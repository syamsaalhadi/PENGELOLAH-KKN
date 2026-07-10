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
import { getDocumentById, updateDocument } from "@/app/actions/document"
import { getPrograms } from "@/app/actions/program"

export default function EditDokumentasiPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [programs, setPrograms] = useState<Array<{ id: string; name: string }>>([])
  const [document, setDocument] = useState<{
    id: string
    title: string
    file_url: string
    program_id: string | null
  } | null>(null)

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true)
      const [progRes, docRes] = await Promise.all([
        getPrograms(),
        getDocumentById(id)
      ])
      
      if (progRes.data) setPrograms(progRes.data)
      if (docRes.data) {
        setDocument(docRes.data)
      } else if (docRes.error) {
        setError(docRes.error)
      }
      setIsFetching(false)
    }
    fetchData()
  }, [id])

  async function onSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)
    
    const result = await updateDocument(id, formData)
    
    if (result.error) {
      setError(result.error)
      setIsLoading(false)
    } else {
      router.push("/admin/dokumentasi")
    }
  }

  if (isFetching) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!document) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Dokumentasi tidak ditemukan</h2>
        <Link href="/admin/dokumentasi">
          <Button>Kembali ke daftar dokumentasi</Button>
        </Link>
      </div>
    )
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
          <h1 className="text-3xl font-bold tracking-tight text-primary">Edit Dokumentasi</h1>
          <p className="text-muted-foreground">Perbarui informasi file atau link.</p>
        </div>
      </div>

      <Card>
        <form action={onSubmit}>
          <CardHeader>
            <CardTitle>Informasi File/Link</CardTitle>
            <CardDescription>Ubah detail dokumentasi.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-md border border-red-200 text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="title">Judul Dokumentasi <span className="text-red-500">*</span></Label>
              <Input id="title" name="title" required defaultValue={document.title} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file_url">Link / URL <span className="text-red-500">*</span></Label>
              <Input id="file_url" name="file_url" type="url" required defaultValue={document.file_url} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="program_id">Program Terkait</Label>
              <Select name="program_id" defaultValue={document.program_id || ""}>
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
              Simpan Perubahan
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
