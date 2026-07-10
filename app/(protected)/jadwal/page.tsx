import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, Users, Clock } from "lucide-react"
import { getSchedules } from "@/app/actions/schedule"

export default async function JadwalPage() {
  const { data: schedules, error } = await getSchedules()

  // Group schedules by date
  const groupedSchedules = schedules?.reduce((acc: Record<string, Array<typeof schedules[number]>>, schedule) => {
    const dateStr = new Date(schedule.schedule_date).toLocaleDateString('id-ID', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
    
    if (!acc[dateStr]) {
      acc[dateStr] = []
    }
    acc[dateStr].push(schedule)
    return acc
  }, {}) || {}

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Jadwal Kegiatan</h1>
        <p className="text-muted-foreground">Jadwal terperinci pelaksanaan program dan agenda harian KKN.</p>
      </div>

      {error ? (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
          Gagal memuat jadwal: {error}
        </div>
      ) : Object.keys(groupedSchedules).length === 0 ? (
        <div className="p-8 text-center text-muted-foreground bg-glass-surface rounded-xl border border-outline-variant/30">
          Belum ada jadwal kegiatan yang ditambahkan.
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedSchedules).map(([date, items], dayIdx) => (
            <div key={dayIdx} className="space-y-4">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-text-primary border-b border-outline-variant/50 pb-2">
                <CalendarDays className="w-5 h-5 text-primary" />
                {date}
              </h2>
              
              <div className="grid gap-4 md:grid-cols-2">
                {(items as Array<NonNullable<typeof schedules>[number]>).map((item, actIdx) => {
                  const timeString = item.end_time 
                    ? `${item.start_time.slice(0, 5)} - ${item.end_time.slice(0, 5)}`
                    : item.start_time.slice(0, 5)

                  return (
                    <Card key={actIdx} className="bg-glass-surface backdrop-blur-md hover:border-primary/50 transition-colors">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <Badge variant="outline" className="mb-2 bg-surface">
                            {item.program ? item.program.category || "Umum" : "Lainnya"}
                          </Badge>
                          <span className="text-xs font-semibold text-primary flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
                            <Clock className="w-3 h-3" /> {timeString}
                          </span>
                        </div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                          {item.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 shrink-0" /> {item.location}
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 shrink-0" /> Pembuat: {item.creator?.full_name || "Admin"}
                          </div>
                          {item.program && (
                            <div className="mt-2 text-xs text-primary bg-primary/5 p-2 rounded-md">
                              Terkait Program: <strong>{item.program.name}</strong>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
