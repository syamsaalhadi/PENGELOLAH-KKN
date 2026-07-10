"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { logout } from "@/app/(public)/login/logout-action"
import { ShieldCheck } from "lucide-react"

const items = [
  {
    title: "Admin Dashboard",
    url: "/admin",
    icon: "dashboard",
  },
  {
    title: "Kelola Program Kerja",
    url: "/admin/program-kerja",
    icon: "task_alt",
  },
  {
    title: "Kelola Jadwal",
    url: "/admin/jadwal",
    icon: "edit_calendar",
  },
  {
    title: "Kelola Anggota",
    url: "/admin/anggota",
    icon: "manage_accounts",
  },
  {
    title: "Kelola Rundown",
    url: "/admin/rundown",
    icon: "list_alt",
  },
  {
    title: "Kelola Pengumuman",
    url: "/admin/pengumuman",
    icon: "campaign",
  },
  {
    title: "Kelola Dokumentasi",
    url: "/admin/dokumentasi",
    icon: "photo_library",
  },
  {
    title: "Pengaturan Sistem",
    url: "/admin/settings",
    icon: "settings",
  },
  {
    title: "Lihat Web Member",
    url: "/dashboard",
    icon: "visibility",
  },
]

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar {...props} className="border-r border-outline-variant bg-surface-dim/70 backdrop-blur-md">
      <SidebarHeader className="p-md border-b border-outline-variant/50">
        <div className="flex items-center gap-sm">
          <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
            <img src="/logo.png" alt="Logo KKN" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <h2 className="font-headline-sm text-text-primary">Admin Panel</h2>
            <span className="font-label-sm text-danger">Kordes Access</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url || (item.url !== '/admin' && pathname?.startsWith(item.url))
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link href={item.url} />}
                      isActive={isActive}
                      tooltip={item.title}
                      className={`h-12 px-sm rounded-lg transition-colors ${
                        isActive
                          ? "bg-danger/10 text-danger font-semibold"
                          : "text-text-secondary hover:bg-surface-variant hover:text-text-primary"
                      }`}
                    >
                      <span className={`material-symbols-outlined ${isActive ? "text-danger" : ""}`}>
                        {item.icon}
                      </span>
                      <span className="font-body-md">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-outline-variant/50">
        <form action={logout}>
          <SidebarMenuButton 
            render={<button type="submit" />} 
            className="w-full justify-start text-danger hover:bg-danger/10 hover:text-danger h-10 px-sm rounded-lg"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-body-md font-semibold">Keluar</span>
          </SidebarMenuButton>
        </form>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
