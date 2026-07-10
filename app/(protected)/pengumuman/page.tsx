import * as React from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Info, AlertCircle, CheckCircle2, Megaphone } from "lucide-react"
import { getAnnouncements } from "@/app/actions/announcement"
import { format } from "date-fns"
import { id } from "date-fns/locale"

export default async function PengumumanPage() {
  const { data: announcements, error } = await getAnnouncements()

  const getPriorityLabel = (priority: string) => {
    if (priority === "tinggi" || priority === "high") return "Tinggi"
    if (priority === "rendah" || priority === "low") return "Rendah"
    return "Normal"
  }

  const getIcon = (priority: string) => {
    if (priority === "tinggi" || priority === "high") return <AlertCircle className="h-5 w-5" />
    return <Info className="h-5 w-5 text-primary" />
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Pengumuman</h1>
        <p className="text-muted-foreground">Informasi, instruksi, dan pembaruan penting dari Koordinator Desa.</p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-md border border-red-200 text-sm">
          Gagal memuat data: {error}
        </div>
      )}

      <div className="space-y-4">
        {(!announcements || announcements.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-16 text-center gap-3 bg-glass-surface backdrop-blur-md rounded-xl border border-outline-variant/30">
            <Megaphone className="w-12 h-12 text-muted-foreground/40" />
            <p className="text-muted-foreground font-medium">Belum ada pengumuman.</p>
            <p className="text-sm text-muted-foreground/70">Pengumuman dari Kordes akan muncul di sini.</p>
          </div>
        ) : (
          announcements.map((item) => {
            const isHigh = item.priority === "tinggi" || item.priority === "high"
            const publishDate = item.published_at || item.created_at
            return (
              <Alert
                key={item.id}
                variant={isHigh ? "destructive" : "default"}
                className={`bg-glass-surface backdrop-blur-md border ${
                  isHigh
                    ? "border-danger/50 text-danger"
                    : "border-outline-variant/50"
                }`}
              >
                {getIcon(item.priority)}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4 w-full">
                  <div>
                    <AlertTitle className="text-base font-semibold">{item.title}</AlertTitle>
                    <AlertDescription className="mt-2 text-sm opacity-90 whitespace-pre-wrap">
                      {item.content}
                    </AlertDescription>
                    {item.author?.full_name && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Oleh: <span className="font-medium">{item.author.full_name}</span>
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-2 shrink-0 mt-2 md:mt-0">
                    <Badge variant={isHigh ? "destructive" : "outline"} className="text-xs">
                      Prioritas: {getPriorityLabel(item.priority)}
                    </Badge>
                    <span className="text-xs opacity-70 font-medium">
                      {format(new Date(publishDate), "d MMM yyyy, HH:mm", { locale: id })}
                    </span>
                  </div>
                </div>
              </Alert>
            )
          })
        )}
      </div>
    </div>
  )
}
