'use client'

import { useEffect, useState } from 'react'
import {
  ArrowUpRight, Bot, ChevronDown, Code2, Globe2, LayoutGrid, Menu, MessageCircle, Palette,
  Send, Server, ShieldCheck, Star, Terminal, TrendingUp, Users, X,
} from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { LogoMark } from '@/components/logo-mark'
import { admin, channel, group } from '@/lib/site'
import { cn } from '@/lib/utils'

type MenuItem = { label: string; desc: string; href: string; icon: typeof Bot; external?: boolean }

const menuGroups: { title: string; items: MenuItem[] }[] = [
  {
    title: 'Layanan',
    items: [
      { label: 'Jadi Bot', desc: '24 jam sampai permanen', href: '#bot', icon: Bot },
      { label: 'Sewa Bot', desc: '1 hari sampai permanen', href: '#sewa-bot', icon: Bot },
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
  const [group, setGroup] = useState<string | null>(menuGroups[0].title)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      document.querySelector<HTMLElement>('[aria-controls="site-menu"]')?.focus()
    }
    document.addEventListener('keydown', onKey)
    // Kunci scroll hanya di mobile, supaya layout desktop tidak bergeser
    const lock = window.matchMedia('(max-width: 767px)').matches
    if (lock) {
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [open])

  const toggleMenu = () => {
    if (!open) setGroup(menuGroups[0].title)
    setOpen(!open)
  }

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
        {/* Klik area kosong di bar menutup menu */}
        <div
          className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:gap-3 sm:px-5 lg:px-8"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <a
            href="#beranda"
            className="flex min-w-0 items-center gap-2 rounded-lg sm:gap-2.5"
            onClick={() => setOpen(false)}
          >
            <LogoMark />
            <span className="min-w-0 leading-none">
              <strong className="block truncate text-[11px] font-bold tracking-wide text-white min-[360px]:text-xs min-[380px]:text-[13px] sm:text-sm">
                ANDRI OFFICIAL
              </strong>
              <small className="mt-1 hidden text-[10px] font-medium tracking-[0.18em] text-muted-foreground sm:block">
                DIGITAL & KREATIF
              </small>
            </span>
          </a>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {/* Di bawah 380px hanya ikon, label tetap tersedia untuk pembaca layar */}
            <a
              href="#layanan"
              aria-label="Lihat katalog layanan"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'h-10 w-10 px-0 text-[13px] min-[380px]:w-auto min-[380px]:px-3 sm:px-4',
              )}
            >
              <LayoutGrid className="size-4 min-[380px]:hidden" />
              <span className="hidden min-[380px]:inline">Katalog</span>
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
              onClick={toggleMenu}
            >
              <span className="relative block size-5">
                <Menu className={cn('absolute inset-0 size-5 transition duration-200', open && 'rotate-90 scale-75 opacity-0')} />
                <X className={cn('absolute inset-0 size-5 transition duration-200', !open && '-rotate-90 scale-75 opacity-0')} />
              </span>
            </Button>
          </div>

          <nav
            id="site-menu"
            aria-label="Menu utama"
            className={cn(
              'absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-b border-border bg-background px-4 pb-4 pt-1 transition-[opacity,translate,visibility] duration-200 ease-out sm:px-5 md:inset-x-auto md:right-5 md:top-[calc(100%+0.5rem)] md:w-96 md:rounded-2xl md:border md:bg-card md:p-3 md:shadow-2xl md:shadow-black/50 lg:right-8',
              open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0',
            )}
          >
            <ul className="divide-y divide-border">
              {menuGroups.map((g) => {
                const expanded = group === g.title
                const panelId = `menu-${g.title.toLowerCase().replace(/\s+/g, '-')}`
                return (
                  <li key={g.title}>
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={panelId}
                      onClick={() => setGroup(expanded ? null : g.title)}
                      className="flex min-h-11 w-full items-center justify-between gap-3 rounded-lg px-2 text-left text-xs font-semibold uppercase tracking-[0.16em] text-cyan-accent"
                    >
                      {g.title}
                      <ChevronDown className={cn('size-4 shrink-0 text-muted-foreground transition-transform duration-200', expanded && 'rotate-180')} />
                    </button>

                    <div
                      id={panelId}
                      inert={!expanded}
                      className={cn('grid transition-[grid-template-rows] duration-200 ease-out', expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}
                    >
                      <ul className="min-h-0 overflow-hidden">
                        {g.items.map(({ label, desc, href, icon: Icon, external }) => (
                          <li key={label}>
                            <a
                              href={href}
                              target={external ? '_blank' : undefined}
                              rel={external ? 'noreferrer' : undefined}
                              onClick={() => setOpen(false)}
                              className="flex min-h-11 items-center gap-3 rounded-lg px-2 py-1 transition-colors hover:bg-white/5 active:bg-white/10"
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
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </header>

      <div
        aria-hidden="true"
        className={cn(
          'fixed inset-0 z-40 bg-[#040810]/60 transition-opacity duration-200',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => setOpen(false)}
      />
    </>
  )
}
