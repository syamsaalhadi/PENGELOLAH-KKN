"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export interface Document {
  id: string
  title: string
  file_type: string
  file_url: string
  storage_path: string
  program_id: string | null
  uploaded_by: string | null
  created_at: string
}

export async function getDocuments() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("documents")
    .select(`
      *,
      program:programs(id, name),
      uploader:profiles(id, full_name)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching documents:", error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function getDocumentById(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching document:", error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function createDocument(formData: FormData) {
  const supabase = await createClient()

  const title = formData.get("title") as string
  const file_url = formData.get("file_url") as string
  const program_id = formData.get("program_id") as string || null
  
  if (!title || !file_url) {
    return { error: "Judul dan URL wajib diisi" }
  }

  const { data: userData } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from("documents")
    .insert({
      title,
      file_url,
      file_type: "Link URL",
      storage_path: "external",
      program_id,
      uploaded_by: userData?.user?.id || null
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating document:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/dokumentasi")
  return { data, error: null }
}

export async function updateDocument(id: string, formData: FormData) {
  const supabase = await createClient()

  const title = formData.get("title") as string
  const file_url = formData.get("file_url") as string
  const program_id = formData.get("program_id") as string || null
  
  if (!title || !file_url) {
    return { error: "Judul dan URL wajib diisi" }
  }

  const { data, error } = await supabase
    .from("documents")
    .update({
      title,
      file_url,
      program_id,
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating document:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/dokumentasi")
  return { data, error: null }
}

export async function deleteDocument(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("documents")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting document:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/dokumentasi")
  return { error: null }
}
