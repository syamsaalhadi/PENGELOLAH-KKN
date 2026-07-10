import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { getAllRundowns } from "@/app/actions/rundown"
import { RundownActions } from "./actions-menu"

export default async function AdminRundownPage() {
  const { data, error } = await getAllRundowns()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Kelola Rundown Acara</h1>
          <p className="text-muted-foreground">Detail kegiatan jam per jam untuk jadwal acara KKN.</p>
        </div>
        <Link href="/admin/rundown/tambah">
          <Button className="w-fit">
            <Plus className="w-4 h-4 mr-2" /> Tambah Acara
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Rundown</CardTitle>
          <CardDescription>Semua urutan acara berdasarkan program kerja.</CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="p-3 bg-red-50 text-red-600 rounded-md border border-red-200 text-sm">
              Gagal memuat data: {error}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Program Terkait</TableHead>
                    <TableHead>Waktu</TableHead>
                    <TableHead>Aktivitas</TableHead>
                    <TableHead>PIC</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(!data || data.length === 0) ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                        Belum ada data rundown.
                      </TableCell>
                    </TableRow>
                  ) : (
                    data.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          {item.program ? (
                            <div className="flex flex-col">
                              <span className="font-medium text-sm">{item.program.name}</span>
                              <span className="text-xs text-muted-foreground">{item.program.category || '-'}</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="font-medium whitespace-nowrap">
                          {item.item_time.substring(0, 5)}
                        </TableCell>
                        <TableCell>{item.activity_name}</TableCell>
                        <TableCell>{item.pic || "-"}</TableCell>
                        <TableCell>
                          <RundownActions rundownId={item.id} />
                        </TableCell>
                      </TableRow>
                    ))
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
