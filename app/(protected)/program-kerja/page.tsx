import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { buttonVariants } from "@/components/ui/button"
import { ArrowRight, Users, Calendar } from "lucide-react"
import { getPrograms } from "@/app/actions/program"

export default async function ProgramKerjaPage() {
  const { data: prokerList, error } = await getPrograms()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Program Kerja</h1>
          <p className="text-muted-foreground">Daftar seluruh program kerja Kelompok 11 di Desa Bambang.</p>
        </div>
      </div>

      {error ? (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
          Gagal memuat program kerja: {error}
        </div>
      ) : !prokerList || prokerList.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground bg-glass-surface rounded-xl border border-outline-variant/30">
          Belum ada program kerja yang ditambahkan.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {prokerList.map((proker) => {
            const statusLabel = proker.status
            const progress = proker.status === "Selesai" ? 100 : proker.status === "Berjalan" ? 50 : 0;
            
            return (
              <Card key={proker.id} className="bg-glass-surface backdrop-blur-md hover:shadow-md transition-all flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={proker.status === "Selesai" ? "secondary" : proker.status === "Berjalan" ? "default" : "outline"}>
                      {statusLabel}
                    </Badge>
                    <Badge variant="outline" className="text-xs">{proker.category || "Umum"}</Badge>
                  </div>
                  <CardTitle className="text-xl">{proker.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progres</span>
                      <span className="font-medium">{progress}%</span>
                    </div>
                    <Progress value={progress} />
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t border-outline-variant/30">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" /> {proker.pj ? (proker.pj as any).full_name : "Belum ada PJ"}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {proker.scheduled_date ? new Date(proker.scheduled_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' }) : "Belum dijadwalkan"}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/program-kerja/${proker.id}`} className={buttonVariants({ variant: "ghost", className: "w-full justify-between" })}>
                    Lihat Detail <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

