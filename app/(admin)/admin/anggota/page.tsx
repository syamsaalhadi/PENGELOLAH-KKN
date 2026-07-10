import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, ShieldAlert, Phone } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getProfiles } from "@/app/actions/profile"
import { ProfileActions } from "./actions-menu"
import Link from "next/link"

export default async function AdminAnggotaPage() {
  const { data: profiles, error } = await getProfiles()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Kelola Anggota</h1>
          <p className="text-muted-foreground">Manajemen data anggota KKN Kelompok 11.</p>
        </div>
        <Link href="/admin/anggota/tambah">
          <Button className="w-fit">
            <Plus className="w-4 h-4 mr-2" /> Tambah Anggota
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Anggota</CardTitle>
          <CardDescription>Daftar semua anggota yang terdaftar di sistem.</CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="p-4 bg-red-50 text-red-600 rounded-md border border-red-200">
              Gagal memuat daftar anggota: {error}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Peran</TableHead>
                    <TableHead>Kontak</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!profiles || profiles.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                        Belum ada anggota terdaftar.
                      </TableCell>
                    </TableRow>
                  ) : (
                    profiles.map((item) => {
                      const initials = item.full_name
                        ? item.full_name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
                        : '??'

                      return (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              {item.avatar_url ? (
                                <AvatarImage src={item.avatar_url} />
                              ) : (
                                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${item.full_name}`} />
                              )}
                              <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>
                            {item.full_name}
                          </TableCell>
                          <TableCell>
                            {item.role === "admin" ? (
                              <Badge variant="default" className="bg-danger hover:bg-danger/90">
                                <ShieldAlert className="w-3 h-3 mr-1" /> Admin
                              </Badge>
                            ) : (
                              <Badge variant="secondary">Member</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {item.phone ? (
                              <div className="flex items-center gap-2">
                                <Phone className="w-3 h-3" /> {item.phone}
                              </div>
                            ) : '-'}
                          </TableCell>
                          <TableCell>
                          <ProfileActions profileId={item.id} />
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
