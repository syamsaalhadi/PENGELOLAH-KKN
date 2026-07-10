"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getRundownsByProgramId(programId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("rundowns")
    .select("*")
    .eq("program_id", programId)
    .order("order_index", { ascending: true })

  if (error) {
    console.error("Error fetching rundowns:", error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function getAllRundowns() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("rundowns")
    .select(`
      *,
      program:programs(id, name, category),
      schedule:schedules(id, title, schedule_date)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching all rundowns:", error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function getRundownById(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("rundowns")
    .select(`
      *,
      program:programs(id, name)
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching rundown:", error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function createRundown(formData: FormData) {
  const supabase = await createClient()

  const program_id = formData.get("program_id") as string
  const item_time = formData.get("item_time") as string
  const activity_name = formData.get("activity_name") as string
  const pic = formData.get("pic") as string
  const notes = formData.get("notes") as string
  const order_index = parseInt(formData.get("order_index") as string) || 0

  if (!program_id || !item_time || !activity_name) {
    return { error: "Program, waktu, dan nama aktivitas wajib diisi" }
  }

  const { data, error } = await supabase
    .from("rundowns")
    .insert({
      program_id,
      item_time,
      activity_name,
      pic: pic || null,
      notes: notes || null,
      order_index,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating rundown:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/rundown")
  revalidatePath(`/program-kerja/${program_id}`)
  return { data, error: null }
}

export async function updateRundown(id: string, formData: FormData) {
  const supabase = await createClient()

  const item_time = formData.get("item_time") as string
  const activity_name = formData.get("activity_name") as string
  const pic = formData.get("pic") as string
  const notes = formData.get("notes") as string
  const order_index = parseInt(formData.get("order_index") as string) || 0

  if (!item_time || !activity_name) {
    return { error: "Waktu dan nama aktivitas wajib diisi" }
  }

  const { data, error } = await supabase
    .from("rundowns")
    .update({
      item_time,
      activity_name,
      pic: pic || null,
      notes: notes || null,
      order_index,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating rundown:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/rundown")
  return { data, error: null }
}

export async function deleteRundown(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("rundowns")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting rundown:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/rundown")
  return { error: null }
}
