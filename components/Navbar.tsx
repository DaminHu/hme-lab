'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, FlaskConical } from 'lucide-react'

const links = [
  { href: '/checklist', label: '裝備清單' },
  { href: '/routes', label: '路線圖鑑' },
  { href: '/game', label: 'WHAT IF' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-cream border-b-2 border-forest/20 sticky top-0 z-30" style={{ boxShadow: '0 1px 0 rgba(74,222,128,0.08)' }}>
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 pixel-font text-forest text-xs tracking-wide">
          <FlaskConical size={20} strokeWidth={1.8} />
          HME Lab
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-4 py-2 text-sm transition-all border ${pathname.startsWith(l.href) ? 'border-forest text-forest font-medium bg-forest/10' : 'border-transparent text-stone hover:text-soil hover:bg-sand'}`}
            >
              {pathname.startsWith(l.href) ? '▶ ' : ''}{l.label}
            </Link>
          ))}
          <a
            href="https://www.hme.tw/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-4 py-2 bg-forest text-cream text-sm font-bold hover:bg-forest-dark transition-colors border-2 border-forest-dark"
          >
            HME.TW
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(v => !v)} className="md:hidden p-2 text-stone hover:text-soil">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-bark bg-cream px-4 py-3 space-y-1">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2.5 text-sm border-l-2 ${pathname.startsWith(l.href) ? 'border-forest text-forest font-medium bg-forest/10' : 'border-transparent text-stone hover:bg-sand'}`}
            >
              {l.label}
            </Link>
          ))}
          <a href="https://www.hme.tw/" target="_blank" rel="noopener noreferrer" className="block px-3 py-2.5 text-sm text-forest font-medium">
            HME.TW →
          </a>
        </div>
      )}
    </header>
  )
}
