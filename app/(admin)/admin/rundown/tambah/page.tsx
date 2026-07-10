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
import { createRundown } from "@/app/actions/rundown"
import { getPrograms } from "@/app/actions/program"
import { format } from "date-fns"
import { id } from "date-fns/locale"

export default function TambahRundownPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [programs, setPrograms] = useState<Array<{ id: string; name: string; category: string }>>([])

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
    
    const result = await createRundown(formData)
    
    if (result.error) {
      setError(result.error)
      setIsLoading(false)
    } else {
      router.push("/admin/rundown")
    }
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
          <h1 className="text-3xl font-bold tracking-tight text-primary">Tambah Rundown</h1>
          <p className="text-muted-foreground">Buat aktivitas baru ke dalam rundown.</p>
        </div>
      </div>

      <Card>
        <form action={onSubmit}>
          <CardHeader>
            <CardTitle>Informasi Aktivitas</CardTitle>
            <CardDescription>Isi detail waktu dan aktivitas.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-md border border-red-200 text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="program_id">Program Kerja <span className="text-red-500">*</span></Label>
              <Select name="program_id" required>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih program kerja" />
                </SelectTrigger>
                <SelectContent>
                  {programs.map((prog) => (
                    <SelectItem key={prog.id} value={prog.id}>
                      {prog.name} <span className="text-muted-foreground text-xs">({prog.category})</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="item_time">Waktu Mulai <span className="text-red-500">*</span></Label>
                <Input id="item_time" name="item_time" type="time" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="activity_name">Nama Aktivitas <span className="text-red-500">*</span></Label>
              <Input id="activity_name" name="activity_name" required placeholder="Contoh: Persiapan Alat" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pic">Penanggung Jawab (PIC)</Label>
              <Input id="pic" name="pic" placeholder="Contoh: Sie Perlengkapan" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Catatan Tambahan</Label>
              <Textarea id="notes" name="notes" placeholder="Catatan opsional..." rows={3} />
            </div>

          </CardContent>
          <CardFooter className="flex justify-end gap-3 border-t p-6">
            <Link href="/admin/rundown">
              <Button type="button" variant="outline">Batal</Button>
            </Link>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan Rundown
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
