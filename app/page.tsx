"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Calendar, Users, FileText, CheckCircle2, LayoutDashboard, Clock, Image as ImageIcon } from "lucide-react"
import { CountUp } from "@/components/animations/count-up"
import { FadeInView } from "@/components/animations/fade-in-view"

export default function LandingPage() {
  const router = useRouter()
  const [clickCount, setClickCount] = React.useState(0)
  const clickTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const handleLogoClick = () => {
    // Increment click count
    setClickCount((prev) => prev + 1)

    // Clear existing timeout
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current)
    }

    // Check if we've reached 5 clicks
    if (clickCount + 1 >= 5) {
      router.push("/admin")
      setClickCount(0)
      return
    }

    // Reset counter after 2 seconds of no clicks
    clickTimeoutRef.current = setTimeout(() => {
      setClickCount(0)
    }, 2000)
  }

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 bg-gradient-mesh opacity-30"></div>
      
      {/* Floating Navigation */}
      <nav className="fixed top-4 left-4 right-4 z-50 rounded-2xl px-6 py-4 mx-auto max-w-7xl bg-glass-surface/80 backdrop-blur-xl border border-glass-border shadow-sm flex items-center justify-between transition-all">
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={handleLogoClick}
        >
          <img src="/logo.png" alt="Logo KKN" className="w-10 h-10 rounded-xl object-cover shadow-md" />
          <span className="text-xl font-bold hidden sm:block text-primary">
            KKN Desa Bambang
          </span>
        </div>
        
        <Link href="/login" className={buttonVariants({ className: "rounded-full shadow-md font-semibold px-6" })}>
          Masuk
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 mt-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass-surface backdrop-blur-md border border-glass-border mb-8 shadow-sm">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-primary">
                Kelompok KKN 11 — 30 Hari Program
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight">
              Pusat Kendali Operasional
              <br />
              <span className="text-primary">KKN Desa Bambang</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Sistem manajemen terpadu untuk koordinasi 11 program kerja, dokumentasi kegiatan, 
              dan monitoring progres real-time selama masa KKN.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/login" className={buttonVariants({ size: "lg", className: "rounded-full text-lg h-14 px-8 shadow-lg" })}>
                Masuk ke Dashboard
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-24">
            {[
              { label: "Anggota", value: "15", suffix: "Orang" },
              { label: "Program", value: "11", suffix: "Kerja" },
              { label: "Durasi", value: "30", suffix: "Hari" },
              { label: "Dusun", value: "5", suffix: "Target" },
            ].map((stat, i) => (
              <Card key={i} className="bg-glass-surface/60 backdrop-blur-md border-glass-border shadow-sm hover:shadow-md transition-all text-center group">
                <CardContent className="pt-6">
                  <div className="text-4xl sm:text-5xl font-bold text-primary mb-2 group-hover:scale-105 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label} <br/> {stat.suffix}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-surface-variant/30 z-10 border-t border-glass-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Fitur Sistem Utama</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Platform ini dirancang khusus untuk memenuhi kebutuhan administrasi dan manajemen tim KKN Kelompok 11 di lapangan.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <LayoutDashboard className="w-8 h-8" />,
                title: "Dashboard Terpadu",
                desc: "Satu layar untuk memantau seluruh aktivitas, notifikasi, dan ringkasan progres program kerja."
              },
              {
                icon: <CheckCircle2 className="w-8 h-8" />,
                title: "Manajemen Proker",
                desc: "Tracking progres setiap program kerja dari persiapan hingga evaluasi dengan persentase penyelesaian."
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: "Timeline & Jadwal",
                desc: "Penjadwalan harian terstruktur untuk memastikan semua anggota mengetahui agenda hari ini dan esok."
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Delegasi Tugas",
                desc: "Pembagian Penanggung Jawab (PIC) untuk setiap kegiatan agar beban kerja terdistribusi merata."
              },
              {
                icon: <ImageIcon className="w-8 h-8" />,
                title: "Arsip Dokumentasi",
                desc: "Galeri foto dan video harian yang diunggah anggota sebagai bukti sah pelaksanaan kegiatan."
              },
              {
                icon: <FileText className="w-8 h-8" />,
                title: "Pengumuman Instan",
                desc: "Notifikasi dan instruksi mendadak dari Kordes atau DPL yang langsung tersampaikan ke seluruh tim."
              }
            ].map((feat, i) => (
              <Card key={i} className="bg-glass-surface backdrop-blur-md border-glass-border hover:-translate-y-1 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    {feat.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feat.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-muted-foreground text-sm border-t border-glass-border relative z-10 bg-surface">
        <p>© 2026 KKN Kelompok 11 Desa Bambang. Hak Cipta Dilindungi.</p>
      </footer>
    </div>
  )
}
