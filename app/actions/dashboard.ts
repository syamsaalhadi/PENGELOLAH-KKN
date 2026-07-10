"use server"

import { createClient } from "@/lib/supabase/server"

export async function getDashboardData() {
  const supabase = await createClient()

  // 1. Total Anggota
  const { count: totalMembers } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })

  // 2. Proker Selesai & Total
  const { data: programs } = await supabase
    .from("programs")
    .select("name, status, updated_at, pj:profiles(full_name)")
    
  const totalPrograms = programs?.length || 0
  const completedPrograms = programs?.filter(p => p.status === 'Selesai').length || 0

  // 3. Laporan / Dokumentasi Diterima
  const { count: totalDocuments } = await supabase
    .from("documents")
    .select("*", { count: "exact", head: true })

  // 4. KKN Time progress (from settings)
  const { data: settings } = await supabase
    .from("settings")
    .select("key, value")
    .in("key", ["start_date", "end_date"])

  let startDate = process.env.NEXT_PUBLIC_KKN_START_DATE
  let endDate = process.env.NEXT_PUBLIC_KKN_END_DATE

  if (settings) {
    const startSetting = settings.find(s => s.key === "start_date")
    const endSetting = settings.find(s => s.key === "end_date")
    if (startSetting) startDate = startSetting.value
    if (endSetting) endDate = endSetting.value
  }

  // Calculate days left and progress
  let daysLeft = 0
  let timeProgress = 0

  if (startDate && endDate) {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const now = new Date()
    
    if (now > end) {
      daysLeft = 0
      timeProgress = 100
    } else if (now < start) {
      daysLeft = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      timeProgress = 0
    } else {
      daysLeft = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      const elapsed = totalDays - daysLeft
      timeProgress = Math.round((elapsed / totalDays) * 100)
    }
  }

  // 5. Activity Logs (Combine recent updates from programs, documents, schedules)
  const { data: recentDocs } = await supabase
    .from("documents")
    .select("title, updated_at, uploader:profiles(full_name)")
    .order("updated_at", { ascending: false })
    .limit(3)

  const { data: recentSchedules } = await supabase
    .from("schedules")
    .select("title, updated_at")
    .order("updated_at", { ascending: false })
    .limit(3)

  let activities: any[] = []
  
  if (recentDocs) {
    activities.push(...recentDocs.map(d => ({
      user: (d.uploader as any)?.full_name || "Seseorang",
      action: `mengunggah dokumentasi: ${d.title}`,
      time: new Date(d.updated_at)
    })))
  }

  if (programs) {
    const sortedPrograms = [...programs].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()).slice(0, 3)
    activities.push(...sortedPrograms.map(p => ({
      user: (p.pj as any)?.full_name || "Sistem",
      action: `memperbarui program kerja: ${p.name}`,
      time: new Date(p.updated_at)
    })))
  }

  if (recentSchedules) {
    activities.push(...recentSchedules.map(s => ({
      user: "Sistem",
      action: `memperbarui jadwal: ${s.title}`,
      time: new Date(s.updated_at)
    })))
  }

  activities.sort((a, b) => b.time.getTime() - a.time.getTime())
  activities = activities.slice(0, 5)

  // Format relative time (basic implementation)
  const formatRelativeTime = (date: Date) => {
    const diffInSeconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
    if (diffInSeconds < 60) return `${diffInSeconds} detik yang lalu`
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) return `${diffInMinutes} menit yang lalu`
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours} jam yang lalu`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} hari yang lalu`
  }

  const formattedActivities = activities.map(a => ({
    user: a.user,
    action: a.action,
    time: formatRelativeTime(a.time)
  }))

  return {
    metrics: {
      totalMembers: totalMembers || 0,
      totalPrograms,
      completedPrograms,
      totalDocuments: totalDocuments || 0,
      daysLeft,
      timeProgress
    },
    programs: programs || [],
    activities: formattedActivities
  }
}
