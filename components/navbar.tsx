'use client'

import { useEffect, useState } from 'react'
import {
  ArrowUpRight, Bot, Code2, Globe2, Menu, MessageCircle, Palette,
  Send, Server, ShieldCheck, Star, Terminal, TrendingUp, Users, X,
} from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { admin, channel, group } from '@/lib/site'
import { cn } from '@/lib/utils'

type MenuItem = { label: string; desc: string; href: string; icon: typeof Bot; external?: boolean }

const menuGroups: { title: string; items: MenuItem[] }[] = [
  {
    title: 'Layanan',
    items: [
      { label: 'Jadi Bot & Sewa Bot', desc: 'Paket harian sampai permanen', href: '#bot', icon: Bot },
      { label: 'SC Ourin Deluxe', desc: 'No update sampai full update', href: '#ourin', icon: Code2 },
      { label: 'Rename Script', desc: 'Rename biasa & sampai akar', href: '#rename', icon: Terminal },
      { label: 'Edit & Desain', desc: 'Foto, video, poster, banner', href: '#kreatif', icon: Palette },
    ],
  },
  {
    title: 'Produk Digital',
    items: [
      { label: 'Nomor Virtual', desc: 'Nomor luar negeri', href: '#nomor-virtual', icon: Globe2 },
      { label: 'Sosial Media', desc: 'Instagram, TikTok, YouTube', href: '#sosial-media', icon: TrendingUp },
      { label: 'Panel, APK & JPM', desc: 'Panel Pterodactyl dan lainnya', href: '#digital', icon: Server },
    ],
  },
  {
    title: 'Informasi',
    items: [
      { label: 'Nogar & Fullgar', desc: 'Perbedaan garansi sewa bot', href: '#ketentuan', icon: ShieldCheck },
      { label: 'Keuntungan Sewa Bot', desc: 'Fitur dan layanan bot', href: '#keuntungan', icon: Star },
    ],
  },
  {
    title: 'Komunitas',
    items: [
      { label: 'WhatsApp Group', desc: 'Gabung grup komunitas', href: group, icon: Users, external: true },
      { label: 'Saluran WhatsApp', desc: 'Update terbaru', href: channel, icon: Send, external: true },
      { label: 'Chat Admin', desc: 'Pemesanan & cek stok', href: admin, icon: MessageCircle, external: true },
    ],
  },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    // Kunci scroll hanya di mobile, supaya layout desktop tidak bergeser
    const lock = window.matchMedia('(max-width: 767px)').matches
    if (lock) document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200',
          scrolled || open
            ? 'border-border bg-background/90 backdrop-blur-xl'
            : 'border-transparent bg-transparent',
        )}
      >
        <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-5 lg:px-8">
          <a href="#beranda" className="flex min-w-0 items-center gap-2.5" onClick={() => setOpen(false)}>
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-white">
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M12 4 5 20h3.2l1.3-3.2h5l1.3 3.2H19L12 4Zm0 6.2 1.7 4.2h-3.4L12 10.2Z"
                />
              </svg>
            </span>
            <span className="min-w-0 leading-none">
              <strong className="block truncate text-[13px] font-bold tracking-wide text-white sm:text-sm">
                ANDRI OFFICIAL
              </strong>
              <small className="mt-1 hidden text-[10px] font-medium tracking-[0.18em] text-muted-foreground sm:block">
                DIGITAL & KREATIF
              </small>
            </span>
          </a>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <a
              href="#layanan"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-10 px-3 text-[13px] sm:px-4')}
            >
              Katalog
            </a>
            <a
              href={admin}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat admin via WhatsApp"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'h-10 w-10 px-0 text-[13px] hover:bg-primary/85 sm:w-auto sm:px-4',
              )}
            >
              <MessageCircle className="size-4" />
              <span className="hidden sm:inline">Admin</span>
            </a>
            <Button
              variant="outline"
              size="icon-lg"
              className="size-10"
              aria-label={open ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>

          {open && (
            <nav
              id="site-menu"
              aria-label="Menu utama"
              className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-border bg-background px-5 pb-6 pt-3 duration-200 animate-in fade-in slide-in-from-top-2 motion-reduce:animate-none md:inset-x-auto md:right-5 md:top-[calc(100%+0.5rem)] md:w-[620px] md:rounded-2xl md:border md:bg-card md:p-5 md:shadow-2xl md:shadow-black/50 lg:right-8"
            >
              <div className="grid gap-5 md:grid-cols-2 md:gap-x-6 md:gap-y-5">
                {menuGroups.map((g) => (
                  <div key={g.title}>
                    <p className="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-accent">
                      {g.title}
                    </p>
                    <ul>
                      {g.items.map(({ label, desc, href, icon: Icon, external }) => (
                        <li key={label}>
                          <a
                            href={href}
                            target={external ? '_blank' : undefined}
                            rel={external ? 'noreferrer' : undefined}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-white/5"
                          >
                            <span className="grid size-8 shrink-0 place-items-center rounded-md border border-border bg-secondary text-cyan-accent">
                              <Icon className="size-4" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-medium text-white">{label}</span>
                              <span className="hidden text-xs text-muted-foreground md:block">{desc}</span>
                            </span>
                            {external && <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground" />}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      {open && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-[#040810]/60 duration-200 animate-in fade-in motion-reduce:animate-none"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  )
}
