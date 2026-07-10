import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import Header from "@/components/layout/Header"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full min-h-screen flex flex-col relative z-10">
        <Header />
        <div className="flex-1 py-md md:py-xl px-container-margin md:px-[48px] max-w-7xl mx-auto w-full flex flex-col gap-lg">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}
