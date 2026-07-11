import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

async function main() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  
  const { data, error } = await supabase.auth.signInWithPassword({ email: 'test@example.com', password: 'password' })
  
  const res = await supabase
    .from("programs")
    .select(`
      *,
      pj:profiles(id, full_name, avatar_url)
    `)
    .order("created_at", { ascending: false })

  console.log('Result:', JSON.stringify(res, null, 2))
}

main()
