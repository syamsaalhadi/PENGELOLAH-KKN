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
import { getScheduleById, updateSchedule } from "@/app/actions/schedule"
import { getPrograms } from "@/app/actions/program"
import type { Schedule } from "@/app/actions/schedule"

export default function EditJadwalPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [schedule, setSchedule] = useState<Schedule | null>(null)
  const [programs, setPrograms] = useState<Array<{ id: string; name: string }>>([])

  useEffect(() => {
    async function loadData() {
      const [scheduleRes, programsRes] = await Promise.all([
        getScheduleById(id),
        getPrograms()
      ])
      
      if (scheduleRes.error) {
        setError(scheduleRes.error)
      } else if (scheduleRes.data) {
        setSchedule(scheduleRes.data as Schedule)
      }
      
      if (programsRes.data) {
        setPrograms(programsRes.data)
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
    
    const result = await updateSchedule(id, formData)
    
    if (result.error) {
      setError(result.error)
      setIsSaving(false)
    } else {
      router.push("/admin/jadwal")
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!schedule) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
        Data jadwal tidak ditemukan atau terjadi kesalahan.
      </div>
    )
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
          <h1 className="text-3xl font-bold tracking-tight text-primary">Edit Jadwal</h1>
          <p className="text-muted-foreground">Perbarui informasi jadwal kegiatan.</p>
        </div>
      </div>

      <Card>
        <form action={onSubmit}>
          <CardHeader>
            <CardTitle>Informasi Jadwal</CardTitle>
            <CardDescription>Ubah detail jadwal di bawah ini.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-md border border-red-200 text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="title">Nama Kegiatan <span className="text-red-500">*</span></Label>
              <Input id="title" name="title" required defaultValue={schedule.title} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="schedule_date">Tanggal <span className="text-red-500">*</span></Label>
                <Input id="schedule_date" name="schedule_date" type="date" required defaultValue={schedule.schedule_date} />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="start_time">Waktu Mulai <span className="text-red-500">*</span></Label>
                  <Input id="start_time" name="start_time" type="time" required defaultValue={schedule.start_time.slice(0, 5)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_time">Waktu Selesai</Label>
                  <Input id="end_time" name="end_time" type="time" defaultValue={schedule.end_time ? schedule.end_time.slice(0, 5) : ""} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Lokasi</Label>
              <Input id="location" name="location" defaultValue={schedule.location || ""} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea id="description" name="description" defaultValue={schedule.description || ""} rows={3} />
            </div>

            <div className="space-y-2 pt-2 border-t mt-4">
              <Label htmlFor="program_id">Terkait Program Kerja? (Opsional)</Label>
              <Select name="program_id" defaultValue={schedule.program_id || ""}>
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
