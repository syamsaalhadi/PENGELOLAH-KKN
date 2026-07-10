import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus, ExternalLink } from "lucide-react"
import Link from "next/link"
import { getDocuments } from "@/app/actions/document"
import { DocumentActions } from "./actions-menu"
import { format } from "date-fns"
import { id } from "date-fns/locale"

export default async function AdminDokumentasiPage() {
  const { data, error } = await getDocuments()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Kelola Dokumentasi</h1>
          <p className="text-muted-foreground">Arsip foto, file pendukung, dan laporan KKN.</p>
        </div>
        <Link href="/admin/dokumentasi/tambah">
          <Button className="w-fit">
            <Plus className="w-4 h-4 mr-2" /> Tambah Dokumentasi
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>File Dokumentasi</CardTitle>
          <CardDescription>Kumpulan link file dokumentasi program kerja.</CardDescription>
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
                    <TableHead>Nama File/Link</TableHead>
                    <TableHead>Program Terkait</TableHead>
                    <TableHead>Pengunggah</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(!data || data.length === 0) ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                        Belum ada dokumentasi.
                      </TableCell>
                    </TableRow>
                  ) : (
                    data.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <span className="truncate max-w-[200px] block">{item.title}</span>
                            <a href={item.file_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        </TableCell>
                        <TableCell>{item.program?.name || "-"}</TableCell>
                        <TableCell>{item.uploader?.full_name || "-"}</TableCell>
                        <TableCell>
                          {format(new Date(item.created_at), "d MMM yyyy", { locale: id })}
                        </TableCell>
                        <TableCell>
                          <DocumentActions documentId={item.id} />
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
