import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import Link from "next/link"
import { getAnnouncements } from "@/app/actions/announcement"
import { AnnouncementActions } from "./actions-menu"
import { format } from "date-fns"
import { id } from "date-fns/locale"

export default async function AdminPengumumanPage() {
  const { data, error } = await getAnnouncements()

  const getPriorityBadge = (priority: string) => {
    if (priority === "tinggi" || priority === "high")
      return <Badge variant="destructive">Tinggi</Badge>
    if (priority === "rendah" || priority === "low")
      return <Badge variant="outline">Rendah</Badge>
    return <Badge variant="secondary">Normal</Badge>
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Kelola Pengumuman</h1>
          <p className="text-muted-foreground">Buat dan kelola pengumuman untuk seluruh anggota KKN.</p>
        </div>
        <Link href="/admin/pengumuman/tambah">
          <Button className="w-fit">
            <Plus className="w-4 h-4 mr-2" /> Tambah Pengumuman
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengumuman</CardTitle>
          <CardDescription>Semua pengumuman yang telah diterbitkan.</CardDescription>
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
                    <TableHead>Judul</TableHead>
                    <TableHead>Prioritas</TableHead>
                    <TableHead>Dibuat Oleh</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(!data || data.length === 0) ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                        Belum ada pengumuman. Klik &quot;Tambah Pengumuman&quot; untuk membuat baru.
                      </TableCell>
                    </TableRow>
                  ) : (
                    data.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <span className="font-medium">{item.title}</span>
                            <span className="text-xs text-muted-foreground line-clamp-1">{item.content}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getPriorityBadge(item.priority)}</TableCell>
                        <TableCell>{item.author?.full_name || "-"}</TableCell>
                        <TableCell>
                          {format(new Date(item.created_at), "d MMM yyyy", { locale: id })}
                        </TableCell>
                        <TableCell>
                          <AnnouncementActions announcementId={item.id} />
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
