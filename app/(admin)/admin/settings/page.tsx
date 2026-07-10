"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Save } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Pengaturan Sistem</h1>
        <p className="text-muted-foreground">Konfigurasi pengaturan umum sistem KKN Desa Bambang.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-glass-surface backdrop-blur-md border-glass-border flex flex-col">
          <CardHeader>
            <CardTitle>Informasi Kelompok</CardTitle>
            <CardDescription>Data dasar mengenai kelompok KKN</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
            <div className="space-y-2">
              <Label htmlFor="nama-kelompok">Nama Kelompok</Label>
              <Input id="nama-kelompok" defaultValue="Kelompok KKN 11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lokasi">Lokasi Pengabdian</Label>
              <Input id="lokasi" defaultValue="Desa Bambang, Kec. Turi, Kab. Lamongan" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dpl">Dosen Pembimbing Lapangan (DPL)</Label>
              <Input id="dpl" defaultValue="Diana Dwi Jayanti, S.Psi., M.Si." />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full sm:w-auto">
              <Save className="w-4 h-4 mr-2" /> Simpan Perubahan
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-glass-surface backdrop-blur-md border-glass-border flex flex-col">
          <CardHeader>
            <CardTitle>Periode Pelaksanaan</CardTitle>
            <CardDescription>Jadwal mulai dan selesai kegiatan KKN</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Tanggal Mulai</Label>
                <Input id="start-date" type="date" defaultValue="2026-07-17" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">Tanggal Selesai</Label>
                <Input id="end-date" type="date" defaultValue="2026-08-16" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi Tema KKN</Label>
              <Textarea 
                id="description" 
                defaultValue="Pemberdayaan Masyarakat Melalui Optimalisasi Potensi Desa di Era Digital"
                rows={4} 
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full sm:w-auto">
              <Save className="w-4 h-4 mr-2" /> Simpan Perubahan
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
