import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CalendarDays, CheckCircle2, Clock, MapPin } from "lucide-react"
import { getPrograms } from "@/app/actions/program"
import { getSchedules } from "@/app/actions/schedule"
import { getAnnouncements } from "@/app/actions/announcement"
import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"

export default async function MemberDashboard() {
  const [programsRes, schedulesRes, announcementsRes] = await Promise.all([
    getPrograms(),
    getSchedules(),
    getAnnouncements()
  ])
  
  const programs = programsRes.data || []
  const schedules = schedulesRes.data || []
  const announcements = announcementsRes.data || []
  
  const totalPrograms = programs.length
  const completedPrograms = programs.filter(p => p.status === 'Selesai').length
  const inProgressPrograms = programs.filter(p => p.status === 'Berjalan').length
  
  // Calculate KKN timeline
  const startDate = new Date('2026-07-17T00:00:00Z')
  const endDate = new Date('2026-08-16T23:59:59Z')
  const today = new Date()
  
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24))
  let daysPassed = 0
  let daysRemaining = totalDays
  let timelineProgress = 0
  
  if (today < startDate) {
    daysPassed = 0
    daysRemaining = totalDays
    timelineProgress = 0
  } else if (today > endDate) {
    daysPassed = totalDays
    daysRemaining = 0
    timelineProgress = 100
  } else {
    daysPassed = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 3600 * 24))
    daysRemaining = totalDays - daysPassed
    timelineProgress = Math.round((daysPassed / totalDays) * 100)
  }

  // Get upcoming schedules
  const upcomingSchedules = schedules
    .filter(s => new Date(s.schedule_date) >= new Date(new Date().setHours(0,0,0,0)))
    .slice(0, 4)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Dashboard</h1>
        <p className="text-muted-foreground">Selamat datang di Sistem Informasi Manajemen KKN Desa Bambang.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-glass-surface backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Program Kerja</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPrograms}</div>
            <p className="text-xs text-muted-foreground">{completedPrograms} selesai, {inProgressPrograms} berjalan</p>
          </CardContent>
        </Card>
        <Card className="bg-glass-surface backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Masa KKN</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Hari ke-{daysPassed}</div>
            <Progress value={timelineProgress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">{daysRemaining} hari tersisa dari {totalDays} hari</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-glass-surface backdrop-blur-md">
          <CardHeader>
            <CardTitle>Jadwal Kegiatan Mendatang</CardTitle>
            <CardDescription>Jadwal pelaksanaan program kerja terdekat.</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingSchedules.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">Tidak ada jadwal mendatang.</p>
            ) : (
              <div className="space-y-4">
                {upcomingSchedules.map((kegiatan, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-outline-variant/50 pb-4 last:border-0 last:pb-0">
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">{kegiatan.title}</span>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> 
                          {new Date(kegiatan.schedule_date).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })}, {kegiatan.start_time.slice(0, 5)}
                        </span>
                        {kegiatan.location && (
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {kegiatan.location}</span>
                        )}
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {kegiatan.program ? "Proker" : "Umum"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-glass-surface backdrop-blur-md">
          <CardHeader>
            <CardTitle>Pengumuman Terbaru</CardTitle>
            <CardDescription>Informasi penting dari Kordes.</CardDescription>
          </CardHeader>
          <CardContent>
            {announcements.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">Belum ada pengumuman.</p>
            ) : (
              <div className="space-y-4">
                {announcements.slice(0, 3).map((pengumuman, idx) => (
                  <div key={pengumuman.id} className="flex flex-col gap-1 border-b border-outline-variant/50 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm line-clamp-1">{pengumuman.title}</span>
                      {pengumuman.priority === "tinggi" && (
                        <Badge variant="destructive" className="text-[10px] h-4 px-1">Penting</Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(pengumuman.created_at), { addSuffix: true, locale: id })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
