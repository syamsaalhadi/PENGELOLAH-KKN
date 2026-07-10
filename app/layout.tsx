import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "KKN Desa Bambang - Management System",
  description: "Sistem manajemen terpadu untuk koordinasi program KKN Kelompok 11 Desa Bambang",
  keywords: ["KKN", "Desa Bambang", "Management System", "Dashboard"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={cn("h-full", "font-sans", geist.variable)}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-surface min-h-screen font-body-md text-body-md antialiased">
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-tertiary-fixed-dim/40 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary-fixed-dim/30 rounded-full blur-[120px]"></div>
          <div className="absolute top-[30%] right-[20%] w-[30%] h-[30%] bg-sunrise/20 rounded-full blur-[80px]"></div>
        </div>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
