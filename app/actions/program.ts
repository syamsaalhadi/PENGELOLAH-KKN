"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export type ProgramStatus = "Belum Dimulai" | "Berjalan" | "Selesai"

export interface Program {
  id: string
  name: string
  description: string | null
  purpose: string | null
  target_audience: string | null
  location: string | null
  scheduled_date: string | null
  status: ProgramStatus
  pj_id: string | null
  category: string | null
  created_at: string
  updated_at: string
}

export async function getPrograms() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("programs")
    .select(`
      *,
      pj:profiles(id, full_name, avatar_url)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    const errorDetails = error instanceof Error ? error.stack : JSON.stringify(error)
    console.error("Error fetching programs:", errorDetails)
    return { data: null, error: error.message || errorDetails }
  }

  return { data, error: null }
}

export async function getProgramById(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("programs")
    .select(`
      *,
      pj:profiles(id, full_name, avatar_url)
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching program:", error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function createProgram(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const category = formData.get("category") as string
  const status = (formData.get("status") as ProgramStatus) || "Belum Dimulai"
  const pj_id = formData.get("pj_id") as string || null
  
  if (!name) {
    return { error: "Nama program wajib diisi" }
  }

  const { data, error } = await supabase
    .from("programs")
    .insert({
      name,
      description: description || null,
      category: category || null,
      status,
      pj_id
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating program:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/program-kerja")
  revalidatePath("/program-kerja")
  return { data, error: null }
}

export async function updateProgram(id: string, formData: FormData) {
  const supabase = await createClient()

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const category = formData.get("category") as string
  const status = formData.get("status") as ProgramStatus
  const pj_id = formData.get("pj_id") as string || null
  
  if (!name) {
    return { error: "Nama program wajib diisi" }
  }

  const { data, error } = await supabase
    .from("programs")
    .update({
      name,
      description: description || null,
      category: category || null,
      status: status || undefined,
      pj_id,
      updated_at: new Date().toISOString()
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating program:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/program-kerja")
  revalidatePath("/program-kerja")
  revalidatePath(`/program-kerja/${id}`)
  return { data, error: null }
}

export async function updateProgramStatus(id: string, status: ProgramStatus) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("programs")
    .update({
      status,
      updated_at: new Date().toISOString()
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating program status:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/program-kerja")
  revalidatePath("/program-kerja")
  revalidatePath(`/program-kerja/${id}`)
  return { data, error: null }
}

export async function deleteProgram(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("programs")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting program:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/program-kerja")
  revalidatePath("/program-kerja")
  return { error: null }
}
