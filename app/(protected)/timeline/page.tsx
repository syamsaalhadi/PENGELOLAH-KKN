import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getSchedules } from "@/app/actions/schedule"
import { TimelineClient } from "./timeline-client"

export default async function TimelinePage() {
  const { data: schedules } = await getSchedules()

  // Read start/end from env (or fall back to hardcoded)
  const startDate = new Date(process.env.NEXT_PUBLIC_KKN_START_DATE || '2026-07-17')
  const endDate   = new Date(process.env.NEXT_PUBLIC_KKN_END_DATE   || '2026-08-16')
  const today     = new Date()

  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1

  const timelineData = Array.from({ length: totalDays }).map((_, i) => {
    const currentDate = new Date(startDate)
    currentDate.setDate(currentDate.getDate() + i)

    const dateStr = currentDate.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })

    const isoDateString = currentDate.toISOString().split('T')[0]

    const dayActivities = schedules?.filter(s => {
      const sDate = new Date(s.schedule_date).toISOString().split('T')[0]
      return sDate === isoDateString
    }).sort((a, b) => a.start_time.localeCompare(b.start_time)) || []

    const todayStr  = today.toISOString().split('T')[0]
    let status = "Mendatang"
    if (isoDateString < todayStr) status = "Selesai"
    else if (isoDateString === todayStr) status = "Hari Ini"

    const title =
      i === 0 ? "Kedatangan & Pembukaan"
      : i === totalDays - 1 ? "Penutupan & Kepulangan"
      : "Kegiatan Harian KKN"

    return {
      day: i + 1,
      date: dateStr,
      title,
      status,
      activities: dayActivities.map(act => ({
        time: act.end_time
          ? `${act.start_time.slice(0, 5)} - ${act.end_time.slice(0, 5)}`
          : act.start_time.slice(0, 5),
        description: act.title,
        location: act.location ?? null
      }))
    }
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Timeline KKN</h1>
        <p className="text-muted-foreground">
          Jejak langkah dan rencana kegiatan harian Kelompok 11 di Desa Bambang.
        </p>
      </div>

      <TimelineClient timelineData={timelineData} />
    </div>
  )
}
