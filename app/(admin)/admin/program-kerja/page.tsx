import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import { getPrograms } from "@/app/actions/program"
import { ProgramActions } from "./actions-menu"
import Link from "next/link"

export default async function AdminProgramKerjaPage() {
  const { data, error } = await getPrograms()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Kelola Program Kerja</h1>
          <p className="text-muted-foreground">Tambah, edit, atau hapus program kerja KKN.</p>
        </div>
        <Link href="/admin/program-kerja/tambah">
          <Button className="w-fit">
            <Plus className="w-4 h-4 mr-2" /> Tambah Proker
          </Button>
        </Link>
      </div>

      {error ? (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
          Gagal memuat data: {error}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Daftar Program Kerja</CardTitle>
            <CardDescription>Manajemen status dan penanggung jawab program kerja.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Judul Proker</TableHead>
                    <TableHead>PIC</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Kategori</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!data || data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                        Belum ada data program kerja.
                      </TableCell>
                    </TableRow>
                  ) : (
                    data.map((item) => {
                      const statusLabel =
                        item.status === "Selesai" ? "Selesai" :
                          item.status === "Berjalan" ? "Berjalan" :
                            "Belum Dimulai";

                      return (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{item.pj ? (item.pj as any).full_name : "-"}</TableCell>
                          <TableCell>
                            <Badge variant={item.status === "Selesai" ? "secondary" : item.status === "Berjalan" ? "default" : "outline"}>
                              {statusLabel}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">{item.category || "-"}</TableCell>
                          <TableCell>
                            <ProgramActions programId={item.id} />
                          </TableCell>
                        </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
