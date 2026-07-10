import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/layout/admin-sidebar"
import Header from "@/components/layout/Header"
import { Toaster } from "@/components/ui/toaster"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="w-full min-h-screen flex flex-col relative z-10 bg-surface-container-lowest">
        <Header />
        <div className="flex-1 py-md md:py-xl px-container-margin md:px-[48px] max-w-7xl mx-auto w-full flex flex-col gap-lg">
          {children}
        </div>
      </main>
      <Toaster />
    </SidebarProvider>
  )
}
