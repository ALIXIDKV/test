import Link from 'next/link'
import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { categories, products } from '@/config/products'
import { links } from '@/config/site'
import { categoryMeta, categorySlug, lowestPrice } from '@/lib/products'
import { cn } from '@/lib/utils'

const stats = [
  [lowestPrice(), 'Mulai dari'],
  ...products.flatMap((p) => p.blocks.flatMap((b) => (b.type === 'stat' ? [[b.value, b.label]] : []))),
  [String(products.length), 'Layanan tersedia'],
]

const delay = (ms: number) => ({ animationDelay: `${ms}ms` })

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-10 pt-24 sm:pb-14 sm:pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-8 lg:pb-24 lg:pt-36">
        <div className="min-w-0">
          <p className="fade-up inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-cyan-accent" />
            Digital & Kreatif Store
          </p>

          <h1 style={delay(60)} className="fade-up mt-5 text-[1.75rem] font-bold leading-[1.12] tracking-tight text-white min-[360px]:text-[1.875rem] sm:text-5xl lg:text-6xl">
            Layanan digital lengkap,{' '}
            <span className="text-cyan-accent">pesan lewat satu chat.</span>
          </h1>

          <p style={delay(120)} className="fade-up mt-5 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
            Bot, script, nomor virtual, sosial media, sampai jasa desain ada dalam satu katalog.
            Pilih layanannya, lalu konfirmasi langsung ke admin lewat WhatsApp.
          </p>

          <div style={delay(180)} className="fade-up mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/produk" className={cn(buttonVariants({ size: 'lg' }), 'h-11 px-5 text-sm hover:bg-primary/85')}>
              Lihat Produk
              <ArrowUpRight className="size-4" />
            </Link>
            <a
              href={links.admin}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-11 px-5 text-sm')}
            >
              <MessageCircle className="size-4" />
              Chat Admin
            </a>
          </div>

          <div style={delay(240)} className="fade-up mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6">
            {stats.map(([value, label]) => (
              <div key={label}>
                <p className="text-xl font-bold text-white sm:text-2xl">{value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={delay(120)} className="fade-up min-w-0">
          <div className="rounded-2xl border border-border bg-card/80 p-3 backdrop-blur sm:p-4">
            <div className="mb-3 flex items-center justify-between px-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Katalog layanan</p>
              <span className="rounded-full border border-border px-2.5 py-1 text-[11px] font-medium text-cyan-accent">
                {categories.length} kategori
              </span>
            </div>

            <ul className="grid grid-cols-2 gap-2.5">
              {categories.map(({ name, icon: Icon, desc }, i) => (
                <li key={name} className="fade-up" style={delay(200 + i * 50)}>
                  <Link
                    href={`/produk#kategori-${categorySlug(name)}`}
                    className="group flex h-full flex-col rounded-xl border border-border bg-background/60 p-3 transition duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:bg-secondary active:scale-[0.98] sm:p-3.5"
                  >
                    <div className="flex items-start justify-between">
                      <span className="grid size-9 place-items-center rounded-lg bg-primary/15 text-cyan-accent">
                        <Icon className="size-[18px]" />
                      </span>
                      <ArrowUpRight className="size-4 text-muted-foreground transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-accent" />
                    </div>
                    <h2 className="mt-4 text-sm font-semibold text-white">{name}</h2>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">{desc}</p>
                    <p className="mt-3 text-xs font-medium text-cyan-accent">{categoryMeta(name)}</p>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/produk"
              className="mt-3 flex min-h-11 items-center justify-between rounded-xl bg-primary/10 px-4 py-3 text-sm font-medium text-cyan-accent transition duration-200 hover:bg-primary/20 active:scale-[0.99]"
            >
              Lihat semua layanan
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <p className="mt-3 px-1 text-xs text-muted-foreground">Stok dan harga terbaru dikonfirmasi langsung oleh admin.</p>
        </div>
      </div>
    </section>
  )
}
