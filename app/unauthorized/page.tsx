import Link from 'next/link';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="glass-card rounded-3xl p-8 sm:p-12 text-center">
          {/* Icon */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-12 h-12 text-white" />
          </div>

          {/* Title & Message */}
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-gradient">Akses Ditolak</span>
          </h1>
          
          <p className="text-lg text-slate-700 mb-2">
            Anda tidak memiliki izin untuk mengakses halaman ini.
          </p>
          
          <p className="text-sm text-slate-600 mb-8">
            Halaman yang Anda coba akses hanya tersedia untuk pengguna dengan role Admin. 
            Jika Anda merasa ini adalah kesalahan, silakan hubungi Ketua Kelompok.
          </p>

          {/* Error Code */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200 mb-8">
            <span className="text-sm font-mono text-red-700">Error 403 - Forbidden</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link 
              href="/dashboard" 
              className="btn btn-primary flex-1 justify-center cursor-pointer"
            >
              <Home className="w-5 h-5" />
              Kembali ke Dashboard
            </Link>
            
            <Link 
              href="/" 
              className="btn btn-secondary flex-1 justify-center cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
              Ke Beranda
            </Link>
          </div>

          {/* Help Text */}
          <div className="mt-8 pt-6 border-t border-purple-200">
            <p className="text-xs text-slate-600">
              Butuh akses Admin? Hubungi Ketua Kelompok untuk permintaan perubahan role.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
