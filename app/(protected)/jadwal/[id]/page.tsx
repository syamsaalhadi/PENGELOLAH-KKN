import * as React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { ArrowLeft, MapPin, Clock, Calendar, Users, AlignLeft, ListChecks } from "lucide-react"
import { getScheduleById } from "@/app/actions/schedule"
import { createClient } from "@/lib/supabase/server"
import { format } from "date-fns"
import { id } from "date-fns/locale"

async function getRundownsForSchedule(scheduleId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("rundowns")
    .select("*")
    .eq("schedule_id", scheduleId)
    .order("item_time", { ascending: true })

  if (error) return []
  return data || []
}

export default async function DetailJadwalPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params
  const { data: jadwal, error } = await getScheduleById(resolvedParams.id)

  if (error || !jadwal) {
    notFound()
  }

  const rundowns = await getRundownsForSchedule(resolvedParams.id)

  const timeString = jadwal.end_time
    ? `${jadwal.start_time.slice(0, 5)} – ${jadwal.end_time.slice(0, 5)}`
    : jadwal.start_time.slice(0, 5)

  const dateStr = format(new Date(jadwal.schedule_date), "EEEE, d MMMM yyyy", { locale: id })

  const isPast  = new Date(jadwal.schedule_date) < new Date(new Date().setHours(0, 0, 0, 0))
  const isToday = new Date(jadwal.schedule_date).toDateString() === new Date().toDateString()
  const statusLabel = isPast ? "Selesai" : isToday ? "Hari Ini" : "Akan Datang"
  const statusVariant: "secondary" | "default" | "outline" =
    isPast ? "secondary" : isToday ? "default" : "outline"

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Link href="/jadwal" className={buttonVariants({ variant: "ghost", className: "w-fit -ml-4 text-muted-foreground hover:text-foreground" })}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Jadwal
        </Link>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={statusVariant}>{statusLabel}</Badge>
            {jadwal.program && typeof jadwal.program === 'object' && 'category' in jadwal.program && jadwal.program.category && (
              <Badge variant="outline">{jadwal.program.category}</Badge>
            )}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">{jadwal.title}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-glass-surface backdrop-blur-md border-glass-border">
            <CardHeader>
              <CardTitle>Informasi Kegiatan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {jadwal.description && (
                <div className="flex items-start gap-3 pb-4 border-b border-outline-variant/30">
                  <AlignLeft className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{jadwal.description}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary mt-0.5 shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Tanggal</p>
                    <p className="text-sm text-muted-foreground">{dateStr}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary mt-0.5 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Waktu</p>
                    <p className="text-sm text-muted-foreground">{timeString}</p>
                  </div>
                </div>
                {jadwal.location && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary mt-0.5 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Lokasi</p>
                      <p className="text-sm text-muted-foreground">{jadwal.location}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary mt-0.5 shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Dibuat Oleh</p>
                    <p className="text-sm text-muted-foreground">
                      {jadwal.creator && typeof jadwal.creator === 'object' && 'full_name' in jadwal.creator ? jadwal.creator.full_name : "Admin"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rundown */}
          <Card className="bg-glass-surface backdrop-blur-md border-glass-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ListChecks className="w-5 h-5 text-primary" /> Rundown Acara
              </CardTitle>
            </CardHeader>
            <CardContent>
              {rundowns.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">
                  Belum ada rundown yang dibuat untuk jadwal ini.
                </p>
              ) : (
                <div className="space-y-4 relative border-l border-outline-variant/30 ml-2 pl-4">
                  {rundowns.map((item) => (
                    <div key={item.id} className="relative">
                      <div className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-primary" />
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <div>
                          <p className="text-sm font-semibold text-primary">{item.item_time.slice(0, 5)}</p>
                          <p className="font-medium mt-0.5">{item.activity_name}</p>
                          {item.notes && (
                            <p className="text-xs text-muted-foreground mt-0.5">{item.notes}</p>
                          )}
                        </div>
                        {item.pic && (
                          <Badge variant="outline" className="w-fit">{item.pic}</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {(jadwal.program as any) && (
            <Card className="bg-glass-surface backdrop-blur-md border-glass-border">
              <CardHeader>
                <CardTitle>Terkait Program Kerja</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium mb-3">{(jadwal.program as any).name}</p>
                <Link
                  href={`/program-kerja/${(jadwal.program as any).id}`}
                  className={buttonVariants({ variant: "outline", className: "w-full" })}
                >
                  Lihat Program Kerja
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
