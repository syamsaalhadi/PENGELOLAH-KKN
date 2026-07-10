"use client"

import { useState } from "react"
import { Loader2, Leaf, Eye, EyeOff } from "lucide-react"
import { login } from "./actions"

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)
    const result = await login(formData)
    if (result?.error) {
      setError(result.error)
      setIsLoading(false)
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        overflow: "hidden",
        background: "linear-gradient(135deg, #e8f5f0 0%, #d4ede5 30%, #c8e8f8 70%, #f0ecd4 100%)",
        fontFamily: "'Inter', 'Plus Jakarta Sans', system-ui, sans-serif",
        zIndex: 9999,
      }}
    >
      {/* Animated blobs */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "380px",
          height: "380px",
          borderRadius: "50%",
          opacity: 0.4,
          filter: "blur(80px)",
          background: "radial-gradient(circle, #77daa8, transparent 70%)",
          animation: "pulse 3s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: "380px",
          height: "380px",
          borderRadius: "50%",
          opacity: 0.3,
          filter: "blur(80px)",
          background: "radial-gradient(circle, #a2cce9, transparent 70%)",
          animation: "pulse 3s ease-in-out 1s infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "60%",
          width: "260px",
          height: "260px",
          borderRadius: "50%",
          opacity: 0.2,
          filter: "blur(80px)",
          background: "radial-gradient(circle, #F6D998, transparent 70%)",
          animation: "pulse 3s ease-in-out 2s infinite",
        }}
      />

      {/* Login Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          position: "relative",
          zIndex: 10,
          borderRadius: "24px",
          overflow: "hidden",
          background: "rgba(255, 255, 255, 0.72)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.7)",
          boxShadow: "0 20px 60px rgba(0, 106, 70, 0.15), 0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            height: "6px",
            width: "100%",
            background: "linear-gradient(90deg, #006a46, #77daa8, #37617a)",
          }}
        />

        <form action={handleSubmit} style={{ padding: "32px" }}>
          {/* Logo & Title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(0, 106, 70, 0.3)",
              }}
            >
              <img src="/logo.png" alt="Logo KKN" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ textAlign: "center" }}>
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#006a46",
                  margin: 0,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                KKN Desa Bambang
              </h1>
              <p style={{ fontSize: "13px", marginTop: "6px", color: "#5B6B63" }}>
                Kec. Turi, Kab. Lamongan • 2026
              </p>
              <p style={{ fontSize: "13px", fontWeight: 500, marginTop: "2px", color: "#7a8c83" }}>
                Sistem Informasi Manajemen Terpadu
              </p>
            </div>
          </div>

          {/* Error box */}
          {error && (
            <div
              style={{
                marginBottom: "16px",
                padding: "12px",
                borderRadius: "12px",
                fontSize: "13px",
                textAlign: "center",
                background: "rgba(229, 72, 77, 0.1)",
                border: "1px solid rgba(229, 72, 77, 0.25)",
                color: "#b91c1c",
              }}
            >
              {error === "Invalid login credentials"
                ? "Email atau kata sandi salah. Silakan coba lagi."
                : error}
            </div>
          )}

          {/* Email field */}
          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                color: "#16241D",
                marginBottom: "6px",
              }}
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="nama@email.com"
              style={{
                width: "100%",
                height: "44px",
                padding: "0 14px",
                borderRadius: "12px",
                border: "none",
                outline: "none",
                fontSize: "14px",
                background: "rgba(0, 106, 70, 0.06)",
                boxShadow: "inset 0 0 0 1px rgba(0, 106, 70, 0.18)",
                boxSizing: "border-box",
                color: "#16241D",
                transition: "box-shadow 0.2s ease",
              }}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow = "inset 0 0 0 2px #006a46"
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = "inset 0 0 0 1px rgba(0, 106, 70, 0.18)"
              }}
            />
          </div>

          {/* Password field */}
          <div style={{ marginBottom: "8px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "6px",
              }}
            >
              <label
                htmlFor="password"
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#16241D",
                }}
              >
                Kata Sandi
              </label>
              <a
                href="#"
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#006a46",
                  textDecoration: "none",
                }}
              >
                Lupa sandi?
              </a>
            </div>
            <div style={{ position: "relative" }}>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                style={{
                  width: "100%",
                  height: "44px",
                  padding: "0 42px 0 14px",
                  borderRadius: "12px",
                  border: "none",
                  outline: "none",
                  fontSize: "14px",
                  background: "rgba(0, 106, 70, 0.06)",
                  boxShadow: "inset 0 0 0 1px rgba(0, 106, 70, 0.18)",
                  boxSizing: "border-box",
                  color: "#16241D",
                  transition: "box-shadow 0.2s ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = "inset 0 0 0 2px #006a46"
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = "inset 0 0 0 1px rgba(0, 106, 70, 0.18)"
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#9ca3af",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showPassword ? (
                  <EyeOff style={{ width: "16px", height: "16px" }} />
                ) : (
                  <Eye style={{ width: "16px", height: "16px" }} />
                )}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              height: "48px",
              marginTop: "24px",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: 600,
              color: "white",
              border: "none",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
              background: "linear-gradient(135deg, #006a46, #31694f)",
              boxShadow: "0 4px 16px rgba(0, 106, 70, 0.3)",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
            }}
            onMouseEnter={(e) => {
              if (!isLoading) e.currentTarget.style.boxShadow = "0 6px 24px rgba(0, 106, 70, 0.4)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 106, 70, 0.3)"
            }}
          >
            {isLoading ? (
              <>
                <Loader2
                  style={{
                    width: "18px",
                    height: "18px",
                    animation: "spin 1s linear infinite",
                  }}
                />
                Memproses...
              </>
            ) : (
              "Masuk ke Sistem"
            )}
          </button>

          {/* Footer info */}
          <p
            style={{
              textAlign: "center",
              fontSize: "12px",
              marginTop: "24px",
              color: "#7a8c83",
            }}
          >
            KKN 2026 • Desa Bambang, Lamongan
          </p>
        </form>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
