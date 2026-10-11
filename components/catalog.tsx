'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, Check, ChevronDown, MessageCircle, Search, Sparkles, Star, X } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import {
  anchorAlias, categories, categoryIcon, productMeta, productText, products,
  type Block, type Category, type Product,
} from '@/lib/catalog'
import { admin } from '@/lib/site'
import { useReveal } from '@/lib/use-reveal'
import { cn } from '@/lib/utils'

type Filter = Category | 'Semua'

const index = products.map((p) => ({ p, text: productText(p) }))

function search(query: string) {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  return index.filter(({ text }) => words.every((w) => text.includes(w))).map(({ p }) => p)
}

const adminLink = { href: admin, target: '_blank', rel: 'noreferrer' } as const

let scrollTimer: number | undefined

// Tunggu animasi accordion (300ms) selesai supaya posisi akhir kartu sudah pasti
function scrollToId(ids: string[], block: ScrollLogicalPosition) {
  window.clearTimeout(scrollTimer)
  scrollTimer = window.setTimeout(() => {
    ids.map((id) => document.getElementById(id)).find(Boolean)?.scrollIntoView({ block })
  }, 320)
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'note':
      return <p className="text-sm leading-6 text-muted-foreground">{block.text}</p>

    case 'plans':
      return (
        <div>
          {block.title && <h5 className="mb-2 text-sm font-bold text-white">{block.title}</h5>}
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {block.rows.map((r) => (
              <li key={`${r.name}-${r.price}`} className="flex items-center gap-3 rounded-lg border border-border bg-background/60 p-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-sm font-semibold text-white">{r.name}</span>
                    {r.tag && (
                      <span className={cn('rounded px-1.5 py-0.5 text-[11px] font-bold', r.tag === 'FULLGAR' ? 'bg-primary/20 text-cyan-accent' : 'bg-white/10 text-muted-foreground')}>
                        {r.tag}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-lg font-bold leading-none text-white">{r.price}</p>
                </div>
                <a
                  {...adminLink}
                  aria-label={`Pesan ${r.name} ${r.tag ?? ''} ${r.price} via admin`}
                  className={cn(buttonVariants({ size: 'lg' }), 'h-10 shrink-0 px-3.5 text-xs font-bold hover:bg-primary/85')}
                >
                  <MessageCircle className="size-3.5" /> Pesan
                </a>
              </li>
            ))}
          </ul>
        </div>
      )

    case 'list':
      return (
        <div id={block.id}>
          <h5 className="mb-2 text-sm font-bold text-white">{block.title}</h5>
          <ul className={cn('grid gap-x-6 gap-y-2 text-[13px] leading-5 text-muted-foreground', block.items.length > 6 && 'sm:grid-cols-2')}>
            {block.items.map((item) => (
              <li key={item} className="flex gap-2">
                {block.check ? <Check className="mt-0.5 size-4 shrink-0 text-cyan-accent" /> : <span className="text-primary">•</span>}
                <span className="min-w-0">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )

    case 'compare':
      return (
        <div id={block.id}>
          <h5 className="mb-2 text-sm font-bold text-white">{block.title}</h5>
          <div className="grid gap-2 md:grid-cols-2">
            {block.sides.map((side) => (
              <div key={side.title} className="rounded-lg border border-border bg-background/60 p-3.5">
                <p className="mb-2.5 flex items-center gap-2 text-sm font-bold text-white">
                  <span className="size-2 rounded-full bg-primary" /> {side.title}
                </p>
                <ul className="grid gap-2 text-[13px] leading-5 text-muted-foreground">
                  {side.items.map((item) => (
                    <li key={item} className="flex gap-2"><span className="text-primary">•</span><span className="min-w-0">{item}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )

    case 'chips':
      return (
        <div>
          {block.title && <h5 className="mb-2 text-sm font-bold text-white">{block.title}</h5>}
          {block.pill ? (
            <div className="flex flex-wrap gap-2">
              {block.items.map((item) => (
                <span key={item} className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-bold text-cyan-accent">{item}</span>
              ))}
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {block.items.map((item) => (
                <li key={item} className="rounded-lg border border-border bg-background/60 px-3 py-2 text-[13px] font-semibold leading-snug text-white">{item}</li>
              ))}
            </ul>
          )}
        </div>
      )

    case 'links': {
      const withDesc = block.rows.some((r) => r.desc)
      return (
        <ul className={cn('grid gap-2', withDesc ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6')}>
          {block.rows.map(({ name, desc, icon: Icon }) => (
            <li key={name}>
              <a {...adminLink} className="flex h-full items-start gap-2.5 rounded-lg border border-border bg-background/60 p-3 transition duration-200 hover:border-primary/60 active:scale-[0.98]">
                {Icon && <Icon className="mt-0.5 size-4 shrink-0 text-cyan-accent" />}
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-white">{name}</span>
                  {desc && <span className="mt-0.5 block text-[13px] leading-5 text-muted-foreground">{desc}</span>}
                  <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-cyan-accent">
                    Tanya admin <ArrowUpRight className="size-3" />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )
    }

    case 'stat':
      return (
        <div className="flex items-center gap-3 rounded-lg border border-border bg-background/60 p-3.5">
          <span className="grid size-11 place-items-center rounded-lg bg-primary text-white"><Star className="size-5" fill="currentColor" /></span>
          <div>
            <p className="text-2xl font-bold leading-none text-white">{block.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{block.label}</p>
          </div>
        </div>
      )
  }
}

function ProductCard({ product, index, open, onToggle }: { product: Product; index: number; open: boolean; onToggle: () => void }) {
  const Icon = product.icon
  const ref = useReveal<HTMLElement>()
  return (
    <article
      ref={ref}
      id={product.id}
      style={{ animationDelay: `${(index % 2) * 70}ms` }}
      className={cn(
        'reveal rounded-xl border bg-card transition-[border-color,translate] duration-200',
        open ? 'border-primary/50 md:col-span-2' : 'border-border hover:-translate-y-0.5 hover:border-primary/60',
      )}
    >
      <h4>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${product.id}-detail`}
          onClick={onToggle}
          className="flex w-full items-center gap-3 rounded-xl p-3.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-4"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-secondary text-cyan-accent">
            <Icon className="size-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold leading-snug text-white">{product.title}</span>
            <span className="mt-0.5 block text-[13px] leading-5 text-muted-foreground">{product.desc}</span>
            <span className="mt-1.5 inline-block rounded-md bg-primary/15 px-2 py-0.5 text-xs font-semibold text-cyan-accent">{productMeta(product)}</span>
          </span>
          <ChevronDown className={cn('size-5 shrink-0 text-muted-foreground transition-transform duration-300', open && 'rotate-180 text-white')} />
        </button>
      </h4>

      {/* Tinggi dianimasikan lewat grid-template-rows (0fr ↔ 1fr); inert menjaga isi tertutup tidak bisa difokus */}
      <div
        id={`${product.id}-detail`}
        inert={!open}
        className={cn('grid transition-[grid-template-rows] duration-300 ease-out', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="grid gap-5 border-t border-border p-3.5 sm:p-4">
            {product.blocks.map((block, i) => <BlockView key={i} block={block} />)}
            {product.cta && (
              <a {...adminLink} className={cn(buttonVariants({ size: 'lg' }), 'h-11 w-full px-5 text-sm font-bold hover:bg-primary/85 sm:w-fit')}>
                {product.cta} <ArrowUpRight className="size-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export function Catalog() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Filter>('Semua')
  const [open, setOpen] = useState<string | null>(null)

  const found = useMemo(() => search(query), [query])
  const visible = found.filter((p) => category === 'Semua' || p.category === category)
  const groups = categories
    .map((name) => ({ name, items: visible.filter((p) => p.category === name) }))
    .filter((g) => g.items.length)

  // Pencarian baru selalu berlaku untuk semua kategori, bukan hanya kategori yang sedang dipilih
  const onSearch = (value: string) => {
    setQuery(value)
    setCategory('Semua')
    const result = search(value)
    setOpen(value.trim() && result.length === 1 ? result[0].id : null)
  }

  const onToggle = (id: string) => {
    const next = open === id ? null : id
    setOpen(next)
    if (next) scrollToId([next], 'nearest')
  }

  // Link anchor (navbar, hero, footer) membuka produk yang dituju, termasuk saat hash-nya sama
  useEffect(() => {
    const goTo = (hash: string) => {
      const id = decodeURIComponent(hash.replace(/^#/, ''))
      const target = anchorAlias[id] ?? id
      if (target === 'kategori-digital') setCategory('Digital')
      else if (products.some((p) => p.id === target)) {
        setCategory('Semua')
        setOpen(target)
      } else return false
      setQuery('')
      scrollToId([id, target], 'start')
      return true
    }

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = (e.target as Element).closest('a[href^="#"]')
      const hash = link?.getAttribute('href') ?? ''
      if (!goTo(hash)) return
      e.preventDefault()
      if (window.location.hash !== hash) history.pushState(null, '', hash)
    }
    const onHashChange = () => goTo(window.location.hash)

    document.addEventListener('click', onClick)
    window.addEventListener('hashchange', onHashChange)
    goTo(window.location.hash)
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('hashchange', onHashChange)
      window.clearTimeout(scrollTimer)
    }
  }, [])

  const tabs: { name: Filter; count: number; icon: typeof Sparkles }[] = [
    { name: 'Semua', count: found.length, icon: Sparkles },
    ...categories.map((name) => ({ name, count: found.filter((p) => p.category === name).length, icon: categoryIcon[name] })),
  ]

  return (
    <section id="layanan" className="border-y border-white/[0.08] bg-white/[0.015] px-5 py-14 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary">KATALOG LAYANAN</p>
          <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl md:text-4xl">🚀 DAFTAR LAYANAN ANDRI OFFICIAL</h2>
          <p className="mt-3 text-muted-foreground">Berbagai layanan digital yang tersedia dalam satu tempat.</p>
        </div>

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
              className="absolute right-1.5 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground transition-colors hover:text-white"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Mobile: chip yang bisa digeser horizontal. Desktop: membungkus ke baris berikutnya */}
        <div
          role="group"
          aria-label="Filter kategori"
          className="no-scrollbar -mx-5 mt-3 flex scroll-smooth gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0"
        >
          {tabs.map(({ name, count, icon: Icon }) => {
            const active = category === name
            return (
              <button
                key={name}
                type="button"
                aria-pressed={active}
                disabled={count === 0 && !active}
                onClick={(e) => {
                  setCategory(name)
                  e.currentTarget.scrollIntoView({ inline: 'center', block: 'nearest' })
                }}
                className={cn(
                  'inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-3.5 text-[13px] font-semibold outline-none transition duration-150 focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.97] disabled:opacity-40',
                  active ? 'border-primary bg-primary/15 text-white' : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-white',
                )}
              >
                <Icon className={cn('size-4', active ? 'text-cyan-accent' : 'text-muted-foreground')} />
                {name}
                <span className={cn('rounded-full px-1.5 py-px text-[11px] tabular-nums', active ? 'bg-primary/30 text-white' : 'bg-white/10')}>{count}</span>
              </button>
            )
          })}
        </div>

        <p aria-live="polite" className="mb-4 mt-4 text-xs text-muted-foreground">
          {query.trim() ? `${visible.length} hasil untuk “${query.trim()}”` : `${visible.length} produk`}
        </p>

        <div className="grid gap-8">
          {groups.map(({ name, items }) => {
            const Icon = categoryIcon[name]
            return (
              <section key={name} id={`kategori-${name.toLowerCase().replace(/\s+/g, '-')}`} aria-label={name}>
                <div className="mb-3 flex items-center gap-2.5 border-b border-border pb-2.5">
                  <Icon className="size-4 text-cyan-accent" />
                  <h3 className="text-sm font-bold text-white">{name}</h3>
                  <span className="text-xs text-muted-foreground">{items.length} produk</span>
                </div>
                <div className="grid items-start gap-2.5 md:grid-cols-2">
                  {items.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} open={open === p.id} onToggle={() => onToggle(p.id)} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        {visible.length === 0 && (
          <div className="rounded-xl border border-dashed border-white/15 px-5 py-10 text-center">
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
