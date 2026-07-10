import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { buttonVariants } from "@/components/ui/button"
import { ArrowLeft, Users, Calendar, MapPin, CheckSquare, Clock, Square, List } from "lucide-react"
import { getProgramById } from "@/app/actions/program"
import { getChecklistsByProgramId } from "@/app/actions/checklist"
import { getRundownsByProgramId } from "@/app/actions/rundown"

export default async function ProgramKerjaDetailPage({ params }: { params: { id: string } }) {
  // Await the params object itself before using its properties in Next.js 15
  const resolvedParams = await params
  const { data: proker, error } = await getProgramById(resolvedParams.id)
  const { data: checklists } = await getChecklistsByProgramId(resolvedParams.id)
  const { data: rundowns } = await getRundownsByProgramId(resolvedParams.id)

  if (error || !proker) {
    return (
      <div className="flex flex-col gap-6">
        <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
          Program kerja tidak ditemukan atau terjadi kesalahan: {error || "Data kosong"}
        </div>
        <Link href="/program-kerja" className={buttonVariants({ variant: "outline", className: "w-fit" })}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Daftar
        </Link>
      </div>
    )
  }

  const statusLabel = proker.status
  
  // Calculate progress based on checklists
  const totalTasks = checklists?.length || 0
  const completedTasks = checklists?.filter(c => c.is_checked).length || 0
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Link href="/program-kerja" className={buttonVariants({ variant: "ghost", className: "w-fit -ml-4 text-muted-foreground hover:text-foreground" })}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Daftar
        </Link>
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant={proker.status === "Selesai" ? "secondary" : "default"}>{statusLabel}</Badge>
              {proker.category && <Badge variant="outline">{proker.category}</Badge>}
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-primary">{proker.name}</h1>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-glass-surface backdrop-blur-md">
            <CardHeader>
              <CardTitle>Deskripsi Kegiatan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {proker.description || "Tidak ada deskripsi."}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 mt-6 p-4 rounded-lg bg-surface-variant/30">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Jadwal Pelaksanaan</p>
                    <p className="text-sm text-muted-foreground">
                      {proker.scheduled_date ? new Date(proker.scheduled_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : "Belum dijadwalkan"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Lokasi</p>
                    <p className="text-sm text-muted-foreground">{proker.location || "Belum ditentukan"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-glass-surface backdrop-blur-md">
            <CardHeader>
              <CardTitle>Checklist Persiapan</CardTitle>
              <CardDescription>Daftar tugas yang harus diselesaikan untuk program ini.</CardDescription>
            </CardHeader>
            <CardContent>
              {!checklists || checklists.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">Belum ada checklist persiapan.</p>
              ) : (
                <div className="space-y-3">
                  {checklists.map((task) => (
                    <div key={task.id} className="flex items-start gap-3 p-3 rounded-md hover:bg-surface-variant/30 transition-colors">
                      {task.is_checked ? (
                        <CheckSquare className="w-5 h-5 text-primary shrink-0" />
                      ) : (
                        <Square className="w-5 h-5 text-muted-foreground shrink-0" />
                      )}
                      <div className="flex-1">
                        <span className={`text-sm ${task.is_checked ? 'line-through text-muted-foreground' : 'font-medium'}`}>
                          {task.item_name}
                        </span>
                        {task.is_checked && task.checked_at && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Selesai {new Date(task.checked_at).toLocaleDateString('id-ID')}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {rundowns && rundowns.length > 0 && (
            <Card className="bg-glass-surface backdrop-blur-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <List className="w-5 h-5" />
                  Rundown Kegiatan
                </CardTitle>
                <CardDescription>Susunan acara pelaksanaan program.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {rundowns.map((item, idx) => (
                    <div key={item.id} className="flex gap-4 p-3 rounded-md hover:bg-surface-variant/30 transition-colors">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Clock className="w-4 h-4 text-primary" />
                        </div>
                        {idx !== rundowns.length - 1 && (
                          <div className="w-0.5 h-full bg-outline-variant/50 flex-1 min-h-[20px]"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-2">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="font-medium text-sm">{item.activity_name}</p>
                          <Badge variant="outline" className="text-xs shrink-0">
                            {item.item_time.slice(0, 5)}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">PIC: {item.pic || '-'}</p>
                        {item.notes && (
                          <p className="text-xs text-muted-foreground mt-1 italic">{item.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card className="bg-glass-surface backdrop-blur-md">
            <CardHeader>
              <CardTitle>Progres</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Terselesaikan</span>
                <span className="font-bold text-primary">{progress}%</span>
              </div>
              <Progress value={progress} className="h-3" />
              {totalTasks > 0 && (
                <p className="text-xs text-muted-foreground text-center">
                  {completedTasks} dari {totalTasks} tugas selesai
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-glass-surface backdrop-blur-md">
            <CardHeader>
              <CardTitle>Penanggung Jawab</CardTitle>
            </CardHeader>
            <CardContent>
              {proker.pj ? (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden">
                    {(proker.pj as any).avatar_url ? (
                      <img src={(proker.pj as any).avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <Users className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <span className="text-sm font-medium">{(proker.pj as any).full_name}</span>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Belum ada PJ yang ditugaskan.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
