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

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: "grid_view",
  },
  {
    title: "Timeline Program",
    url: "/timeline",
    icon: "timeline",
  },
  {
    title: "Program Kerja",
    url: "/program-kerja",
    icon: "task",
  },
  {
    title: "Jadwal Kegiatan",
    url: "/jadwal",
    icon: "event_note",
  },
  {
    title: "Dokumentasi",
    url: "/dokumentasi",
    icon: "photo_camera",
  },
  {
    title: "Pengumuman",
    url: "/pengumuman",
    icon: "campaign",
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar {...props} className="border-r border-outline-variant bg-surface/50 backdrop-blur-md">
      <SidebarHeader className="p-md border-b border-outline-variant/50">
        <div className="flex items-center gap-sm">
          <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
            <img src="/logo.png" alt="Logo KKN" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <h2 className="font-headline-sm text-text-primary">KKN Desa Bambang</h2>
            <span className="font-label-sm text-text-secondary">Kelompok 11</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname?.startsWith(item.url)
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link href={item.url} />}
                      isActive={isActive}
                      tooltip={item.title}
                      className={`h-12 px-sm rounded-lg transition-colors ${
                        isActive
                          ? "bg-secondary-container text-on-secondary-container font-semibold"
                          : "text-text-secondary hover:bg-surface-variant hover:text-text-primary"
                      }`}
                    >
                      <span className={`material-symbols-outlined ${isActive ? "text-primary" : ""}`}>
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
