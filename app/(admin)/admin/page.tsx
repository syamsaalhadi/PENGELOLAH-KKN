import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, CheckCircle2, AlertTriangle } from "lucide-react"
import { getDashboardData } from "@/app/actions/dashboard"

export default async function AdminDashboard() {
  const { metrics, programs, activities } = await getDashboardData()

  // Helper to calculate progress percentage for a program based on status
  const getProgress = (status: string) => {
    if (status === 'Selesai') return 100
    if (status === 'Berjalan') return 50
    return 0
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Admin Overview</h1>
          <p className="text-muted-foreground">Pantau progres desa dan manajemen tim harian KKN.</p>
        </div>
        <Badge variant="destructive" className="w-fit">
          <AlertTriangle className="w-4 h-4 mr-1" /> Jangan sebar data akses
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Anggota</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalMembers}</div>
            <p className="text-xs text-muted-foreground">Seluruh tim aktif</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proker Selesai</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.completedPrograms} / {metrics.totalPrograms}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              Data real-time
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dokumentasi Terkumpul</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalDocuments}</div>
            <p className="text-xs text-muted-foreground">Link / File Tersimpan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sisa Waktu</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.daysLeft} Hari</div>
            <Progress value={metrics.timeProgress} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Status Program Kerja</CardTitle>
            <CardDescription>Ringkasan dari seluruh {metrics.totalPrograms} program kerja</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {programs.length === 0 ? (
                <p className="text-sm text-muted-foreground">Belum ada program kerja.</p>
              ) : (
                programs.map((item, i) => {
                  const progress = getProgress(item.status)
                  const picName = item.pj && typeof item.pj === 'object' && 'full_name' in item.pj ? String(item.pj.full_name) : "Belum Ditentukan"
                  return (
                    <div key={i} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-muted-foreground">PIC: {picName} ({progress}%)</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Log Aktivitas Terbaru</CardTitle>
            <CardDescription>Pembaruan sistem & input dari anggota</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.length === 0 ? (
                <p className="text-sm text-muted-foreground">Belum ada aktivitas.</p>
              ) : (
                activities.map((log, i) => (
                  <div key={i} className="flex flex-col gap-1 border-b last:border-0 pb-3 last:pb-0">
                    <p className="text-sm">
                      <span className="font-semibold">{log.user}</span> {log.action}
                    </p>
                    <span className="text-xs text-muted-foreground">{log.time}</span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
