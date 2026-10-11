'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, Search, Sparkles, X } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { categories, type Category } from '@/config/products'
import { categorySlug, resolveAnchor, searchProducts } from '@/lib/products'
import { cn } from '@/lib/utils'
import { adminLink } from './block-view'
import { ProductCard } from './product-card'

type Filter = Category | 'Semua'

let scrollTimer: number | undefined

// Tunggu animasi accordion (300ms) selesai supaya posisi akhir kartu sudah pasti
function scrollToId(id: string, block: ScrollLogicalPosition) {
  window.clearTimeout(scrollTimer)
  scrollTimer = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ block }), 320)
}

export function Catalog() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Filter>('Semua')
  const [open, setOpen] = useState<string | null>(null)
  const toolbarRef = useRef<HTMLDivElement>(null)
  const chipsRef = useRef<HTMLDivElement>(null)

  const found = useMemo(() => searchProducts(query), [query])
  const visible = found.filter((p) => category === 'Semua' || p.category === category)
  const groups = categories
    .map(({ name, icon }) => ({ name, icon, items: visible.filter((p) => p.category === name) }))
    .filter((g) => g.items.length)

  // Pencarian baru selalu berlaku untuk semua kategori, bukan hanya kategori yang sedang dipilih
  const onSearch = (value: string) => {
    setQuery(value)
    setCategory('Semua')
    const result = searchProducts(value)
    setOpen(value.trim() && result.length === 1 ? result[0].id : null)
  }

  // Chip aktif selalu diposisikan di tengah baris yang bisa digeser, juga saat kategori diganti lewat tautan
  useEffect(() => {
    const row = chipsRef.current
    const chip = row?.querySelector<HTMLElement>('[aria-pressed="true"]')
    if (!row || !chip) return
    row.scrollTo({ left: chip.offsetLeft - (row.clientWidth - chip.offsetWidth) / 2 })
  }, [category])

  // Ganti kategori saat daftar sudah di-scroll: kembalikan ke awal daftar supaya tidak tersesat di tengah halaman
  const onCategory = (name: Filter) => {
    setCategory(name)
    const top = toolbarRef.current?.getBoundingClientRect().top ?? 0
    if (top < 72) window.scrollTo({ top: window.scrollY + top - 80 })
  }

  const onToggle = (id: string) => {
    const next = open === id ? null : id
    setOpen(next)
    if (next) scrollToId(next, 'nearest')
  }

  // Hash (#sewa-bot, #ketentuan, #kategori-digital) membuka produk atau kategori tujuan.
  // Next Link tidak memicu hashchange untuk tautan di halaman yang sama, jadi klik ditangkap di sini.
  useEffect(() => {
    const goTo = (hash: string) => {
      const anchor = resolveAnchor(decodeURIComponent(hash.replace(/^#/, '')))
      if (!anchor) return false
      setQuery('')
      if (anchor.product) {
        setCategory('Semua')
        setOpen(anchor.product)
      } else if (anchor.category) {
        setCategory(anchor.category)
      }
      scrollToId(anchor.id, 'start')
      return true
    }

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = (e.target as Element).closest('a[href]') as HTMLAnchorElement | null
      if (!link || link.target === '_blank') return
      const url = new URL(link.href, window.location.href)
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return
      if (!goTo(url.hash)) return
      e.preventDefault()
      e.stopPropagation()
      if (window.location.hash !== url.hash) history.pushState(null, '', url.hash)
    }
    const onHashChange = () => goTo(window.location.hash)

    document.addEventListener('click', onClick, true)
    window.addEventListener('hashchange', onHashChange)
    goTo(window.location.hash)
    return () => {
      document.removeEventListener('click', onClick, true)
      window.removeEventListener('hashchange', onHashChange)
      window.clearTimeout(scrollTimer)
    }
  }, [])

  const tabs = [
    { name: 'Semua' as Filter, count: found.length, icon: Sparkles },
    ...categories.map(({ name, icon }) => ({ name: name as Filter, count: found.filter((p) => p.category === name).length, icon })),
  ]

  return (
    <section className="px-5 pb-12 pt-24 sm:pb-16 sm:pt-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="fade-up mb-6 max-w-2xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-accent">KATALOG LAYANAN</p>
          <h1 className="text-balance text-2xl font-black tracking-tight text-white sm:text-3xl md:text-4xl">🚀 DAFTAR LAYANAN ANDRI OFFICIAL</h1>
          <p className="mt-2 text-muted-foreground">Berbagai layanan digital yang tersedia dalam satu tempat.</p>
        </div>

        <div ref={toolbarRef} className="fade-up" style={{ animationDelay: '60ms' }}>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Cari produk, paket, harga, atau negara..."
              aria-label="Cari produk"
              className="h-12 w-full rounded-xl border border-border bg-card pl-10 pr-11 text-base text-white outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30 sm:text-sm"
            />
            {query && (
              <button
                type="button"
                aria-label="Hapus pencarian"
                onClick={() => onSearch('')}
                className="absolute right-1 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground transition-colors hover:text-white active:scale-90"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <div
            role="group"
            aria-label="Filter kategori"
            ref={chipsRef}
            className="no-scrollbar relative -mx-5 mt-3 flex scroll-smooth gap-2 overflow-x-auto overscroll-x-contain px-5 py-1 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0"
          >
            {tabs.map(({ name, count, icon: Icon }) => {
              const active = category === name
              return (
                <button
                  key={name}
                  type="button"
                  aria-pressed={active}
                  disabled={count === 0 && !active}
                  onClick={() => onCategory(name)}
                  className={cn(
                    'inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-3.5 text-[13px] font-semibold outline-none transition duration-200 focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.96] disabled:opacity-40',
                    active ? 'border-cyan-accent/70 bg-primary/25 text-white' : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-white',
                  )}
                >
                  <Icon className={cn('size-4 transition-colors duration-200', active ? 'text-cyan-accent' : 'text-muted-foreground')} />
                  {name}
                  <span className={cn('rounded-full px-1.5 py-px text-xs tabular-nums transition-colors duration-200', active ? 'bg-primary/30 text-white' : 'bg-white/10')}>{count}</span>
                </button>
              )
            })}
          </div>
        </div>

        <p aria-live="polite" className="mb-3 mt-3 text-xs text-muted-foreground">
          {query.trim() ? `${visible.length} hasil untuk “${query.trim()}”` : `${visible.length} produk`}
        </p>

        {/* key = kategori: daftar masuk ulang dengan animasi saat filter diganti, tidak saat mengetik pencarian */}
        <div key={category} className="grid gap-6">
          {groups.map(({ name, icon: Icon, items }) => (
            <section key={name} id={`kategori-${categorySlug(name)}`} aria-label={name}>
              <div className="mb-3 flex items-center gap-2.5 border-b border-border pb-2.5">
                <Icon className="size-4 text-cyan-accent" />
                <h2 className="text-sm font-bold text-white">{name}</h2>
                <span className="text-xs text-muted-foreground">{items.length} produk</span>
              </div>
              <div className="grid items-start gap-2.5 md:grid-cols-2">
                {items.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} open={open === p.id} onToggle={() => onToggle(p.id)} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {visible.length === 0 && (
          <div className="fade-up rounded-xl border border-dashed border-white/15 px-5 py-10 text-center">
            <p className="font-semibold text-white">Produk tidak ditemukan.</p>
            <p className="mt-1 text-sm text-muted-foreground">Coba kata kunci lain, atau tanya admin untuk layanan yang kamu cari.</p>
            <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => onSearch('')}
                className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-11 px-5')}
              >
                Reset pencarian
              </button>
              <a {...adminLink} className={cn(buttonVariants({ size: 'lg' }), 'h-11 px-5 font-bold hover:bg-primary/85')}>
                Tanya admin <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
