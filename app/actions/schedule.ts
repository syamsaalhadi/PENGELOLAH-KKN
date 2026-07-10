"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export interface Schedule {
  id: string
  schedule_date: string
  start_time: string
  end_time: string | null
  title: string
  description: string | null
  location: string | null
  program_id: string | null
  created_by: string
  created_at: string
  updated_at: string
}

export async function getSchedules() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("schedules")
    .select(`
      *,
      program:programs(id, name, category, status),
      creator:profiles(id, full_name)
    `)
    .order("schedule_date", { ascending: true })
    .order("start_time", { ascending: true })

  if (error) {
    console.error("Error fetching schedules:", error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function getScheduleById(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("schedules")
    .select(`
      *,
      program:programs(id, name, category, status),
      creator:profiles(id, full_name)
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching schedule:", error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function createSchedule(formData: FormData) {
  const supabase = await createClient()

  // Get current user to set as creator
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: "Anda harus login untuk membuat jadwal" }
  }

  const title = formData.get("title") as string
  const schedule_date = formData.get("schedule_date") as string
  const start_time = formData.get("start_time") as string
  const end_time = formData.get("end_time") as string
  const description = formData.get("description") as string
  const location = formData.get("location") as string
  const program_id = formData.get("program_id") as string || null
  
  if (!title || !schedule_date || !start_time) {
    return { error: "Judul, tanggal, dan waktu mulai wajib diisi" }
  }

  const { data, error } = await supabase
    .from("schedules")
    .insert({
      title,
      schedule_date,
      start_time,
      end_time: end_time || null,
      description: description || null,
      location: location || null,
      program_id,
      created_by: user.id
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating schedule:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/jadwal")
  revalidatePath("/jadwal")
  revalidatePath("/dashboard")
  revalidatePath("/timeline")
  return { data, error: null }
}

export async function updateSchedule(id: string, formData: FormData) {
  const supabase = await createClient()

  const title = formData.get("title") as string
  const schedule_date = formData.get("schedule_date") as string
  const start_time = formData.get("start_time") as string
  const end_time = formData.get("end_time") as string
  const description = formData.get("description") as string
  const location = formData.get("location") as string
  const program_id = formData.get("program_id") as string || null
  
  if (!title || !schedule_date || !start_time) {
    return { error: "Judul, tanggal, dan waktu mulai wajib diisi" }
  }

  const { data, error } = await supabase
    .from("schedules")
    .update({
      title,
      schedule_date,
      start_time,
      end_time: end_time || null,
      description: description || null,
      location: location || null,
      program_id,
      updated_at: new Date().toISOString()
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating schedule:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/jadwal")
  revalidatePath("/jadwal")
  revalidatePath(`/jadwal/${id}`)
  revalidatePath("/dashboard")
  revalidatePath("/timeline")
  return { data, error: null }
}

export async function deleteSchedule(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("schedules")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting schedule:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/jadwal")
  revalidatePath("/jadwal")
  revalidatePath("/dashboard")
  revalidatePath("/timeline")
  return { error: null }
}
