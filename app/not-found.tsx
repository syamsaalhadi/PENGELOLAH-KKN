import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="glass-card rounded-3xl p-8 sm:p-12 text-center">
          {/* 404 Number */}
          <div className="mb-6">
            <h1 className="text-8xl sm:text-9xl font-bold text-gradient mb-2">
              404
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-violet-600 mx-auto rounded-full"></div>
          </div>

          {/* Title & Message */}
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-slate-800">
            Halaman Tidak Ditemukan
          </h2>
          
          <p className="text-slate-600 mb-8">
            Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan. 
            Silakan periksa URL atau kembali ke halaman utama.
          </p>

          {/* Search Suggestion */}
          <div className="glass-card rounded-xl p-4 mb-8 text-left">
            <div className="flex items-start gap-3">
              <Search className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-slate-800 text-sm mb-1">
                  Yang Mungkin Anda Cari:
                </h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Dashboard</li>
                  <li>• Timeline 30 Hari</li>
                  <li>• Program Kerja</li>
                  <li>• Dokumentasi</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link 
              href="/dashboard" 
              className="btn btn-primary flex-1 justify-center cursor-pointer"
            >
              <Home className="w-5 h-5" />
              Ke Dashboard
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
              Jika masalah berlanjut, hubungi admin sistem.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
