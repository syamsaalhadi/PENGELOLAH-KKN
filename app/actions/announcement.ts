"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getAnnouncements() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("announcements")
    .select(`
      *,
      author:profiles(id, full_name)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching announcements:", error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function getAnnouncementById(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching announcement:", error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function createAnnouncement(formData: FormData) {
  const supabase = await createClient()

  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const priority = formData.get("priority") as string || "normal"

  if (!title || !content) {
    return { error: "Judul dan konten wajib diisi" }
  }

  const { data: userData } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from("announcements")
    .insert({
      title,
      content,
      priority,
      created_by: userData?.user?.id || null,
      published_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating announcement:", error)
    return { error: error.message }
  }

  revalidatePath("/pengumuman")
  revalidatePath("/admin/pengumuman")
  return { data, error: null }
}

export async function updateAnnouncement(id: string, formData: FormData) {
  const supabase = await createClient()

  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const priority = formData.get("priority") as string || "normal"

  if (!title || !content) {
    return { error: "Judul dan konten wajib diisi" }
  }

  const { data, error } = await supabase
    .from("announcements")
    .update({
      title,
      content,
      priority,
      updated_at: new Date().toISOString()
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating announcement:", error)
    return { error: error.message }
  }

  revalidatePath("/pengumuman")
  revalidatePath("/admin/pengumuman")
  return { data, error: null }
}

export async function deleteAnnouncement(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("announcements")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting announcement:", error)
    return { error: error.message }
  }

  revalidatePath("/pengumuman")
  revalidatePath("/admin/pengumuman")
  return { error: null }
}
