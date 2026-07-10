"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getProfiles() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("full_name", { ascending: true })

  if (error) {
    console.error("Error fetching profiles:", error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function getProfileById(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching profile:", error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function updateProfile(id: string, formData: FormData) {
  const supabase = await createClient()

  const full_name = formData.get("full_name") as string
  const role = formData.get("role") as string
  const phone = formData.get("phone") as string
  
  if (!full_name) {
    return { error: "Nama lengkap wajib diisi" }
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({
      full_name,
      role,
      phone,
      updated_at: new Date().toISOString()
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating profile:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/anggota")
  return { data, error: null }
}

export async function deleteProfile(id: string) {
  const supabase = await createClient()

  // Note: Deleting a profile directly might fail if it's tied to auth.users without a trigger.
  // In a full production app, this would use supabase.auth.admin.deleteUser(id) using the Service Role Key.
  const { error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting profile:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/anggota")
  return { error: null }
}

export async function createNewMember(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const full_name = formData.get("full_name") as string
  const phone = formData.get("phone") as string
  const role = formData.get("role") as string

  // Validasi input
  if (!email || !password || !full_name) {
    return { error: "Email, password, dan nama lengkap wajib diisi" }
  }

  if (password.length < 6) {
    return { error: "Password minimal 6 karakter" }
  }

  try {
    // Cek apakah ada service role key
    const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY

    if (hasServiceKey) {
      // Gunakan admin client jika service key tersedia
      const { createAdminClient } = await import("@/lib/supabase/admin")
      const adminClient = createAdminClient()

      // Buat user dengan admin API (skip email confirmation)
      const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // Langsung confirm email
        user_metadata: {
          full_name,
        },
      })

      if (authError) {
        console.error("Error creating user with admin API:", authError)
        if (authError.message.includes("already registered") || authError.message.includes("already exists")) {
          return { error: "Email sudah terdaftar dalam sistem" }
        }
        return { error: `Gagal membuat akun: ${authError.message}` }
      }

      if (!authData.user) {
        return { error: "Gagal membuat user baru - tidak ada data user" }
      }

      // Tunggu sebentar untuk memastikan trigger database sudah jalan
      await new Promise(resolve => setTimeout(resolve, 500))

      // Update profile - hanya kolom yang ada di schema
      const { error: profileError } = await adminClient
        .from("profiles")
        .update({
          full_name,
          phone: phone || null,
          role: role === "admin" ? "admin" : "member",
          updated_at: new Date().toISOString(),
        })
        .eq("id", authData.user.id)

      if (profileError) {
        console.error("Error updating profile:", profileError)
        return { error: `User dibuat tapi gagal update profile: ${profileError.message}` }
      }

      revalidatePath("/admin/anggota")
      return { data: authData.user, error: null }
    } else {
      // Fallback ke regular signup jika tidak ada service key
      const supabase = await createClient()
      
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name,
          },
          emailRedirectTo: undefined,
        },
      })

      if (authError) {
        console.error("Error creating user:", authError)
        if (authError.message.includes("already registered")) {
          return { error: "Email sudah terdaftar dalam sistem" }
        }
        return { error: `Gagal membuat akun: ${authError.message}` }
      }

      if (!authData.user) {
        return { error: "Gagal membuat user baru - tidak ada data user" }
      }

      // Tunggu sebentar untuk memastikan trigger database sudah jalan
      await new Promise(resolve => setTimeout(resolve, 500))

      // Update profile - hanya kolom yang ada di schema
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name,
          phone: phone || null,
          role: role === "admin" ? "admin" : "member",
          updated_at: new Date().toISOString(),
        })
        .eq("id", authData.user.id)

      if (profileError) {
        console.error("Error updating profile:", profileError)
        return { error: `User dibuat tapi gagal update profile: ${profileError.message}` }
      }

      revalidatePath("/admin/anggota")
      return { 
        data: authData.user, 
        error: null,
        warning: "User berhasil dibuat. PENTING: Email confirmation diperlukan jika diaktifkan di Supabase settings."
      }
    }
  } catch (err) {
    console.error("Unexpected error in createNewMember:", err)
    if (err instanceof Error && err.message.includes("SUPABASE_SERVICE_ROLE_KEY")) {
      return { 
        error: "Untuk membuat user baru, tambahkan SUPABASE_SERVICE_ROLE_KEY ke file .env.local. Dapatkan di Supabase Dashboard → Project Settings → API → service_role key" 
      }
    }
    return { error: `Error tidak terduga: ${err instanceof Error ? err.message : String(err)}` }
  }
}
