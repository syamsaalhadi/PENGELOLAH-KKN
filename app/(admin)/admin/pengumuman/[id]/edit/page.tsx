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
import { getAnnouncementById, updateAnnouncement } from "@/app/actions/announcement"

export default function EditPengumumanPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [announcement, setAnnouncement] = useState<{
    id: string
    title: string
    content: string
    priority: string
  } | null>(null)

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true)
      const res = await getAnnouncementById(id)
      if (res.data) {
        setAnnouncement(res.data)
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

    const result = await updateAnnouncement(id, formData)

    if (result.error) {
      setError(result.error)
      setIsLoading(false)
    } else {
      router.push("/admin/pengumuman")
    }
  }

  if (isFetching) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!announcement) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Pengumuman tidak ditemukan</h2>
        <Link href="/admin/pengumuman">
          <Button>Kembali ke daftar</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
      <div className="flex items-center gap-4">
        <Link href="/admin/pengumuman">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Edit Pengumuman</h1>
          <p className="text-muted-foreground">Perbarui isi pengumuman.</p>
        </div>
      </div>

      <Card>
        <form action={onSubmit}>
          <CardHeader>
            <CardTitle>Konten Pengumuman</CardTitle>
            <CardDescription>Ubah judul, isi, dan prioritas pengumuman.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-md border border-red-200 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="title">Judul Pengumuman <span className="text-red-500">*</span></Label>
              <Input id="title" name="title" required defaultValue={announcement.title} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Isi Pengumuman <span className="text-red-500">*</span></Label>
              <Textarea
                id="content"
                name="content"
                required
                rows={5}
                defaultValue={announcement.content}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Prioritas</Label>
              <Select name="priority" defaultValue={announcement.priority || "normal"}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih prioritas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tinggi">Tinggi</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="rendah">Rendah</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-3 border-t p-6">
            <Link href="/admin/pengumuman">
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
