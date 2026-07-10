import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default async function Header() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  let profile = null
  if (user) {
    const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single()
    profile = data
  }

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
    : 'U'

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b border-outline-variant/50 bg-glass-surface/80 backdrop-blur-md px-4 shadow-sm w-full">
      {/* Mobile Menu Trigger */}
      <SidebarTrigger className="lg:hidden" />
      
      <div className="flex items-center gap-2 flex-1">
        <span className="font-headline-sm text-text-primary tracking-tight">
          Sistem Informasi KKN
        </span>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative rounded-full text-text-secondary hover:bg-primary-container/20 hover:text-primary hidden sm:flex">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border border-surface"></span>
        </Button>
        
        {profile && (
          <div className="flex items-center gap-3 border-l border-outline-variant/50 pl-4">
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-sm font-semibold">{profile.full_name}</span>
              <span className="text-xs text-muted-foreground capitalize">{profile.role === 'admin' ? 'Admin' : profile.role || 'Member'}</span>
            </div>
            <Avatar className="h-9 w-9 border border-outline-variant/30">
              {profile.avatar_url ? (
                <AvatarImage src={profile.avatar_url} />
              ) : (
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile.full_name}`} />
              )}
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </header>
  )
}
