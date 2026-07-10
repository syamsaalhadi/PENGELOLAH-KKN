"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ChevronRight, Clock, MapPin, X } from "lucide-react"

interface Activity {
  time: string
  description: string
  location: string | null
}

interface TimelineItem {
  day: number
  date: string
  title: string
  status: string
  activities: Activity[]
}

function DetailDrawer({
  item,
  onClose,
}: {
  item: TimelineItem | null
  onClose: () => void
}) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (item) {
      setMounted(true)
      const t = setTimeout(() => setVisible(true), 16)
      return () => clearTimeout(t)
    } else {
      setVisible(false)
      const t = setTimeout(() => setMounted(false), 300)
      return () => clearTimeout(t)
    }
  }, [item])

  // close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  if (!mounted) return null

  return createPortal(
    <div
      style={{ position: "fixed", inset: 0, zIndex: 9999 }}
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(2px)",
          transition: "opacity 0.25s ease",
          opacity: visible ? 1 : 0,
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          height: "100%",
          width: "min(100vw, 420px)",
          background: "var(--color-surface, #fff)",
          boxShadow: "-4px 0 32px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
          transform: visible ? "translateX(0)" : "translateX(100%)",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            padding: "20px 20px 12px",
            borderBottom: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: "1rem", fontWeight: 600 }}>
              Detail Hari ke-{item?.day}
            </h2>
            <p style={{ margin: "4px 0 0", fontSize: "0.8rem", opacity: 0.6 }}>
              {item?.date}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "20px", flex: 1 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: "1rem", fontWeight: 600 }}>
            {item?.title}
          </h3>
          <div
            style={{
              position: "relative",
              borderLeft: "2px solid rgba(0,0,0,0.12)",
              paddingLeft: "16px",
              marginLeft: "8px",
            }}
          >
            {item?.activities.map((act, idx) => (
              <div
                key={idx}
                style={{
                  position: "relative",
                  background: "rgba(0,0,0,0.03)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: "8px",
                  padding: "12px",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: "-23px",
                    top: "16px",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "var(--color-primary, #006c48)",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.8rem",
                    color: "var(--color-primary, #006c48)",
                    fontWeight: 500,
                    marginBottom: "4px",
                  }}
                >
                  <Clock size={14} />
                  {act.time}
                </div>
                <p style={{ margin: 0, fontWeight: 600, fontSize: "0.875rem" }}>
                  {act.description}
                </p>
                {act.location && (
                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: "0.75rem",
                      opacity: 0.6,
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <MapPin size={12} />
                    {act.location}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export function TimelineClient({ timelineData }: { timelineData: TimelineItem[] }) {
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null)

  const openDetail = (item: TimelineItem) => setSelectedItem(item)
  const closeDetail = () => setSelectedItem(null)

  return (
    <>
      <Card className="bg-glass-surface backdrop-blur-md relative z-0">
        <CardHeader>
          <CardTitle>Perjalanan KKN</CardTitle>
          <CardDescription>Pilih hari untuk melihat detail kegiatan.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative border-l border-outline-variant/50 ml-3 md:ml-6 space-y-8 pb-4">
            {timelineData.map((item) => (
              <div key={item.day} className="relative pl-6 md:pl-8">
                {/* Dot */}
                <div
                  className={`absolute -left-3 md:-left-3.5 w-6 h-6 md:w-7 md:h-7 rounded-full border-4 border-surface flex items-center justify-center ${
                    item.status === "Selesai"
                      ? "bg-primary"
                      : item.status === "Hari Ini"
                      ? "bg-warning ring-4 ring-warning/30"
                      : "bg-surface-variant"
                  }`}
                >
                  {item.status === "Selesai" && (
                    <CheckCircle2 className="w-3 h-3 text-on-primary" />
                  )}
                  {item.status === "Hari Ini" && (
                    <div className="w-2 h-2 rounded-full bg-on-primary" />
                  )}
                </div>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                  <h3
                    className={`text-lg font-bold ${
                      item.status === "Hari Ini" ? "text-primary" : ""
                    }`}
                  >
                    Hari ke-{item.day}
                  </h3>
                  <Badge
                    variant={
                      item.status === "Hari Ini"
                        ? "default"
                        : item.status === "Selesai"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {item.date}
                  </Badge>
                </div>

                {/* Card */}
                <Card className="bg-surface/50 hover:bg-surface/80 transition-colors border-outline-variant/30">
                  <CardContent className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.activities.length === 0
                          ? "Belum ada agenda terjadwal"
                          : `${item.activities.length} agenda terjadwal`}
                      </p>
                    </div>
                    {item.activities.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full md:w-auto"
                        onClick={() => openDetail(item)}
                      >
                        Detail Kegiatan <ChevronRight className="ml-2 w-4 h-4" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Drawer rendered via React Portal directly to document.body */}
      <DetailDrawer item={selectedItem} onClose={closeDetail} />
    </>
  )
}
