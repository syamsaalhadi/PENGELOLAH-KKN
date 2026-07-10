import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, FileText, FolderOpen } from "lucide-react"
import { getDocuments } from "@/app/actions/document"
import { format } from "date-fns"
import { id } from "date-fns/locale"

export default async function DokumentasiPage() {
  const { data: documents, error } = await getDocuments()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Dokumentasi</h1>
        <p className="text-muted-foreground">Arsip link dan file dokumentasi kegiatan KKN Kelompok 11.</p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-md border border-red-200 text-sm">
          Gagal memuat data: {error}
        </div>
      )}

      {(!documents || documents.length === 0) ? (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-3 bg-glass-surface backdrop-blur-md rounded-xl border border-outline-variant/30">
          <FolderOpen className="w-14 h-14 text-muted-foreground/40" />
          <p className="text-muted-foreground font-medium">Belum ada dokumentasi.</p>
          <p className="text-sm text-muted-foreground/70">File dan link dokumentasi yang diarsipkan akan muncul di sini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((item) => (
            <a
              key={item.id}
              href={item.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="h-full overflow-hidden bg-glass-surface backdrop-blur-md border border-outline-variant/30 hover:border-primary/40 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-5 flex flex-col gap-3 h-full">
                  <div className="flex items-start justify-between gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 shrink-0 group-hover:bg-primary/20 transition-colors">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary transition-colors mt-0.5 shrink-0" />
                  </div>

                  <div className="flex flex-col gap-1 flex-1">
                    <p className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </p>
                    {item.program?.name && (
                      <Badge variant="secondary" className="text-xs w-fit mt-1">
                        {item.program.name}
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-col gap-0.5 mt-auto pt-3 border-t border-outline-variant/30">
                    {item.uploader?.full_name && (
                      <p className="text-xs text-muted-foreground">
                        Oleh: <span className="font-medium">{item.uploader.full_name}</span>
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(item.created_at), "d MMM yyyy", { locale: id })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
