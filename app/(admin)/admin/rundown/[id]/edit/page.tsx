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
import { getRundownById, updateRundown } from "@/app/actions/rundown"
import { getSchedules } from "@/app/actions/schedule"
import { format } from "date-fns"
import { id as localeId } from "date-fns/locale"

export default function EditRundownPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [schedules, setSchedules] = useState<Array<{ id: string; title: string; schedule_date: string }>>([])
  const [rundown, setRundown] = useState<{
    id: string
    schedule_id: string | null
    item_time: string
    activity_name: string
    pic: string | null
    notes: string | null
  } | null>(null)

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true)
      const [schRes, runRes] = await Promise.all([
        getSchedules(),
        getRundownById(id)
      ])
      
      if (schRes.data) setSchedules(schRes.data)
      if (runRes.data) {
        setRundown(runRes.data)
      } else if (runRes.error) {
        setError(runRes.error)
      }
      setIsFetching(false)
    }
    fetchData()
  }, [id])

  async function onSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)
    
    const result = await updateRundown(id, formData)
    
    if (result.error) {
      setError(result.error)
      setIsLoading(false)
    } else {
      router.push("/admin/rundown")
    }
  }

  if (isFetching) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!rundown) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Rundown tidak ditemukan</h2>
        <Link href="/admin/rundown">
          <Button>Kembali ke daftar rundown</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
      <div className="flex items-center gap-4">
        <Link href="/admin/rundown">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Edit Rundown</h1>
          <p className="text-muted-foreground">Perbarui informasi aktivitas dalam rundown.</p>
        </div>
      </div>

      <Card>
        <form action={onSubmit}>
          <CardHeader>
            <CardTitle>Informasi Aktivitas</CardTitle>
            <CardDescription>Ubah detail waktu dan aktivitas.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-md border border-red-200 text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="schedule_id">Terkait Jadwal</Label>
              <Select name="schedule_id" defaultValue={rundown.schedule_id || ""}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jadwal (opsional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">-- Tidak Terkait --</SelectItem>
                  {schedules.map((sch) => (
                    <SelectItem key={sch.id} value={sch.id}>
                      {format(new Date(sch.schedule_date), "dd MMM yyyy", { locale: localeId })} - {sch.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="item_time">Waktu Mulai <span className="text-red-500">*</span></Label>
                <Input id="item_time" name="item_time" type="time" required defaultValue={rundown.item_time.substring(0, 5)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="activity_name">Nama Aktivitas <span className="text-red-500">*</span></Label>
              <Input id="activity_name" name="activity_name" required defaultValue={rundown.activity_name} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pic">Penanggung Jawab (PIC)</Label>
              <Input id="pic" name="pic" defaultValue={rundown.pic || ""} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Catatan Tambahan</Label>
              <Textarea id="notes" name="notes" rows={3} defaultValue={rundown.notes || ""} />
            </div>

          </CardContent>
          <CardFooter className="flex justify-end gap-3 border-t p-6">
            <Link href="/admin/rundown">
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
