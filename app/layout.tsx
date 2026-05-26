import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'HME Lab — 戶外工具集',
  description: '裝備清單、路線圖鑑、戶外求生挑戰，由 HME 戶外用品提供',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body className="min-h-screen flex flex-col bg-cream">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-sand py-6 text-center text-xs text-stone">
          © {new Date().getFullYear()} HME 戶外用品｜
          <a href="https://www.hme.tw/" target="_blank" rel="noopener noreferrer" className="hover:text-forest transition-colors">hme.tw</a>
        </footer>
      </body>
    </html>
  )
}
