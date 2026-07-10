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
import { createSchedule } from "@/app/actions/schedule"
import { getPrograms } from "@/app/actions/program"

export default function TambahJadwalPage() {
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
    
    const result = await createSchedule(formData)
    
    if (result.error) {
      setError(result.error)
      setIsLoading(false)
    } else {
      router.push("/admin/jadwal")
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
      <div className="flex items-center gap-4">
        <Link href="/admin/jadwal">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Tambah Jadwal</h1>
          <p className="text-muted-foreground">Buat jadwal agenda kegiatan baru.</p>
        </div>
      </div>

      <Card>
        <form action={onSubmit}>
          <CardHeader>
            <CardTitle>Informasi Jadwal</CardTitle>
            <CardDescription>Isi detail jadwal kegiatan di bawah ini.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-md border border-red-200 text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="title">Nama Kegiatan <span className="text-red-500">*</span></Label>
              <Input id="title" name="title" required placeholder="Contoh: Senam Pagi Bersama Warga" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="schedule_date">Tanggal <span className="text-red-500">*</span></Label>
                <Input id="schedule_date" name="schedule_date" type="date" required />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="start_time">Waktu Mulai <span className="text-red-500">*</span></Label>
                  <Input id="start_time" name="start_time" type="time" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_time">Waktu Selesai</Label>
                  <Input id="end_time" name="end_time" type="time" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Lokasi</Label>
              <Input id="location" name="location" placeholder="Contoh: Balai Desa Bambang" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea id="description" name="description" placeholder="Penjelasan singkat..." rows={3} />
            </div>

            <div className="space-y-2 pt-2 border-t mt-4">
              <Label htmlFor="program_id">Terkait Program Kerja? (Opsional)</Label>
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
            <Link href="/admin/jadwal">
              <Button type="button" variant="outline">Batal</Button>
            </Link>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan Jadwal
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
