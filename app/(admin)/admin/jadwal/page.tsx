import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { getSchedules } from "@/app/actions/schedule"
import { ScheduleActions } from "./actions-menu"

export default async function AdminJadwalPage() {
  const { data: schedules, error } = await getSchedules()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Kelola Jadwal</h1>
          <p className="text-muted-foreground">Manajemen agenda kegiatan harian KKN.</p>
        </div>
        <Link href="/admin/jadwal/tambah">
          <Button className="w-fit">
            <Plus className="w-4 h-4 mr-2" /> Tambah Jadwal
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Jadwal Kegiatan</CardTitle>
          <CardDescription>Semua jadwal yang telah dan akan dilaksanakan.</CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="p-4 bg-red-50 text-red-600 rounded-md border border-red-200">
              Gagal memuat jadwal: {error}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Waktu</TableHead>
                    <TableHead>Kegiatan</TableHead>
                    <TableHead>Lokasi</TableHead>
                    <TableHead>Pembuat</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!schedules || schedules.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                        Belum ada jadwal yang ditambahkan.
                      </TableCell>
                    </TableRow>
                  ) : (
                    schedules.map((item) => {
                      const dateStr = new Date(item.schedule_date).toLocaleDateString('id-ID', { 
                        weekday: 'short', 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      })
                      
                      const timeString = item.end_time 
                        ? `${item.start_time.slice(0, 5)} - ${item.end_time.slice(0, 5)}`
                        : item.start_time.slice(0, 5)

                      return (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium whitespace-nowrap">{dateStr}</TableCell>
                          <TableCell className="whitespace-nowrap">{timeString}</TableCell>
                          <TableCell>
                            <div>{item.title}</div>
                            {item.program && <div className="text-xs text-muted-foreground">Proker: {item.program.name}</div>}
                          </TableCell>
                          <TableCell>{item.location || '-'}</TableCell>
                          <TableCell>{item.creator?.full_name || 'Admin'}</TableCell>
                          <TableCell>
                            <ScheduleActions scheduleId={item.id} />
                          </TableCell>
                        </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
