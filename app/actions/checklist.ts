"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getChecklistsByProgramId(programId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("checklists")
    .select("*")
    .eq("program_id", programId)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching checklists:", error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function toggleChecklistItem(id: string, isChecked: boolean) {
  const supabase = await createClient()

  const updateData: any = {
    is_checked: isChecked,
    updated_at: new Date().toISOString(),
  }

  // If checking, record who checked it
  if (isChecked) {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      updateData.checked_by = user.id
      updateData.checked_at = new Date().toISOString()
    }
  } else {
    // If unchecking, clear the checked_by and checked_at
    updateData.checked_by = null
    updateData.checked_at = null
  }

  const { data, error } = await supabase
    .from("checklists")
    .update(updateData)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating checklist:", error)
    return { error: error.message }
  }

  revalidatePath("/program-kerja/[id]", "page")
  return { data, error: null }
}

export async function createChecklistItem(programId: string, itemName: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("checklists")
    .insert({
      program_id: programId,
      item_name: itemName,
      is_checked: false,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating checklist:", error)
    return { error: error.message }
  }

  revalidatePath("/program-kerja/[id]", "page")
  return { data, error: null }
}

export async function deleteChecklistItem(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("checklists")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting checklist:", error)
    return { error: error.message }
  }

  revalidatePath("/program-kerja/[id]", "page")
  return { error: null }
}
